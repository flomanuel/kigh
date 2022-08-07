import React, {useEffect, useState} from "react";
import {useParams} from "react-router";
import {Card, CardActionArea, Skeleton, TextField, Tooltip} from "@mui/material";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import SaveIcon from '@mui/icons-material/Save';
import LoadingButton from '@mui/lab/LoadingButton';
import DefaultTemplate from "./DefaultTemplate";
import EntryDataService from "../services/EntryDataService";
import LinearProgressBarWithValueLabel from "../parts/LinearProgressBarWithValueLabel/_index";
import {ReactComponent as ImagePlaceholder} from "../static/images/ImagePlaceholder.svg";
import {useNavigate} from "react-router-dom";


function NewEntry() {
    const navigate = useNavigate();
    const {id} = useParams();
    const [entry, setEntry] = useState(null);
    const [isLoading, setIsLoading] = useState({status: false, progress: 0});

    const handleProgressEvent = (event) => setIsLoading(oldState => {
        return {...oldState, progress: event.total / event.loaded}
    });

    useEffect(() => {
        addEventListener('progress', handleProgressEvent);
        const entryChange = EntryDataService.onEntryChange().subscribe(entry => {
            if (entry) {
                setEntry(entry);
            }
        });
        if (id) {
            EntryDataService.init(id);
        } else {
            EntryDataService.getNewEntry();
        }
        return function cleanup() {
            removeEventListener('progress', handleProgressEvent);
            entryChange.unsubscribe();
        }
    }, [])

    const handleUploadClick = (e) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            entry.image = reader.result;
            setIsLoading(oldState => {
                return {...oldState, status: false}
            })
        }
        setIsLoading(oldState => {
            return {...oldState, status: true}
        })
        reader.readAsDataURL(e.target.files[0]);
    };

    const imageResetHandler = () => {
        setEntry(oldState => {
            return {...oldState, image: null}
        })
    };

    const ImageUpload = () => {
        return (
            <>
                <Card
                    sx={{mb: '1rem'}}
                    onClick={() => {
                        document.getElementById('image-upload-component')?.click();
                    }}
                >
                    <Tooltip title={`${entry.image === null ? "Click to select image." : "Click to remove."}`}>
                        <CardActionArea>
                            {entry.image === null &&
                                <>
                                    <input
                                        hidden accept="image/*" name="image-upload-component"
                                        id="image-upload-component" type="file" onChange={handleUploadClick}
                                    />
                                    <label hidden htmlFor="image-upload-component"/>
                                    <ImagePlaceholder style={{margin: '0 auto', display: 'block'}}/>
                                    {
                                        isLoading.status &&
                                        <>
                                            <LinearProgressBarWithValueLabel value={isLoading.progress}/>
                                        </>
                                    }
                                </>
                            }
                            {
                                entry.image !== null &&
                                <>
                                    <Box onClick={() => imageResetHandler()}>
                                        <img
                                            alt="Image for entry."
                                            style={{
                                                width: 'auto',
                                                maxWidth: '100%',
                                                height: '50vh',
                                                maxHeight: '200px',
                                                margin: '0 auto',
                                                display: 'block'
                                            }}
                                            src={entry.image}
                                        />
                                    </Box>
                                </>
                            }
                        </CardActionArea>
                    </Tooltip>
                </Card>
            </>
        )
    }

    return (
        <>
            <DefaultTemplate/>
            <Box component="main" sx={{p: 3}}>
                <Toolbar/>
                {
                    entry === null &&
                    <>
                        <Skeleton animation="wave" height={'3rem'}/>
                        <Skeleton animation="wave" height={'3rem'}/>
                        <Skeleton animation="wave" height={'6rem'}/>
                        <Skeleton animation="wave" height={'10rem'}/>
                    </>
                }
                {
                    entry !== null &&
                    <>
                        <TextField fullWidth required id="outlined-basic" label="Title" variant="outlined"
                                   sx={{mb: '1rem'}}
                                   defaultValue={entry.title}
                                   onChange={e => entry.title = e.target.value}
                        />
                        <TextField fullWidth required id="outlined-basic" label="URL" variant="outlined"
                                   sx={{mb: '1rem'}}
                                   defaultValue={entry.url}
                                   onChange={e => entry.url = e.target.value}
                        />
                        <TextField id="outlined-basic" label="Description" variant="outlined" fullWidth multiline
                                   sx={{mb: '1rem'}}
                                   defaultValue={entry.description}
                                   onChange={e => entry.description = e.target.value}
                        />
                        <ImageUpload/>
                    </>
                }
                <LoadingButton
                    color="secondary"
                    onClick={() => {
                        if (id) {
                            EntryDataService.updateEntry(entry);
                        } else {
                            EntryDataService.addEntry(entry);
                        }
                        navigate('/', {replace: true});
                    }}
                    // loading={loading}
                    loadingPosition="start"
                    startIcon={<SaveIcon/>}
                    variant="contained"
                >
                    Save
                </LoadingButton>
            </Box>
        </>
    )
}

export default NewEntry;
