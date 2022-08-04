import React from "react";

import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import {blue} from "@mui/material/colors";

import MainIcon from "../MainIcon";
import {useLocation} from "react-router-dom";


function DrawerInterior(props) {
    const location = useLocation();
    return (
        <Box onClick={() => {
            props.setMobile(!props.mobile);
        }} sx={{textAlign: 'center'}}>
            <MainIcon mobile={true}/>
            <Divider/>
            <List>
                {props.navItems.map((item) => (
                    <ListItem key={item.title} disablePadding>
                        <ListItemButton sx={{textAlign: 'center', color: blue["700"]}}>
                            <ListItemText
                                onClick={() => {
                                    if (item.fragment !== location.pathname) {
                                        props.setNavRoute(item.fragment)
                                    }
                                }}>
                                {item.title}
                            </ListItemText>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );
}

export default DrawerInterior;