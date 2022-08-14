import React, {useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import {Drawer} from "@mui/material";

import DrawerInterior from './DrawerInterior';
import MainIcon from "../MainIcon";
import Search from "./Search";
import SearchIconWrapper from "./SearchIconWrapper";
import StyledInputBase from "./StyledInputBase";
import PropTypes from "prop-types";


function DrawerAppBar() {
    const navigate = useNavigate();
    const [mobile, setMobile] = useState(false);
    const [navItems] = useState(
        [
            {
                Title: "Entries",
                Fragment: "/",
            },
            {
                Title: "Add new website",
                Fragment: "/entry",
            }/*,
            {
                Title: "Settings",
                Fragment: "/settings",
            }*/
        ]
    );
    const drawerWidth = 240;

    const NavItemElement = (props) => {
        const location = useLocation();
        const isActiveElement = props.el.Fragment === location.pathname;
        return (
            <Button color="inherit"
                    onClick={() => {
                        if (!isActiveElement) {
                            navigate(props.el.Fragment, {replace: true})
                        }
                    }}>
                {props.el.Title}
            </Button>
        )
    }

    NavItemElement.propTypes = {
        el: PropTypes.object,
        index: PropTypes.number
    }

    const DrawerNav = () => {
        const container = window !== undefined ? () => window.document.body : undefined;
        return (
            <Box component="nav">
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobile}
                    onClose={() => {
                        setMobile(!mobile)
                    }}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: {xs: 'block', sm: 'none'},
                        '& .MuiDrawer-paper': {boxSizing: 'border-box', width: drawerWidth},
                    }}
                >
                    <DrawerInterior navItems={navItems}
                                    mobile={mobile}
                                    setMobile={setMobile}
                    />
                </Drawer>
            </Box>
        )
    }

    return (
        <Box sx={{display: 'flex'}}>
            <AppBar component="nav">
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={() => {
                            setMobile(!mobile)
                        }}
                        sx={{mr: 2, display: {sm: 'none'}}}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{flexGrow: 1, display: {xs: 'none', sm: 'block'}}}
                    >
                        <MainIcon mobile={false}/>
                    </Typography>
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon/>
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search…"
                            inputProps={{'aria-label': 'search'}}
                        />
                    </Search>
                    <Box sx={{display: {xs: 'none', sm: 'block'}}}>
                        {navItems.map((el, index) => (
                            <NavItemElement key={index} el={el}/>
                        ))}
                    </Box>
                </Toolbar>
            </AppBar>
            <DrawerNav/>
        </Box>
    )
}

export default DrawerAppBar;
