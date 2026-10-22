import React, { lazy, Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import PageVeil from './components/PageVeil.jsx'
import ScrollProgress from './components/ScrollProgress.jsx'
import './index.css'

// ponytail: switch por pathname, son 5 páginas estáticas; react-router si aparecen rutas dinámicas.
// Cada página en su propio archivo JS: el celular solo descarga la que abre.
const routes = {
    '/invitacion': () => import('./Invitation.jsx'),
    '/invitacion/details': () => import('./Details.jsx'),
    '/invitacion/regalos': () => import('./Regalos.jsx'),
    '/invitacion/historia': () => import('./Historia.jsx'),
};
const Page = lazy(routes[window.location.pathname.replace(/\/+$/, '')] || (() => import('./App.jsx')));

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Suspense fallback={null}><Page /></Suspense>
        <ScrollProgress />
        <PageVeil />
    </React.StrictMode>,
)
