import React, {useEffect, useState} from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import {Skeleton} from "@mui/material";
import DefaultTemplate from "./DefaultTemplate";
import EntriesList from "../parts/EntriesList/_index";
import EventAllowed from "../helpers/EventAllowed";
import ContextMenu from "../parts/ContextMenu/_index";
import SelectElement from "../helpers/SelectElement";
import EntryDataService from "../services/EntryDataService";


function Main() {
    const [entries, setEntriesHook] = useState(null);
    const [selectedEntries, setSelectedEntriesHook] = useState(null);

    useEffect(() => {
        const entryChange = EntryDataService.onEntryChange().subscribe(entriesArray => {
            if (entriesArray) {
                setEntriesHook(entriesArray);
            }
        });
        const entrySelectionChange = EntryDataService.onEntrySelectionChange().subscribe(entriesSelectionArray => {
            if (entriesSelectionArray) {
                setSelectedEntriesHook(entriesSelectionArray);
            }
        })
        EntryDataService.init();

        return function cleanup() {
            entryChange.unsubscribe();
            entrySelectionChange.unsubscribe();
        }
    }, [])

    const clearSelectedEntries = (e) => {
        if (EventAllowed(e, ['MuiListItem-root', 'ContextMenu'])) {
            EntryDataService.updateEntrySelection([]);
        }
    }

    const [contextMenuSettings, setContextMenuSettings] = useState({
        showMenu: false,
        xPosition: 0,
        yPosition: 0
    });

    const contextMenuWidth = 300;

    const toggleContextMenu = e => {
        if (!e.ctrlKey && EventAllowed(e, ['ContextMenu', 'ListItemContainer__Switch'])) {
            e.preventDefault();
            const xp = window.innerWidth < e.pageX + contextMenuWidth ? e.pageX - contextMenuWidth : e.pageX;
            const xy = e.pageY;
            if (e.button === 0) { //Main button. Always close context menu.
                setContextMenuSettings(oldState => {
                    return {...oldState, xPosition: xp, yPosition: xy, showMenu: false}
                });
            } else {
                if (!EventAllowed(e, ['ListItemContainer'])) {
                    const element = SelectElement(e, ['ListItemContainer']);
                    if (!element.classList.contains('ListItemContainer--selected')) {
                        const id = element.dataset.id;
                        EntryDataService.updateEntrySelection([id]);
                    }
                }
                setContextMenuSettings(oldState => {
                    return {...oldState, xPosition: xp, yPosition: xy, showMenu: true}
                });
            }
        }
    }

    useEffect(() => {
        document.addEventListener('click', clearSelectedEntries);
        document.addEventListener('click', toggleContextMenu);
        document.addEventListener('contextmenu', toggleContextMenu);
        return function cleanup() {
            document.removeEventListener('click', clearSelectedEntries)
            document.removeEventListener('click', toggleContextMenu)
            document.removeEventListener('contextmenu', toggleContextMenu)
        }
    }, [])

    return (
        <>
            <DefaultTemplate/>
            <Box component="main" sx={{p: 3, height: "100%"}}>
                <Toolbar/>
                {
                    entries !== null &&
                    <EntriesList
                        entries={entries}
                        selectedEntries={selectedEntries}
                    />
                }
                {
                    entries === null &&
                    <>
                        <Skeleton animation="wave" height={'6rem'}/>
                        <Skeleton animation="wave" height={'6rem'}/>
                        <Skeleton animation="wave" height={'6rem'}/>
                    </>
                }
            </Box>
            {
                contextMenuSettings.showMenu &&
                <ContextMenu posX={contextMenuSettings.xPosition}
                             posY={contextMenuSettings.yPosition}
                             width={contextMenuWidth}
                             selectedEntries={selectedEntries}
                             toggleContextMenu={toggleContextMenu}
                             setContextMenuSettings={setContextMenuSettings}
                />
            }
        </>
    )
}

export default Main;
