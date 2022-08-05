import * as React from 'react';
import PropTypes from "prop-types";

import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import Cloud from '@mui/icons-material/Cloud';


export default function IconMenu(props) {

    IconMenu.propTypes = {
        posX: PropTypes.number,
        posY: PropTypes.number,
        width: PropTypes.number,
        selectedEntries: PropTypes.array
    }

    return (
        <Paper
            sx={{
                width: `${props.width}px`,
                maxWidth: '100%',
                position: 'absolute',
                left: `${props.posX}px`,
                top: `${props.posY}px`
            }}
            className={'ContextMenu'}
        >
            <MenuList>
                {
                    props.selectedEntries.length <= 1 &&
                    (<MenuItem>
                        <ListItemIcon>
                            <EditIcon fontSize="small"/>
                        </ListItemIcon>
                        <ListItemText>Edit</ListItemText>
                    </MenuItem>)
                }
                <MenuItem>
                    <ListItemIcon>
                        <DeleteIcon fontSize="small"/>
                    </ListItemIcon>
                    <ListItemText>Delete{`${props.selectedEntries.length > 1 ? " Selection" : ''}`}</ListItemText>
                </MenuItem>
                <MenuItem>
                    <ListItemIcon>
                        <ImportExportIcon fontSize="small"/>
                    </ListItemIcon>
                    <ListItemText>Export{`${props.selectedEntries.length > 1 ? " Selection" : ''}`}</ListItemText>
                </MenuItem>
                <Divider/>
                <MenuItem>
                    <ListItemIcon>
                        <Cloud fontSize="small"/>
                    </ListItemIcon>
                    <ListItemText>Dummy text</ListItemText>
                </MenuItem>
            </MenuList>
        </Paper>
    );
}
