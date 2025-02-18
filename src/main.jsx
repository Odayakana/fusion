import React from "react";
import ReactDome from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'


import '../css/style.css'
import App from './App.jsx'

ReactDome.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>
)
