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

    public void Update(Entry entry)
    {
        Title = entry.Title;
        Url = entry.Url;
        Description = entry.Description;
        OpenAtStartup = entry.OpenAtStartup;
        Image = entry.Image;
        Id = entry.Id;
    }
}