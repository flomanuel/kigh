import * as React from 'react';
import {useEffect, useState} from "react";
import Snackbar from "@mui/material/Snackbar";
import {Alert} from "@mui/material";
import FeedbackDataService from "../../services/FeedbackDataService";


export default function FeedbackProvider() {

    const [feedback, setFeedback] = useState(null);

    useEffect(() => {
        const feedbackChange = FeedbackDataService.onFeedbackChange().subscribe(feedback => {
            if (feedback) {
                setFeedback(feedback);
            }
        });
        return function cleanup() {
            feedbackChange.unsubscribe();
        }
    }, [])

    const closeFeedback = (event, reason) => {
        if (reason && reason === 'clickaway') {
            return;
        }
        setFeedback(oldValues => {
            return {...oldValues, open: false};
        })
        setTimeout(() => FeedbackDataService.nextFeedback(), 350)
    }

    return (
        <>
            {feedback &&
                <Snackbar open={feedback.open}
                          autoHideDuration={6000}
                          onClose={(e, r) => closeFeedback(e, r)}>
                    <Alert severity={feedback.severity}
                           onClose={e => closeFeedback(e)}
                           sx={{width: '100%'}}>
                        {feedback.message}
                    </Alert>
                </Snackbar>
            }
        </>
    )
}
