using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TaskBoard.Api.Data;
using TaskBoard.Api.DTOs;
using TaskBoard.Api.Models;

namespace TaskBoard.Api.Controllers;


[ApiController]
[Route("api/[controller]")]
public class ProjectsController : ControllerBase
{
    private readonly TaskBoardDbContext _context;

    public ProjectsController(TaskBoardDbContext context)
    {
        _context = context;
    }
    
    
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Project>>> GetProjectsAsync()
    {
        var projects = await _context.Projects.ToListAsync();
        return Ok(projects);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Project>> GetProjectByIdAsync(Guid id)
    {
        var project = await _context.Projects.FindAsync(id);
        if (project is null) return NotFound();
        return Ok(project);
    }

    [HttpPost]
    public async Task<ActionResult<Project>> PostProjectAsync(CreateProjectDto dto)
    {
        var project = new Project(dto.Title, dto.Description);
        _context.Projects.Add(project);
        await _context.SaveChangesAsync(); 
        return CreatedAtAction("GetProjectById", new {id = project.Id}, project);
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteProjectAsync(Guid id)
    {
        var project = await _context.Projects.FindAsync(id);
        if (project is null) return NotFound();
        _context.Projects.Remove(project);
        await _context.SaveChangesAsync();
        return NoContent();
    }
    
    [HttpPut("{id}")]
    public async Task<ActionResult> PutProjectAsync(Guid id, UpdateProjectDto dto)
    {
        var projectToUpdate = await _context.Projects.FindAsync(id);
        if (projectToUpdate is null) return NotFound();
        projectToUpdate.Title = dto.Title;
        projectToUpdate.Description = dto.Description;
        await _context.SaveChangesAsync();
        return NoContent();
    }
}