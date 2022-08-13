import React from "react";
import {useLocation, useNavigate} from "react-router-dom";
import PropTypes from "prop-types";

import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import {blue} from "@mui/material/colors";

import MainIcon from "../MainIcon";


function DrawerInterior(props) {
    const navigate = useNavigate();
    const location = useLocation();
    return (
        <Box onClick={() => {
            props.setMobile(!props.mobile);
        }} sx={{textAlign: 'center'}}>
            <MainIcon mobile={true}/>
            <Divider/>
            <List>
                {props.navItems.map((el, index) => (
                    <ListItem key={index} disablePadding>
                        <ListItemButton sx={{textAlign: 'center', color: blue["700"]}}>
                            <ListItemText
                                onClick={() => {
                                    if (el.Fragment !== location.pathname) {
                                        navigate(el.Fragment, {replace: true})
                                    }
                                }}>
                                {el.Title}
                            </ListItemText>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );
}

DrawerInterior.propTypes = {
    setMobile: PropTypes.func,
    mobile: PropTypes.bool,
    navItems: PropTypes.array
}

export default DrawerInterior;
