import React, {Component} from "react";
import Box from "@mui/material/Box";
import MainIcon from "../MainIcon";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import {Link} from "react-router-dom";

class DrawerInterior extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Box onClick={this.props.setMobileOpen} sx={{textAlign: 'center'}}>
                <MainIcon mobile={true}/>
                <Divider/>
                <List>
                    {this.props.navItems?.map((item) => (
                        <ListItem key={item.title} disablePadding>
                            <ListItemButton sx={{textAlign: 'center'}}>
                                <ListItemText primary={<Link to={item.fragment}>{item.title}</Link>}/>
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Box>
        );
    }
}

export default DrawerInterior;