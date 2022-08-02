import React from "react";
import AbstractDefaultTemplate from "./AbstractDefaultTemplate";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

class Settings extends AbstractDefaultTemplate {

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
                        Component: Settings
                    </Typography>
                </Box>
            </>
        )
    }
}

export default Settings;