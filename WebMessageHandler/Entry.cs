using System;

namespace kigh.WebMessageHandler;

public class Entry
{
    private string _id;

    public string Title { get; set; }
    public string Url { get; set; }
    public string Description { get; set; }
    public bool OpenAtStartup { get; set; }
    public string Image { get; set; }

    public string Id
    {
        get => _id;
        private set => _id = string.IsNullOrEmpty(value) ? Guid.NewGuid().ToString() : value;
    }

    public Entry(string title, string url, string description, bool openAtStartup, string image, string id = null)
    {
        Title = title;
        Url = url;
        Description = description;
        OpenAtStartup = openAtStartup;
        Image = image;
        Id = id;
    }

    public void Update(Entry entryNewValues)
    {
        if (Title != entryNewValues.Title)
            Title = entryNewValues.Title;
        if (Url != entryNewValues.Url)
            Url = entryNewValues.Url;
        if (Description != entryNewValues.Description)
            Description = entryNewValues.Description;
        if (OpenAtStartup != entryNewValues.OpenAtStartup)
            OpenAtStartup = entryNewValues.OpenAtStartup;
        if (Image != entryNewValues.Image)
            Image = entryNewValues.Image;
    }
}