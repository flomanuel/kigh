import React, {Component} from "react";
import {styled} from "@mui/material/styles";

class SearchIconWrapper extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const SearchIconWrapperComponent = styled('div')(({theme}) => ({
            padding: theme.spacing(0, 2),
            height: '100%',
            position: 'absolute',
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }))
        return (<SearchIconWrapperComponent/>);
    }
}

export default SearchIconWrapper;