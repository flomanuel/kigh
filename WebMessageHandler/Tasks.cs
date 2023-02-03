namespace kigh.WebMessageHandler;

/// <summary>
/// Each id is assigned to one 'InstructionWorker'.
/// Used by backend calls from the frontend to define which CRUD-Operation is to be used.
/// </summary>
/// <see cref="kigh.WebMessageHandler.InstructionWorker.AbstractWorker"/>
public enum Tasks
{
    AddEntry = 1,
    UpdateEntry = 2,
    DeleteEntry = 3,
    GetEntries = 4,
    ExportEntries = 5
}