namespace TaskBoard.Api.Models;

public class Project
{
    public Guid Id { get; set; }
    public string Title { get;  set; }
    public string? Description { get;  set; }

    public Project (string projectTitle, string? projectDescription)
    {
        Id = Guid.NewGuid();
        Title = projectTitle;
        Description = projectDescription;
    }

    public Project()
    {
    }
}