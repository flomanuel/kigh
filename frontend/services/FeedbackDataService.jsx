import {Subject} from "rxjs";


const feedbackSubject = new Subject();

let feedbackArray = [];

// let FeedbackObjectTpl = (severity, message) => {
//     return {severity: severity, message: message, open: true}
// }

const addFeedback = (feedback) => {
    feedbackArray.push(feedback);
    if (feedbackArray.length === 1) {
        feedbackSubject.next(feedbackArray[0]);
    }
};

const nextFeedback = () => {
    let feedbackValue = null;
    if (feedbackArray.length > 0) {
        feedbackArray.shift();
        if (feedbackArray.length > 0) {
            feedbackValue = feedbackArray[0];
        }
    }
    feedbackSubject.next(feedbackValue);
}

const FeedbackDataService = {
    onFeedbackChange: () => feedbackSubject.asObservable(),
    addFeedback: addFeedback,
    nextFeedback: nextFeedback
}


export default FeedbackDataService;
