import React from "react";
import AbstractDefaultTemplate from "./AbstractDefaultTemplate.jsx";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

class NewEntry extends AbstractDefaultTemplate {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                {super.render()}
                <Box component="main" sx={{p: 3}}>
                    <Toolbar/>
                    <Typography>
                        Component: New Entry
                    </Typography>
                </Box>
            </>
        )
    }
}

export default NewEntry;
