import * as React from 'react';
import {Avatar, SvgIcon} from "@mui/material";
import {ReactComponent as IconGlobe} from '../static/images/IconGlobe.svg';

function MainIcon() {
    return (
        <Avatar>
            <SvgIcon component={IconGlobe} inheritViewBox/>
        </Avatar>
    )
}

export default MainIcon;