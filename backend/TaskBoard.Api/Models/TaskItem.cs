namespace TaskBoard.Api.Models;

public class TaskItem
{
    public Guid Id { get; set; }
    public string Title { get; set; }
    public string? Description { get; set; }
    public TaskState State { get; set; }
    public DateTime Created { get; set; }
    public int Position { get; set; }
    public Guid ProjectId { get; set; }
    public Project? Project { get; set; }

    public TaskItem(string title, string? description, TaskState state, DateTime created, int position, Guid projectId, Project? project)
    {
        Id = Guid.NewGuid();
        Title = title;
        Description = description;
        State = state;
        Created = created;
        Position = position;
        ProjectId = projectId;
        Project = project;
    }


    public TaskItem(){}

}