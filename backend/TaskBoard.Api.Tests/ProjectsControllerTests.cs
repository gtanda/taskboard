using System.Net;
using System.Net.Http.Json;
using TaskBoard.Api.Models;

namespace TaskBoard.Api.Tests;

public class ProjectsControllerTests : IClassFixture<TaskBoardApiFactory>
{
    private readonly HttpClient _client;

    public ProjectsControllerTests(TaskBoardApiFactory factory)
    {
        _client = factory.CreateClient();
    }

    [Fact]
    public async Task PostProject_ReturnsCreated()
    {
        var newProject = new { title = "Integration Testing Project", description = "Created by test" };

        var response = await _client.PostAsJsonAsync("/api/projects", newProject);
        
        Assert.Equal(HttpStatusCode.Created, response.StatusCode);
    }

    [Fact]
    public async Task PostProject_WithEmptyTitle_ReturnsBadRequest()
    {
        var invalidProject = new { title = "", description = "Created by test" };
        
        var response = await _client.PostAsJsonAsync("/api/projects", invalidProject);

        Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
    }

    [Fact]
    public async Task GetProjectById_WithInvalidId_ReturnsNotFound()
    {
        var projectId = Guid.NewGuid();
        var response = await _client.GetAsync($"/api/projects/{projectId}");
        
        Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
    }


    [Fact]
    public async Task PostThenGetProject_ReturnsSameData()
    {
        var newProject = new { title = "Round Trip Test", description = "Testing full flow" };
        
        var postResponse = await _client.PostAsJsonAsync("/api/projects", newProject);
        var createdProject = await postResponse.Content.ReadFromJsonAsync<Project>();
        
        var getResponse = await _client.GetAsync($"/api/projects/{createdProject!.Id}");
        var fetchedProject = await getResponse.Content.ReadFromJsonAsync<Project>();

        Assert.Equal("Round Trip Test", fetchedProject!.Title);
    }
}