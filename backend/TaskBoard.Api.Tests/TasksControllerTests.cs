using System.Net;
using System.Net.Http.Json;
using TaskBoard.Api.DTOs;
using TaskBoard.Api.Models;

namespace TaskBoard.Api.Tests;

public class TasksControllerTests : IClassFixture<TaskBoardApiFactory>
{
    private readonly HttpClient _client;
    
    public TasksControllerTests(TaskBoardApiFactory factory)
    {
        _client = factory.CreateClient();
    }

    private async Task<Guid> CreateTestProjectAsync(string title = "...", string description = "...")
    {
        var newProject = new {title, description};
        var postResponse = await _client.PostAsJsonAsync("api/projects", newProject);

        var createdProject = await postResponse.Content.ReadFromJsonAsync<Project>();

        return createdProject!.Id;
    }

    private async Task<Guid> CreateTestTaskAsync(Guid projectId,  string title = "...", string description = "...")
    {
        var  newTask = new {title, description};
        var  postResponse = await _client.PostAsJsonAsync($"/api/projects/{projectId}/tasks", newTask);
        
        var createdTask = await postResponse.Content.ReadFromJsonAsync<TaskItemDto>();

        return createdTask!.Id;
    }
    
    [Fact]
    public async Task CreateTask_ReturnsCreated()
    {
        var projectId = await CreateTestProjectAsync("Task Integration Testing", "Integration Description");

        var newTask = new { title = "task1", description = "task 1 description" };

        var response = await _client.PostAsJsonAsync($"/api/projects/{projectId}/tasks", newTask);
        
        Assert.Equal(HttpStatusCode.Created, response.StatusCode);
    }

    [Fact]
    public async Task CreateTask_WithEmptyTitle_ReturnsBadRequest()
    {
        var projectId = await CreateTestProjectAsync("Task Integration Testing", "Integration Description");
        var newTask = new {title = "", description = "has description"};
        
        var response = await _client.PostAsJsonAsync($"/api/projects/{projectId}/tasks", newTask);
        
        Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
    }

    [Fact]
    public async Task CreateTask_WithInvalidProjectId_ReturnsNotFound()
    {
        var dummyId =  Guid.NewGuid();
        var newTask =  new { title = "task1", description = "task 1 description" };
        
        var response = await _client.PostAsJsonAsync($"/api/projects/{dummyId}/tasks", newTask);
        
        Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
    }
    
    [Fact]
    public async Task CreateTask_ReturnsCorrectLocationHeader()
    {
        var projectId = await CreateTestProjectAsync();
        var newTask = new { title = "task1", description = "task 1 description" };

        var response = await _client.PostAsJsonAsync($"/api/projects/{projectId}/tasks", newTask);
        
        Assert.NotNull(response.Headers.Location);
        
        var createdTask = await response.Content.ReadFromJsonAsync<TaskItemDto>();

        Assert.Contains(createdTask!.Id.ToString(), response.Headers.Location!.ToString());
    }

    [Fact]
    public async Task PostThenGetTask_ReturnsSameData()
    {
        var projectId = await CreateTestProjectAsync("Task Integration Testing", "Integration Description");
        
        var newTask =  new { title = "task1", description = "task 1 description" };
        var response = await _client.PostAsJsonAsync($"/api/projects/{projectId}/tasks", newTask);
        
        var createdTask = await response.Content.ReadFromJsonAsync<TaskItemDto>();
        var getResponse = await _client.GetAsync($"/api/tasks/{createdTask!.Id}");
        
        var fetchedTask = await getResponse.Content.ReadFromJsonAsync<TaskItemDto>();
        
        Assert.Equal(createdTask!.Title, fetchedTask!.Title);
    }

    [Fact]
    public async Task ReorderTasks_ReturnsNoContent()
    {
        var projectId = await CreateTestProjectAsync();
        
        var createdTask1Id = await CreateTestTaskAsync(projectId, "task1", "task 1 desc");
        var createdTask2Id = await CreateTestTaskAsync(projectId, "task2", "task 2 desc");
        
        var updates = new []
        {
            new {taskId = createdTask1Id, newPosition = 0, newState = TaskState.InProgress},
            new {taskId = createdTask2Id, newPosition = 1, newState = TaskState.InProgress},
        };
        
        var response = await _client.PutAsJsonAsync($"/api/tasks/reorder", updates);
        Assert.Equal(HttpStatusCode.NoContent, response.StatusCode);
    }

    [Fact]
    public async Task ReorderTasks_WithInvalidTaskId_ReturnsNotFound()
    {
        var projectId = await CreateTestProjectAsync();
        
        var createdTask1Id = await CreateTestTaskAsync(projectId, "task1", "task1 desc");

        var updates = new[]
        {
            new { taskId = createdTask1Id, newPosition = 3, newState = TaskState.InProgress },
            new { taskId = Guid.NewGuid(), newPosition = 1, newState = TaskState.InProgress },
        };
        
        var response = await _client.PutAsJsonAsync($"/api/tasks/reorder", updates);
        
        Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
        
        var getResponse = await _client.GetAsync($"/api/tasks/{createdTask1Id}");
        
        var fetchedTask = await getResponse.Content.ReadFromJsonAsync<TaskItemDto>();
        
        Assert.Equal(TaskState.Todo, fetchedTask!.State);
        Assert.Equal(0, fetchedTask.Position);
    }
    
    [Fact]
    public async Task DeleteTask_ReturnsNoContent()
    {
        var projectId = await CreateTestProjectAsync();
        var createdTaskId = await CreateTestTaskAsync(projectId, "task1", "task1 desc");
        
        var deleteResponse = await _client.DeleteAsync($"/api/tasks/{createdTaskId}");
        
        Assert.Equal(HttpStatusCode.NoContent, deleteResponse.StatusCode);
        
        var getResponse = await _client.GetAsync($"/api/tasks/{createdTaskId}");
        
        Assert.Equal(HttpStatusCode.NotFound, getResponse.StatusCode);
    }

    [Fact]
    public async Task DeleteTask_WithInvalidId_ReturnsNotFound()
    {
        var response = await _client.DeleteAsync($"/api/tasks/{Guid.NewGuid()}");
        
        Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
    }

    [Fact]
    public async Task UpdateTask_ReturnsNoContent()
    {
        var projectId = await CreateTestProjectAsync();
        var createdTaskId = await CreateTestTaskAsync(projectId, "task1", "task1 desc");
        
        var updatedTask = new
        {
            title = "task1", description = "task 1 description", state = TaskState.Completed,
            position = 0
        };
        var updateResponse = await _client.PutAsJsonAsync($"/api/tasks/{createdTaskId}", updatedTask);
        
        Assert.Equal(HttpStatusCode.NoContent, updateResponse.StatusCode);
        
        var getResponse = await _client.GetAsync($"/api/tasks/{createdTaskId}");
        var fetchedTask = await getResponse.Content.ReadFromJsonAsync<TaskItemDto>();
        
        Assert.Equal(TaskState.Completed, fetchedTask!.State);
        Assert.Equal("task 1 description", fetchedTask.Description);
    }

    [Fact]
    public async Task UpdateTask_WithInvalidId_ReturnsNotFound()
    {
        var dummyTask = new {title = "task1", description = "task1 desc", state = TaskState.InProgress, position = 0};
        var response = await _client.PutAsJsonAsync($"/api/tasks/{Guid.NewGuid()}",dummyTask);
        Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
    }
}