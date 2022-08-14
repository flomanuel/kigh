using System;
using Microsoft.EntityFrameworkCore;

namespace kigh.WebMessageHandler.Model;

public class EntryContext : DbContext
{
    public DbSet<Entry> Entries { get; set; }

    public string DbPath { get; }

    public EntryContext()
    {
        var folder = Environment.SpecialFolder.LocalApplicationData;
        var path = Environment.GetFolderPath(folder);
        DbPath = System.IO.Path.Join(path, "kigh.db");
    }

    protected override void OnConfiguring(DbContextOptionsBuilder options)
        => options.UseSqlite($"Data Source={DbPath}");
}