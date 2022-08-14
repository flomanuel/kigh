import * as React from 'react';
import PropTypes from "prop-types";

import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import {grey} from "@mui/material/colors";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import {Switch, Tooltip} from "@mui/material";

import EventAllowed from "../../helpers/EventAllowed";
import EntryDataService from "../../services/EntryDataService";


export default function EntriesList(props) {

    const addRemoveEntry = (event, entry) => {
        if (EventAllowed(event, ['ListItemContainer__Switch'])) {
            event.preventDefault();
            let res = [];
            if (event.ctrlKey) {
                if (props.selectedEntries.includes(entry.Id)) {
                    res = props.selectedEntries.filter(el => el !== entry.Id);
                } else {
                    res = [...props.selectedEntries, entry.Id];
                }
            } else {
                if (props.selectedEntries.length > 1 || !props.selectedEntries.includes(entry.Id)) {
                    res = [entry.Id];
                }
            }

            EntryDataService.updateEntrySelection(res)
        }
    }

    const ListItemContainer = ({entry}) => {
        return (
            <ListItem alignItems="flex-start"
                      onClick={e => addRemoveEntry(e, entry)}
                      className={`ListItemContainer ${props.selectedEntries.includes(entry.Id) ? "ListItemContainer--selected" : ""}`}
                      sx={{
                          cursor: "default",
                          '&.MuiListItem-root:hover:not(.ListItemContainer--selected)': {background: grey["200"]},
                          ...(props.selectedEntries.includes(entry.Id) && {'&.MuiListItem-root': {background: grey["300"]}})
                      }}
                      data-id={entry.Id}
            >
                <ListItemAvatar>
                    <Avatar alt={'Icon for entry' + entry.Title} src={entry.Image}/>
                </ListItemAvatar>
                <ListItemText
                    primary={entry.Title.substring(0, 20).trim() + (entry.Title.length > 20 ? '...' : '')}
                    secondary={<>
                        <Typography
                            sx={{display: 'inline'}}
                            component="span"
                            variant="body2"
                            color="text.primary"
                        >
                            {entry.Url.substring(0, 50).trim() + (entry.Url.length > 50 ? '...' : '')}
                        </Typography>
                        <br/>
                        {entry.Description.substring(0, 150).trim() + (entry.Description.length > 150 ? '...' : '')}
                    </>}
                />
                <ListItemText
                    primary={
                        <Typography
                            sx={{display: 'block', position: 'relative'}}
                            component="span"
                            variant="body2"
                            color="text.secondary"
                        >
                            <Tooltip title="open at startup">
                                <Switch
                                    className={"ListItemContainer__Switch"}
                                    defaultChecked={entry.OpenAtStartup}
                                    onChange={(e) => {
                                        entry.OpenAtStartup = Boolean(e.target.checked);
                                        EntryDataService.updateEntry(entry);
                                    }}
                                />
                            </Tooltip>
                        </Typography>
                    }
                />
            </ListItem>
        )
    }

    ListItemContainer.propTypes = {
        entry: PropTypes.object
    }

    EntriesList.propTypes = {
        entries: PropTypes.array,
        selectedEntries: PropTypes.array
    }

    return (
        <List sx={{width: '100%', bgcolor: 'background.paper'}}>
            {props.entries.map((entry, index) => (
                <Box key={index}>
                    <ListItemContainer
                        entry={entry}
                    />
                    <Divider variant="inset" component="li"/>
                </Box>
            ))}
        </List>
    );
}
