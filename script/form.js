// Validazione lato client del form di prenotazione.
// Importante: questi controlli migliorano UX e riducono errori banali, ma non sono sicurezza.
// La sicurezza vera deve restare sempre nel PHP, perche qualunque utente puo modificare o saltare il JS.

const form = document.querySelector("#bookingForm");
const submitButton = document.querySelector("#submitBtn");
const formStatus = document.querySelector("#formStatus");
const speciesSelect = document.querySelector("#razza");
const otherSpeciesWrap = document.querySelector("#razzaAltroWrap");
const otherSpeciesInput = document.querySelector("#razzaAltro");
const formStartedAt = document.querySelector("#formStartedAt");

// Teniamo traccia dei campi toccati per evitare errori visivi aggressivi appena la pagina si apre.
const touchedFields = new Set();

// Regole minime client-side. Devono restare allineate con Backend/form.php.
const rules = {
  nome: {
    message: "Inserisci almeno 2 caratteri.",
    validate: (value) => value.trim().length >= 2,
  },
  email: {
    message: "Inserisci un indirizzo email valido.",
    validate: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim()),
  },
  phone: {
    message: "Inserisci un numero di telefono valido, almeno 8 cifre.",
    validate: (value) => value.replace(/[^\d]/g, "").length >= 8,
  },
  nomeA: {
    message: "Inserisci il nome dell'animale.",
    validate: (value) => value.trim().length >= 2,
  },
  razza: {
    message: "Seleziona razza o specie.",
    validate: (value) => value !== "",
  },
  razzaAltro: {
    message: "Specifica la tipologia dell'animale.",
    validate: (value) => speciesSelect.value !== "altro" || value.trim().length >= 2,
  },
  age: {
    message: "Inserisci un'eta valida tra 0 e 40 anni.",
    validate: (value) => {
      const age = Number(value);
      return value !== "" && Number.isFinite(age) && age >= 0 && age <= 40;
    },
  },
  services: {
    message: "Seleziona una tipologia di servizio.",
    validate: (value) => value !== "",
  },
  startDate: {
    message: "Seleziona la data di inizio.",
    validate: (value) => value !== "",
  },
  endDate: {
    message: "La data fine non puo essere precedente alla data inizio.",
    validate: (value) => {
      const startDate = form.elements.startDate.value;
      return value === "" || startDate === "" || value >= startDate;
    },
  },
  startTime: {
    message: "Seleziona l'orario di inizio.",
    validate: (value) => value !== "",
  },
  endTime: {
    message: "Seleziona un orario di fine successivo all'inizio.",
    validate: (value) => {
      const startDate = form.elements.startDate.value;
      const endDate = form.elements.endDate.value || startDate;
      const startTime = form.elements.startTime.value;

      if (!value) return false;
      if (!startDate || !startTime || !endDate) return true;
      if (startDate !== endDate) return true;

      return value > startTime;
    },
  },
  privacyPolicy: {
    message: "Devi accettare la Privacy Policy per inviare la richiesta.",
    validate: (_value, field) => field.checked,
  },
};

// Campo anti-spam: il PHP rifiuta invii troppo veloci o senza timestamp.
// Questo non sostituisce CAPTCHA/rate-limit, ma aiuta contro bot semplici.
function setSubmissionTimestamp() {
  if (formStartedAt) {
    formStartedAt.value = String(Date.now());
  }
}

// Se l'utente sceglie "Altro", il campo specifico diventa visibile e required.
function setOtherSpeciesVisibility() {
  const shouldShow = speciesSelect.value === "altro";
  otherSpeciesWrap.classList.toggle("hidden", !shouldShow);
  otherSpeciesInput.required = shouldShow;

  if (!shouldShow) {
    otherSpeciesInput.value = "";
    setFieldState(otherSpeciesInput, true, "");
  }
}

function getFieldWrapper(field) {
  return field.closest(".form-field");
}

function getMessageElement(field) {
  return document.querySelector(`#${field.id}-error`);
}

// Applica classi CSS e messaggi sotto al campo.
function setFieldState(field, isValid, message) {
  const wrapper = getFieldWrapper(field);
  const messageElement = getMessageElement(field);

  if (!wrapper || !messageElement) return;

  const hasContent = field.type === "checkbox" ? field.checked || field.required : field.value.trim() !== "" || field.required;
  wrapper.classList.toggle("is-invalid", !isValid && hasContent);
  wrapper.classList.toggle("is-valid", isValid && (field.type === "checkbox" ? field.checked : field.value.trim() !== ""));
  field.setAttribute("aria-invalid", String(!isValid));
  messageElement.textContent = isValid ? "" : message;
}

function validateField(field, { show = true } = {}) {
  const rule = rules[field.name];
  if (!rule) return true;

  const isValid = rule.validate(field.value, field);

  if (show) {
    setFieldState(field, isValid, rule.message);
  }

  return isValid;
}

// Se tutti i campi obbligatori sono validi, il bottone submit viene abilitato.
function validateForm({ showAll = false } = {}) {
  setOtherSpeciesVisibility();

  const fields = [...form.querySelectorAll("input, select, textarea")]
    .filter((field) => rules[field.name]);

  let isValid = true;

  fields.forEach((field) => {
    const shouldShow = showAll || touchedFields.has(field.name);
    const fieldIsValid = validateField(field, { show: shouldShow });
    isValid = isValid && fieldIsValid;
  });

  submitButton.disabled = !isValid;
  formStatus.textContent = isValid
    ? "Tutto pronto: puoi inviare la richiesta."
    : "Completa i campi obbligatori per inviare la richiesta.";
  formStatus.classList.toggle("ready", isValid);

  return isValid;
}

function attachValidation() {
  form.addEventListener("input", (event) => {
    if (!(event.target instanceof HTMLInputElement || event.target instanceof HTMLSelectElement || event.target instanceof HTMLTextAreaElement)) return;

    touchedFields.add(event.target.name);
    validateField(event.target);
    validateForm();
  });

  form.addEventListener("change", (event) => {
    if (event.target === speciesSelect) setOtherSpeciesVisibility();
    if (!(event.target instanceof HTMLInputElement || event.target instanceof HTMLSelectElement || event.target instanceof HTMLTextAreaElement)) return;

    touchedFields.add(event.target.name);
    validateField(event.target);
    validateForm();
  });

  form.addEventListener("submit", (event) => {
    // Ultimo controllo client-side prima dell'invio. Il PHP ripete tutto lato server.
    if (!validateForm({ showAll: true })) {
      event.preventDefault();
      const firstInvalid = form.querySelector(".is-invalid input, .is-invalid select, .is-invalid textarea");
      firstInvalid?.focus();
    }
  });
}

if (form && submitButton && formStatus && speciesSelect && otherSpeciesWrap && otherSpeciesInput) {
  setSubmissionTimestamp();
  setOtherSpeciesVisibility();
  attachValidation();
  validateForm();
}
