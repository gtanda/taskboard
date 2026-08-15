using System.Globalization;
using TaskBoard.Api.DTOs;
using TaskBoard.Api.Models;

namespace TaskBoard.Api.Tests;

public class TaskItemDtoTests
{
    [Fact]
    public void FromEntity_MapAllFields()
    {
        var task = new TaskItem("Test Task", "Test description", 0, Guid.NewGuid(), null);
        var dto = TaskItemDto.FromEntity(task);
        
        Assert.Equal("Test Task", dto.Title);
        Assert.Equal("Test description", dto.Description);
        Assert.Equal(0, dto.Position);
        Assert.Equal(task.Id, dto.Id);

        var timeDifference = DateTime.UtcNow - dto.Created;
        Assert.True(timeDifference.TotalSeconds < 2);
    }


}
