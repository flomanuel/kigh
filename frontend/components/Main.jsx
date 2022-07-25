import React from "react";
import AbstractDefaultTemplate from "./AbstractDefaultTemplate.jsx";

class Main extends AbstractDefaultTemplate {
    constructor(props) {
        super(props);
    }

    render() {
        return (<>
            {super.render()}
            <p>Component: Main</p>
        </>)
    }
}

export default Main;
