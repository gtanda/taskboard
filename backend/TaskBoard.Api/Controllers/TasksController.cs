using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TaskBoard.Api.Data;
using TaskBoard.Api.DTOs;
using TaskBoard.Api.Models;

namespace TaskBoard.Api.Controllers;


[ApiController]
[Route("api/[controller]")]
public class TasksController : ControllerBase
{
    private readonly TaskBoardDbContext _context;

    public TasksController(TaskBoardDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<TaskItem>>> GetTasksAsync()
    {
        var tasks = await _context.TaskItems.ToListAsync();
        return Ok(tasks);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<TaskItem>> GetTaskByIdAsync(Guid id)
    {
        var task = await _context.TaskItems.FindAsync(id);
        if (task is null) return NotFound();
        return Ok(task);
    }

    [HttpPost("/api/projects/{projectId}/tasks")]
    public async Task<ActionResult<TaskItem>> CreateTaskAsync(Guid projectId, CreateTaskDto dto)
    {
        var project = await _context.Projects.FindAsync(projectId);
        if (project is null) return NotFound();
        var position = await _context.TaskItems.Where(t => t.ProjectId == projectId && t.State == TaskState.Todo).CountAsync();
        var newTask = new TaskItem(dto.Title, dto.Description, position, project.Id, project);
        _context.Add(newTask);
        await _context.SaveChangesAsync();
        return CreatedAtAction("GetTaskById", new {id = newTask.Id}, newTask);
    }
    
    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteTaskAsync(Guid id)
    {
        var taskToDelete = await _context.TaskItems.FindAsync(id);
        if (taskToDelete is null) return NotFound();
        _context.TaskItems.Remove(taskToDelete);
        await _context.SaveChangesAsync();
        return NoContent();
    }

    // TODO: This doesn't reshuffle other tasks' positions when a task moves.
    // Need to handle sibling position updates for proper drag-and-drop support.
    [HttpPut("{id}")]
    public async Task<ActionResult> UpdateTaskAsync(Guid id, UpdateTaskDto dto)
    {
        var taskToUpdate = await _context.TaskItems.FindAsync(id);
        if (taskToUpdate is null) return NotFound();

        taskToUpdate.Title = dto.Title;
        taskToUpdate.Description = dto.Description;
        taskToUpdate.State = dto.State;
        taskToUpdate.Position = dto.Position;
        await _context.SaveChangesAsync();
        return NoContent();
    }
    
}