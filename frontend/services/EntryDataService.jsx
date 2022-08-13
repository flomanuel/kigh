import {Subject} from 'rxjs';
import BackendTasks from "../helpers/BackendTasks";
import FeedbackDataService from "./FeedbackDataService";
import copy from "copy-to-clipboard";


const entrySubject = new Subject();
const entrySelectionSubject = new Subject();

const EntryObjectTpl = (id, title, url, description, openAtStartup, image) => {
    return {Id: id, Title: title, Url: url, Description: description, OpenAtStartup: openAtStartup, Image: image}
}

let entrySelectionArray = [];

const initEntrySelection = () => {
    entrySelectionSubject.next(entrySelectionArray);
}

const dispatchBackendTask = message => {
    window.external.sendMessage(message);
}

const initEntries = entryID => {
    let message = {
        Task: BackendTasks.GetEntries,
        EntryList: []
    }
    if (entryID) { //get entry with id
        message.EntryList = [{Id: entryID}]
    }
    dispatchBackendTask(JSON.stringify(message))
}

const init = (entryID) => {
    initEntrySelection();
    initEntries(entryID);
}

const getNewEntry = () => {
    entrySubject.next([EntryObjectTpl("", "", "", "", false, null)]);
}

const updateEntry = entry => {
    let message = {
        Task: BackendTasks.UpdateEntry,
        EntryList: [entry]
    }
    dispatchBackendTask(JSON.stringify(message))
}

const addEntry = entry => {
    let message = {
        Task: BackendTasks.AddEntry,
        EntryList: [entry]
    }
    dispatchBackendTask(JSON.stringify(message))
}

const deleteEntry = (entry) => {
    let message = {
        Task: BackendTasks.DeleteEntry,
        EntryList: [{Id: entry}]
    }
    dispatchBackendTask(JSON.stringify(message))
}

const updateEntrySelection = selection => {
    entrySelectionArray = selection;
    entrySelectionSubject.next(entrySelectionArray);
}

const addEntrySelectionElement = element => {
    entrySelectionArray.push(element);
    entrySelectionSubject.next(entrySelectionArray);
}

const exportEntrySelectionElements = () => {
    let entries = [];
    entrySelectionArray.forEach(el => {
        entries.push({Id: el});
    })
    let message = {
        Task: BackendTasks.ExportEntries,
        EntryList: entries
    };
    dispatchBackendTask(JSON.stringify(message))
}

const handleBackendTaskResponse = () => {
    window.external.receiveMessage(resultText => {
        const jsonResult = JSON.parse(resultText);
        if (Number(jsonResult.HttpStatusCode) === 200) {
            switch (jsonResult.Task) {
                case BackendTasks.AddEntry:
                    FeedbackDataService.addFeedback('Added new entry.', true);
                    break;
                case BackendTasks.UpdateEntry:
                    FeedbackDataService.addFeedback('Updated entry.', true);
                    break;
                case BackendTasks.DeleteEntry:
                    FeedbackDataService.addFeedback('Deleted entry.', true);
                    break;
                case BackendTasks.ExportEntries:
                    if (copy(JSON.stringify(jsonResult.EntryList))) {
                        FeedbackDataService.addFeedback('Copied exported data to clipboard.', true)
                    } else {
                        FeedbackDataService.addFeedback('Could not copy exported data to clipboard.', true, 'error')
                    }
            }
            if (jsonResult.Task !== BackendTasks.ExportEntries)
                entrySubject.next(jsonResult.EntryList);
        }

    });
}
handleBackendTaskResponse();

const EntryDataService = {
    /* entries array */
    onEntryChange: () => entrySubject.asObservable(),
    addEntry: addEntry,
    deleteEntry: deleteEntry,
    updateEntry: updateEntry,
    getNewEntry: getNewEntry,

    /* entry selection array */ //todo: make EntrySelectionDataService
    onEntrySelectionChange: () => entrySelectionSubject.asObservable(),
    addEntrySelectionElement: addEntrySelectionElement,
    updateEntrySelection: updateEntrySelection,
    exportEntrySelectionElements: exportEntrySelectionElements,

    init: init,
    initEntrySelection: initEntrySelection,
    initEntries: initEntries
}

export default EntryDataService;
