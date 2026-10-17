// Honeymoon fund: en qué usaremos los regalos. Editable.
// `goal` = número de aportes simbólicos para llenar la barra (no es dinero real). `cta` = texto del botón de aportar.
// ⚠️ No cambiar un `id` ya publicado: el contador guardado quedaría huérfano.
export const gifts = [
    { id: 'luna-de-miel', title: 'Nuestra luna de miel en Italia', text: 'Roma, Florencia y la costa Amalfitana: el viaje que llevamos años soñando.', goal: 60, cta: 'Los mando a Italia' },
    { id: 'paseo-en-bote', title: 'Un paseo en bote', text: 'Para ver Positano desde el mar, con el pelo al viento y cero afanes.', goal: 30, cta: 'Súbanse al bote' },
    { id: 'gelato', title: 'Gelato todos los días', text: 'Dos bolas diarias por persona. Es investigación, no antojo.', goal: 40, cta: 'Yo invito el gelato' },
    { id: 'pasta-y-vino', title: 'Una cena de pasta y vino', text: 'En una trattoria romana, brindando por cada uno de ustedes.', goal: 30, cta: 'Esta cena va por mí' },
    { id: 'vespa', title: 'Una Vespa por la Toscana', text: 'Prometemos usar casco y no perdernos (mucho).', goal: 25, cta: 'Tanqueo la Vespa' },
    { id: 'nuestro-hogar', title: 'Nuestro primer hogar', text: 'Para que la casa de los Navelas tenga, por fin, un sofá decente.', goal: 50, cta: 'Pongo un cojín' },
];

// Datos bancarios para el aporte real (los dio Gustavo el 2026-10-04).
// `copy: true` muestra el botón de copiar en esa fila.
export const bankAccounts = [
    {
        id: 'colombia',
        title: 'Cuenta en Colombia',
        note: 'Para transferencias en pesos colombianos.',
        rows: [
            { label: 'Banco', value: 'Bancolombia' },
            { label: 'Tipo de cuenta', value: 'Ahorros' },
            { label: 'Número de cuenta', value: '08329737391', copy: true },
            { label: 'Llave Bancolombia', value: '@gustavon7166', copy: true },
        ],
    },
    {
        id: 'usa',
        title: 'Cuenta en Estados Unidos',
        note: 'Para transferencias en dólares.',
        rows: [
            { label: 'Banco', value: 'Lead Bank' },
            { label: 'Tipo de cuenta', value: 'Checking' },
            { label: 'Número de cuenta', value: '211902494583', copy: true },
            { label: 'Número de ruta', value: '101019644', copy: true },
        ],
    },
];
