import React from 'react';
import ReactDOM from 'react-dom';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import "./styles/Google-material-icons.scss";

import "./styles/main.scss";
import Button from '@mui/material/Button';


ReactDOM.render(
    <>
        <h1>Hello World</h1>
        <Button variant="contained">Hello World</Button>
    </>,
    document.getElementById('root')
);
