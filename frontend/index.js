import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Route, Routes} from "react-router-dom";

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import "./styles/main.scss";

import Main from "./pages/Main";
import NewEntry from "./pages/NewEntry";
import Settings from "./pages/Settings";

const root = ReactDOM.createRoot(
    document.getElementById('root')
);

root.render(
    <BrowserRouter >
        <Routes>
            <Route path="/settings" element={<Settings/>}/>
            <Route path="/entry" element={<NewEntry/>}/>
            <Route path="/entry/:id" element={<NewEntry/>}/>
            <Route path="/" element={<Main/>}/>
            <Route path="*" element={<Main/>}/>
        </Routes>
    </BrowserRouter>
);
