import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import "./styles/main.scss";

import Main from "./components/Main.jsx";
import NewEntry from "./components/NewEntry.jsx";


ReactDOM.render(
    <Router>
        <Routes>
            <Route path="/entry" element={<NewEntry/>}/>
            <Route path="/entry/:id" element={<NewEntry/>}/>
            <Route path="*" element={<Main/>}/>
        </Routes>
    </Router>,
    document.getElementById('root')
);
