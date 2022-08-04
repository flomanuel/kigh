import React from "react";
import DrawerAppBar from "../parts/DrawerAppBar/_index";

function DefaultTemplate() {
    return (
        <DrawerAppBar key={Date.now()}/>
    )
}

export default DefaultTemplate;
