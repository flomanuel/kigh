import React, {Component} from "react";
import {Link} from "react-router-dom";

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


class DrawerAppBar extends Component {

    constructor(props) {
        super(props);
        this.window = this.props.window;
        this.state = {
            mobileOpen: false
        }

        this.drawerWidth = 240;
        this.navItems = [
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
        ];
    }

    container = this.window !== undefined ? () => this.window().document.body : undefined;

    render() {
        
        const setMobileOpen = () => this.setState({mobileOpen: !this.state.mobileOpen})
        
        return (
            <Box sx={{display: 'flex'}}>
                <AppBar component="nav">
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={setMobileOpen}
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
                            {this.navItems.map((item) => (
                                <Button key={item.title} sx={{color: '#fff'}}>
                                    <Link to={item.fragment}>{item.title}</Link>
                                </Button>
                            ))}
                        </Box>
                    </Toolbar>
                </AppBar>
                <Box component="nav">
                    <Drawer
                        container={this.container}
                        variant="temporary"
                        open={this.state.mobileOpen}
                        onClose={setMobileOpen}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                        sx={{
                            display: {xs: 'block', sm: 'none'},
                            '& .MuiDrawer-paper': {boxSizing: 'border-box', width: this.drawerWidth},
                        }}
                    >
                        <DrawerInterior navItems={this.navItems}
                                        setMobileOpen={setMobileOpen}
                                        {...this.props}
                        />
                    </Drawer>
                </Box>
            </Box>
        )
    }
}

export default DrawerAppBar;
