<?php
declare(strict_types=1);

session_start();

$result = $_SESSION['form_result'] ?? [
    'status' => 'error',
    'title' => 'Risultato non disponibile',
    'messages' => ['Torna alla home e riprova dal form di prenotazione.'],
];

unset($_SESSION['form_result']);

$status = $result['status'] === 'success' ? 'success' : 'error';
$title = htmlspecialchars((string) $result['title'], ENT_QUOTES, 'UTF-8');
$messages = is_array($result['messages']) ? $result['messages'] : ['Si e verificato un problema.'];
$homeUrl = './';
$delay = $status === 'success' ? 7 : 10;
?>
<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="robots" content="noindex, nofollow">
    <meta http-equiv="refresh" content="<?php echo $delay; ?>; url=<?php echo $homeUrl; ?>">
    <title><?php echo $title; ?> | PetsittingAle</title>
    <link rel="icon" type="image/svg+xml" href="favicon.svg">
    <link href="dist/output.css" rel="stylesheet">
</head>
<body class="flex min-h-screen items-center justify-center bg-background px-6 text-center text-text">
    <main class="max-w-2xl rounded-2xl border border-slate-200 bg-white p-8 shadow-2xl">
        <p class="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full <?php echo $status === 'success' ? 'bg-secondary text-primary' : 'bg-red-100 text-red-600'; ?> text-3xl font-extrabold">
            <?php echo $status === 'success' ? '✓' : '!'; ?>
        </p>
        <h1 class="text-4xl font-extrabold text-heading font-display"><?php echo $title; ?></h1>
        <div class="mt-5 space-y-3 text-lg leading-relaxed font-body">
            <?php foreach ($messages as $message): ?>
                <p><?php echo htmlspecialchars((string) $message, ENT_QUOTES, 'UTF-8'); ?></p>
            <?php endforeach; ?>
        </div>
        <p class="mt-6 text-sm text-text font-body">Verrai riportato alla home automaticamente tra <?php echo $delay; ?> secondi.</p>
        <a href="<?php echo $homeUrl; ?>" class="cta-button mt-6">Torna alla home</a>
    </main>
</body>
</html>
