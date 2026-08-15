using System.Net;
using System.Net.Http.Json;

namespace TaskBoard.Api.Tests;

public class ProjectsControllerTests : IClassFixture<TaskBoardApiFactory>
{
    private readonly HttpClient _client;

    public ProjectsControllerTests(TaskBoardApiFactory factory)
    {
        _client = factory.CreateClient();
    }

    [Fact]
    public async Task PostProject_ReturnsCreate()
    {
        var newProject = new { title = "Integration Testing Project", description = "Created by test" };

        var response = await _client.PostAsJsonAsync("/api/projects", newProject);
        
        Assert.Equal(HttpStatusCode.Created, response.StatusCode);
    }
}