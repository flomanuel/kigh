import * as React from 'react';
import {Avatar, SvgIcon} from "@mui/material";
import {ReactComponent as IconGlobe} from '../static/images/IconGlobe.svg';
import {ReactComponent as IconGlobeWhite} from '../static/images/IconGlobe--white.svg';
import {blue, common} from "@mui/material/colors";


function MainIcon(props) {
    const bgColor = props.mobile ? common.white : blue[700];
    const icon = props.mobile ? IconGlobe : IconGlobeWhite;

    return (
        <Avatar sx={{bgcolor: bgColor}}>
            <SvgIcon component={icon} inheritViewBox sx={{width: 35, height: 35}}/>
        </Avatar>
    )
}

export default MainIcon;
