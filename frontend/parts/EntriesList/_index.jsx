import * as React from 'react';
import PropTypes from "prop-types";

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Box from "@mui/material/Box";
import {FormControlLabel, Switch} from "@mui/material";


export default function EntriesList(props) {
    return (
        <List sx={{width: '100%', bgcolor: 'background.paper'}}>
            {props.entries.map((entry, index) => (
                <Box key={index}>
                    <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                            <Avatar alt={'Icon for entry' + entry.title} src={entry.image}/>
                        </ListItemAvatar>
                        <ListItemText
                            primary={entry.title.substring(0, 20).trim() + (entry.title.length > 20 ? '...' : '')}
                            secondary={<React.Fragment>
                                <Typography
                                    sx={{display: 'inline'}}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                >
                                    {entry.url.substring(0, 50).trim() + (entry.url.length > 50 ? '...' : '')}
                                </Typography>
                                <br/>
                                {entry.description.substring(0, 150).trim() + (entry.description.length > 150 ? '...' : '')}
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
                                    <FormControlLabel
                                        label="open at startup"
                                        labelPlacement="top"
                                        value={false}
                                        control={<Switch checked={entry.openAtStartup} onChange={(e) => {
                                            console.log(e.target.checked)
                                        }}/>}
                                    />
                                </Typography>
                            }
                        />
                    </ListItem>

                    <Divider variant="inset" component="li"/>
                </Box>
            ))}
        </List>
    );
}

EntriesList.propTypes = {
    entries: PropTypes.array,
}
