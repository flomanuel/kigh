import React, {Component} from "react";
import DrawerAppBar from "../parts/DrawerAppBar/_index";

class AbstractDefaultTemplate extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <DrawerAppBar/>
        )
    }
}

export default AbstractDefaultTemplate;
