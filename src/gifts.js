// Honeymoon fund: en qué usaremos los regalos. Editable.
// `goal` = número de aportes simbólicos para llenar la barra (no es dinero real). `cta` = texto del botón de aportar.
// ⚠️ No cambiar un `id` ya publicado: es el que usa apps-script/Code.gs (REGALOS) y los aportes guardados en la hoja.
export const gifts = [
    { id: 'tiquetes', title: 'Los tiquetes de avión', text: 'Para despegar juntos rumbo a nuestro honeymoon.', goal: 60, cta: 'Les pago el avión' },
    { id: 'hotel', title: 'Las noches de hotel y excursiones', text: 'Una cama con vista, donde sea que nos agarre la noche.', goal: 40, cta: 'Una noche va por mí' },
    { id: 'luna-de-miel', title: 'Las excursiones', text: 'Tours, museos y cada rincón que nos haga suspirar.', goal: 30, cta: 'Les pago la entrada' },
    { id: 'nuestro-hogar', title: 'Nuestro primer hogar', text: 'Para la cuota inicial del lugar donde empieza todo.', goal: 50, cta: 'Pongo un ladrillo' },
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
