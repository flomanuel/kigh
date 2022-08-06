import React from "react";
import {useParams} from "react-router";

import DefaultTemplate from "./DefaultTemplate";

import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";


function NewEntry() {
    const {id} = useParams();

    return (
        <>
            <DefaultTemplate/>
            <Box component="main" sx={{p: 3}}>
                <Toolbar/>
                <Typography>
                    Component: New Entry
                </Typography>
                {
                    id &&
                    (<Typography>
                        ID: {id}
                    </Typography>)
                }
            </Box>
        </>
    )
}

export default NewEntry;
