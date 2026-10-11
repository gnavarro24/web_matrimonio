import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Invitation from './Invitation.jsx'
import Details from './Details.jsx'
import Regalos from './Regalos.jsx'
import './index.css'

// ponytail: switch por pathname, son 4 páginas estáticas; react-router si aparecen rutas dinámicas.
const routes = {
    '/invitacion': Invitation,
    '/invitacion/details': Details,
    '/invitacion/regalos': Regalos,
};
const Page = routes[window.location.pathname.replace(/\/+$/, '')] || App;

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Page />
    </React.StrictMode>,
)
