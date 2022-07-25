import React from "react";
import AbstractDefaultTemplate from "./AbstractDefaultTemplate.jsx";

class NewEntry extends AbstractDefaultTemplate {
    constructor(props) {
        super(props);
    }

    render() {
        return (<>
            {super.render()}
            <p>Component: NewEntry</p>
        </>)
    }
}

export default NewEntry;
