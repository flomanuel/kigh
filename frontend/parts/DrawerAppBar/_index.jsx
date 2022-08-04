import React, {useState} from "react";
import {Navigate, useLocation} from "react-router-dom";

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


function DrawerAppBar() {
    const [mobile, setMobile] = useState(false);
    const [navItems] = useState(
        [
            {
                title: "Entries",
                fragment: "/",
            },
            {
                title: "Add new website",
                fragment: "/entry",
            },
            {
                title: "Settings",
                fragment: "/settings",
            }
        ]
    );
    const [navRoute, setNavRoute] = useState(null);
    const drawerWidth = 240;

    const NavItemElement = (index) => {
        const location = useLocation();
        const isActiveElement = navItems[index].fragment === location.pathname;
        return (
            <Button key={navItems[index].title}
                    color="inherit"
                    onClick={() => {
                        if (!isActiveElement) {
                            setNavRoute(navItems[index].fragment)
                        }
                    }}>
                {navItems[index].title}
                {
                    !isActiveElement &&
                    typeof navRoute === "string" &&
                    <Navigate to={navRoute} replace={true}/>
                }
            </Button>
        )
    }

    const drawerNav = () => {
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
                                    setNavRoute={setNavRoute}
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
                        {NavItemElement(0)}
                        {NavItemElement(1)}
                        {NavItemElement(2)}
                    </Box>
                </Toolbar>
            </AppBar>
            {drawerNav()}
        </Box>
    )
}

export default DrawerAppBar;
