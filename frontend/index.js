import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Route, Routes} from "react-router-dom";

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import Main from "./pages/Main";
import NewEntry from "./pages/NewEntry";
import Settings from "./pages/Settings";
import FeedbackProvider from "./parts/FeedbackProvider/_index";
import BackendTasks from "./helpers/BackendTasks";

const root = ReactDOM.createRoot(
    document.getElementById('root')
);

document.addEventListener('DOMContentLoaded', () => {
    let message = {
        Task: BackendTasks.OpenEntries,
        EntryList: []
    }
    console.log(message);
    window.external.sendMessage(JSON.stringify(message));
})

root.render(
    <>
        <FeedbackProvider/>
        <BrowserRouter>
            <Routes>
                <Route path="/settings" element={<Settings/>}/>
                <Route path="/entry" element={<NewEntry/>}/>
                <Route path="/entry/:id" element={<NewEntry/>}/>
                <Route path="/" element={<Main/>}/>
                <Route path="*" element={<Main/>}/>
            </Routes>
        </BrowserRouter>
    </>
);
