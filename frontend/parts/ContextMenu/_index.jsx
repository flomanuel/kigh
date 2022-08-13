import * as React from 'react';
import PropTypes from "prop-types";
import {useNavigate} from "react-router-dom";

import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import EntryDataService from "../../services/EntryDataService";


export default function ContextMenu(props) {

    ContextMenu.propTypes = {
        posX: PropTypes.number,
        posY: PropTypes.number,
        width: PropTypes.number,
        selectedEntries: PropTypes.array,
        setContextMenuSettings: PropTypes.func
    }

    const nav = useNavigate();
    const navigateToEditPage = () => {
        nav(`/entry/${props.selectedEntries[0]}`, {replace: true});
    }

    const exportSelection = () => {
        EntryDataService.exportEntrySelectionElements();
    }

    const closeContextMenu = () => {
        props.setContextMenuSettings(oldState => {
            return {...oldState, showMenu: false}
        });
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
                    props.selectedEntries.length === 1 &&
                    (<MenuItem onClick={() => navigateToEditPage()}>
                        <ListItemIcon>
                            <EditIcon fontSize="small"/>
                        </ListItemIcon>
                        <ListItemText>Edit</ListItemText>
                    </MenuItem>)
                }
                <MenuItem
                    sx={{...(props.selectedEntries.length === 0 && {cursor: 'not-allowed'})}}
                    onClick={() => {
                        props.selectedEntries.forEach(entry => {
                            EntryDataService.deleteEntry(entry);
                        });
                        closeContextMenu();
                    }}
                >
                    <ListItemIcon>
                        <DeleteIcon
                            color={props.selectedEntries.length === 0 ? "disabled" : ""}
                            fontSize="small"/>
                    </ListItemIcon>
                    <ListItemText>Delete{`${props.selectedEntries.length > 1 ? " Selection" : ''}`}</ListItemText>
                </MenuItem>
                <MenuItem
                    sx={{...(props.selectedEntries.length === 0 && {cursor: 'not-allowed'})}}
                    onClick={() => {
                        exportSelection();
                        closeContextMenu();
                    }}
                >
                    <ListItemIcon>
                        <ImportExportIcon
                            color={props.selectedEntries.length === 0 ? "disabled" : ""}
                            fontSize="small"/>
                    </ListItemIcon>
                    <ListItemText>Export{`${props.selectedEntries.length > 1 ? " Selection" : ''}`}</ListItemText>
                </MenuItem>
            </MenuList>
        </Paper>
    );
}
