import React, {Component} from "react";
import {Avatar, SvgIcon} from "@mui/material";
import {ReactComponent as IconGlobe} from '../static/images/IconGlobe.svg';
import {ReactComponent as IconGlobeWhite} from '../static/images/IconGlobe--white.svg';
import {blue, common} from "@mui/material/colors";

class MainIcon extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Avatar sx={{bgcolor: this.props.mobile ? common.white : blue[700]}}>
                <SvgIcon component={this.props.mobile ? IconGlobe : IconGlobeWhite} inheritViewBox
                         sx={{width: 35, height: 35}}/>
            </Avatar>
        )
    }
}

export default MainIcon;
