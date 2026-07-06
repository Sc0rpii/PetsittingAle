// Template servizi PetsittingAle.
// Per aggiungere una nuova card:
// 1. Copia un oggetto dentro SERVICES.
// 2. Cambia title, description e price.
// 3. Scegli un icon tra "sun", "moon", "walk", "home".
// 4. Non inserire HTML nei testi: usa solo testo normale, cosi eviti XSS e mantieni il template pulito.

const SERVICE_ICONS = {
  sun: `<svg width="39" height="39" viewBox="0 0 39 39" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M19.5 1.5V3.5M19.5 35.5V37.5M3.5 19.5H1.5M8.12824 8.12824L6.5 6.5M30.8718 8.12824L32.5 6.5M8.12824 30.88L6.5 32.5002M30.8718 30.88L32.5 32.5002M37.5 19.5H35.5M27.5 19.5C27.5 23.9182 23.9182 27.5 19.5 27.5C15.0817 27.5 11.5 23.9182 11.5 19.5C11.5 15.0817 15.0817 11.5 19.5 11.5C23.9182 11.5 27.5 15.0817 27.5 19.5Z" stroke="#EEDDFF" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  moon: `<svg width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M13.4667 26.6667C11.6 26.6667 9.85 26.3111 8.21667 25.6C6.58333 24.8889 5.16111 23.9278 3.95 22.7167C2.73889 21.5056 1.77778 20.0833 1.06667 18.45C0.355556 16.8167 0 15.0667 0 13.2C0 9.95555 1.03333 7.09444 3.1 4.61667C5.16667 2.13889 7.8 0.6 11 0C10.6 2.2 10.7222 4.35 11.3667 6.45C12.0111 8.55 13.1222 10.3889 14.7 11.9667C16.2778 13.5444 18.1167 14.6556 20.2167 15.3C22.3167 15.9444 24.4667 16.0667 26.6667 15.6667C26.0889 18.8667 24.5556 21.5 22.0667 23.5667C19.5778 25.6333 16.7111 26.6667 13.4667 26.6667ZM13.4667 24C15.4222 24 17.2333 23.5111 18.9 22.5333C20.5667 21.5556 21.8778 20.2111 22.8333 18.5C20.9222 18.3222 19.1111 17.8389 17.4 17.05C15.6889 16.2611 14.1556 15.1889 12.8 13.8333C11.4444 12.4778 10.3667 10.9444 9.56667 9.23333C8.76667 7.52222 8.28889 5.71111 8.13333 3.8C6.42222 4.75556 5.08333 6.07222 4.11667 7.75C3.15 9.42778 2.66667 11.2444 2.66667 13.2C2.66667 16.2 3.71667 18.75 5.81667 20.85C7.91667 22.95 10.4667 24 13.4667 24Z" fill="#EEDDFF"/></svg>`,
  walk: `<svg width="18" height="29" viewBox="0 0 18 29" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M1.33333 28.6667L5.06667 9.86667L2.66667 10.8V15.3333H0V9.06667L6.73333 6.2C7.04444 6.06667 7.37222 5.98889 7.71667 5.96667C8.06111 5.94444 8.38889 5.98889 8.7 6.1C9.01111 6.21111 9.30556 6.36667 9.58333 6.56667C9.86111 6.76667 10.0889 7.02222 10.2667 7.33333L11.6 9.46667C12.1778 10.4 12.9611 11.1667 13.95 11.7667C14.9389 12.3667 16.0667 12.6667 17.3333 12.6667V15.3333C15.7778 15.3333 14.3889 15.0111 13.1667 14.3667C11.9444 13.7222 10.9 12.9 10.0333 11.9L9.2 16L12 18.6667V28.6667H9.33333V20L6.53333 17.8667L4.13333 28.6667H1.33333ZM10 5.33333C9.26667 5.33333 8.63889 5.07222 8.11667 4.55C7.59444 4.02778 7.33333 3.4 7.33333 2.66667C7.33333 1.93333 7.59444 1.30556 8.11667 0.783333C8.63889 0.261111 9.26667 0 10 0C10.7333 0 11.3611 0.261111 11.8833 0.783333C12.4056 1.30556 12.6667 1.93333 12.6667 2.66667C12.6667 3.4 12.4056 4.02778 11.8833 4.55C11.3611 5.07222 10.7333 5.33333 10 5.33333Z" fill="#EEDDFF"/></svg>`,
  home: `<svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M35 52.5001V37.5001H25V52.5001M47.5 24.4453V40.5001C47.5 44.7004 47.5 46.8006 46.6825 48.4049C45.9635 49.8161 44.8162 50.9636 43.405 51.6826C41.8005 52.5001 39.7005 52.5001 35.5 52.5001H24.5C20.2996 52.5001 18.1994 52.5001 16.5951 51.6826C15.1839 50.9636 14.0365 49.8161 13.3175 48.4049C12.5 46.8006 12.5 44.7004 12.5 40.5001V24.4437M52.5 30.0001L38.917 14.91C35.8278 11.4781 34.2833 9.76213 32.464 9.12865C30.8665 8.57223 29.1275 8.57235 27.5297 9.129C25.7107 9.76278 24.1665 11.479 21.0778 14.9113L7.5 30.0001" stroke="#EEDDFF" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
};

const SERVICES = [
  {
    icon: "sun",
    title: "Visite Diurne",
    description: "Visite a domicilio per i tuoi amici a quattro zampe. Include alimentazione, lettiera, manutenzione, tempo di gioco e tante attenzioni.",
    price: "Da 20€/visita",
  },
  {
    icon: "moon",
    title: "Visite Notturne",
    description: "Assistenza notturna a domicilio per mantenere il tuo animale domestico a suo agio nel proprio ambiente mentre viaggi.",
    price: "Da 30€/visita",
  },
  {
    icon: "walk",
    title: "Passeggiata",
    description: "Passeggiate coinvolgenti nel quartiere, su misura per il livello di energia del tuo cane, con aggiornamenti fotografici.",
    price: "Da 25€/visita",
  },
  {
    icon: "home",
    title: "Sitting a casa mia",
    description: "Puoi lasciare a me il tuo amico a quattro zampe: mi occupo di dargli amore, cibo, acqua e l'attivita di cui ha bisogno.",
    price: "Da 30€/notte",
  },
];

function createServiceCard(service) {
  const card = document.createElement("article");
  card.className = "services-card";

  const icon = document.createElement("div");
  icon.className = "flex items-center justify-center mb-6 rounded-full icon bg-primary w-14 h-14";
  icon.innerHTML = SERVICE_ICONS[service.icon] || SERVICE_ICONS.sun;

  const title = document.createElement("h2");
  title.className = "mb-1 text-2xl font-extrabold text-heading font-display";
  title.textContent = service.title;

  const description = document.createElement("p");
  description.className = "text-lg font-medium text-text font-body mb-2.5";
  description.textContent = service.description;

  const price = document.createElement("span");
  price.className = "font-bold text-primary font-display text-2xs";
  price.textContent = service.price;

  card.append(icon, title, description, price);
  return card;
}

function renderServices() {
  const container = document.querySelector("#servicesGrid");
  if (!container) return;

  const fragment = document.createDocumentFragment();
  SERVICES.forEach((service) => fragment.append(createServiceCard(service)));
  container.replaceChildren(fragment);
}

renderServices();
