import React from "react";
import {Avatar, SvgIcon} from "@mui/material";
import {ReactComponent as IconGlobe} from '../static/images/IconGlobe.svg';
import {ReactComponent as IconGlobeWhite} from '../static/images/IconGlobe--white.svg';
import {blue, common} from "@mui/material/colors";

function MainIcon(props) {
    return (
        <Avatar sx={{bgcolor: props.mobile ? common.white : blue[700]}}>
            <SvgIcon component={props.mobile ? IconGlobe : IconGlobeWhite} inheritViewBox
                     sx={{width: 35, height: 35}}/>
        </Avatar>
    )
}

export default MainIcon;
