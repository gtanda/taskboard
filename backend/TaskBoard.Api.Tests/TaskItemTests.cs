using TaskBoard.Api.Models;

namespace TaskBoard.Api.Tests;

public class TaskItemTests
{
    [Fact]
    public void Constructor_DefaultsStateToToDo()
    {
        var task = new TaskItem("Test Task", "Test Description", 0, Guid.NewGuid(), null);
        Assert.Equal(TaskState.Todo, task.State);
    }

    [Fact]
    public void Constructor_SetsCreatedToCurrentTime()
    {
        var task = new TaskItem("Test Task", "Test Description", 0, Guid.NewGuid(), null);
        var timeDifference = DateTime.UtcNow - task.Created;
        Assert.True(timeDifference.TotalSeconds < 2);
    }
}