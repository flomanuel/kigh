import React from "react";
import DefaultTemplate from "./DefaultTemplate";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

function Main() {
    return (
        <>
            <DefaultTemplate/>
            <Box component="main" sx={{p: 3}}>
                <Toolbar/>
                <Typography>
                    Component: Main
                </Typography>
            </Box>
        </>
    )
}

export default Main;
