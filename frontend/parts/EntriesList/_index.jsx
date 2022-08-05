import * as React from 'react';
import PropTypes from "prop-types";

import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import Box from "@mui/material/Box";

import ListItemContainer from "./ListItemContainer";


export default function EntriesList(props) {
    EntriesList.propTypes = {
        entries: PropTypes.array,
        selectedEntries: PropTypes.array,
        setSelectedEntries: PropTypes.func,
        setShowContextMenu: PropTypes.func
    }

    return (
        <List sx={{width: '100%', bgcolor: 'background.paper'}}>
            {props.entries.map((entry, index) => (
                <Box key={index}>
                    <ListItemContainer
                        entry={entry}
                        selectedEntries={props.selectedEntries} setSelectedEntries={props.setSelectedEntries}
                    />
                    <Divider variant="inset" component="li"/>
                </Box>
            ))}
        </List>
    );
}
