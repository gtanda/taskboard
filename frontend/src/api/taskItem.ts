import type {CreateTaskDto, TaskItem} from "../types/taskItem.ts";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function fetchTasksByProjectId(projectId: string): Promise<TaskItem[]> {
    const response = await fetch(`${API_BASE_URL}/projects/${projectId}/tasks`);
    if (!response.ok) {
        throw new Error(`Failed to fetch tasks: ${response.status}`);
    }
    return response.json();
}

export async function createTask(projectId: string, dto: CreateTaskDto) : Promise<TaskItem> {
    const response = await fetch(`${API_BASE_URL}/projects/${projectId}/tasks`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(dto),
    });
    
    if (!response.ok) {
        throw new Error(`Failed to create task: ${response.status}`);
    }
    
    return response.json();
}

export async function deleteTask(taskId: string) : Promise<void> {
    const response = await fetch(`${API_BASE_URL}/tasks/${taskId}`, {
        method: 'DELETE',
    });
    
    if (!response.ok) {
        throw new Error(`Failed to delete task: ${response.status}`);
    }
}