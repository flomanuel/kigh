using System;

namespace kigh.WebMessageHandler;

/// <summary>
/// Link to a Website which is to be opened in an own window.
/// </summary>
public class Entry
{
    /// <summary>
    /// Unique ID of the entry.
    /// </summary>
    public string Id { get; }

    /// <summary>
    /// Title of the entry. Defined by the user.
    /// </summary>
    public string Title { get; private set; }

    /// <summary>
    /// URL of the website to be opened.
    /// </summary>
    public string Url { get; private set; }

    /// <summary>
    /// Description of the entry. Defined by the user.
    /// </summary>
    private string Description { get; set; }

    /// <summary>
    /// If the URL is to be opened at the startup of 'kigh'. Defined by the user.
    /// </summary>
    public bool OpenAtStartup { get; private set; }

    /// <summary>
    /// Base64-String of the entry icon. Defined by the user.
    /// </summary>
    private string Image { get; set; }

    /// <summary>
    /// Constructor of the entry class.
    /// </summary>
    /// <param name="title">Title of the entry. Defined by the user.</param>
    /// <param name="url">URL of the website to be opened.</param>
    /// <param name="description">Description of the entry. Defined by the user.</param>
    /// <param name="openAtStartup">If the URL is to be opened at the startup of 'kigh'. Defined by the user.</param>
    /// <param name="image">Base64-String of the entry icon. Defined by the user.</param>
    /// <param name="id">Unique ID of the entry.</param>
    /// <exception cref="ArgumentNullException">Thrown if title, url of description are null or an empty string.</exception>
    public Entry(string title, string url, string description, bool openAtStartup, string image, string id = null)
    {
        if (string.IsNullOrWhiteSpace(title) || string.IsNullOrWhiteSpace(url) ||
            string.IsNullOrWhiteSpace(description))
            throw new ArgumentNullException();
        Title = title;
        Url = url;
        Description = description;
        OpenAtStartup = openAtStartup;
        Image = image ?? "";
        Id = string.IsNullOrEmpty(id) ? Guid.NewGuid().ToString() : id;
    }

    /// <summary>
    /// Update entry with new values
    /// </summary>
    /// <param name="entryNewValues">Entry Object with new values.</param>
    public void Update(Entry entryNewValues)
    {
        if (entryNewValues == null)
            throw new ArgumentNullException();
        if (Equals(entryNewValues))
            return;

        if (!Title.Equals(entryNewValues.Title))
            Title = entryNewValues.Title;
        if (!Url.Equals(entryNewValues.Url))
            Url = entryNewValues.Url;
        if (!Description.Equals(entryNewValues.Description))
            Description = entryNewValues.Description;
        if (!OpenAtStartup.Equals(entryNewValues.OpenAtStartup))
            OpenAtStartup = entryNewValues.OpenAtStartup;
        if (!Image.Equals(entryNewValues.Image))
            Image = entryNewValues.Image;
    }

    /// <summary>
    /// Check if obj equals entry object.
    /// </summary>
    /// <param name="obj">Object to be compared to the current class.</param>
    /// <returns></returns>
    public override bool Equals(object obj)
    {
        var el = obj as Entry;
        return el != null && Title.Equals(el.Title) && Url.Equals(el.Url) && Description.Equals(el.Description) &&
               OpenAtStartup.Equals(el.OpenAtStartup) && Image.Equals(el.Image);
    }

    /// <summary>
    /// Creating the objects hash code.
    /// </summary>
    /// <returns>returns hash code</returns>
    public override int GetHashCode()
    {
        return base.GetHashCode() ^ Title.GetHashCode() ^ Url.GetHashCode() ^ Description.GetHashCode() ^
               OpenAtStartup.GetHashCode() ^ Image.GetHashCode();
    }
}