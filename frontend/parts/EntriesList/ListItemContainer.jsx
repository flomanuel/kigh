import * as React from "react";
import PropTypes from "prop-types";

import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import {Switch, Tooltip} from "@mui/material";
import {grey} from '@mui/material/colors';

import EventAllowed from "../../helpers/EventAllowed";


export default function ListItemContainer(props) {
    ListItemContainer.propTypes = {
        entry: PropTypes.object,
        selectedEntries: PropTypes.array,
        setSelectedEntries: PropTypes.func,
    }

    const addRemoveEntry = (event) => {
        if (EventAllowed(event, ['ListItemContainer__Switch'])) {
            event.preventDefault();
            props.setSelectedEntries(prevState => {
                if (event.ctrlKey) {
                    if (prevState.includes(props.entry.id)) {
                        return prevState.filter(el => el !== props.entry.id);
                    }
                    return [...prevState, props.entry.id];
                } else {
                    if (prevState.length > 1) {
                        return [props.entry.id];
                    } else if (prevState.includes(props.entry.id)) {
                        return [];
                    } else {
                        return [props.entry.id];
                    }
                }
            });
        }
    }

    return (
        <ListItem alignItems="flex-start"
                  onClick={e => addRemoveEntry(e)}
                  className={`ListItemContainer ${props.selectedEntries.includes(props.entry.id) ? "ListItemContainer--selected" : ""}`}
                  sx={{
                      cursor: "default",
                      '&.MuiListItem-root:hover:not(.ListItemContainer--selected)': {background: grey["200"]},
                      ...(props.selectedEntries.includes(props.entry.id) && {'&.MuiListItem-root': {background: grey["300"]}})
                  }}
                  data-id={props.entry.id}
        >
            <ListItemAvatar>
                <Avatar alt={'Icon for entry' + props.entry.title} src={props.entry.image}/>
            </ListItemAvatar>
            <ListItemText
                primary={props.entry.title.substring(0, 20).trim() + (props.entry.title.length > 20 ? '...' : '')}
                secondary={<React.Fragment>
                    <Typography
                        sx={{display: 'inline'}}
                        component="span"
                        variant="body2"
                        color="text.primary"
                    >
                        {props.entry.url.substring(0, 50).trim() + (props.entry.url.length > 50 ? '...' : '')}
                    </Typography>
                    <br/>
                    {props.entry.description.substring(0, 150).trim() + (props.entry.description.length > 150 ? '...' : '')}
                </React.Fragment>}
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
                                defaultChecked={props.entry.openAtStartup}
                                onChange={(e) => {
                                    props.entry.openAtStartup = Boolean(e.target.checked);
                                }}
                            />
                        </Tooltip>
                    </Typography>
                }
            />
        </ListItem>
    )
}
