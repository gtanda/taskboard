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

    public TaskItem(string title, string? description, int position, Guid projectId, Project? project)
    {
        Id = Guid.NewGuid();
        Title = title;
        Description = description;
        State = TaskState.Todo;
        Created = DateTime.UtcNow;
        Position = position;
        ProjectId = projectId;
        Project = project;
    }


    
    public TaskItem(){}

}