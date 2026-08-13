import type {TaskItem} from "../types/taskItem.ts";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function fetchTasksByProjectId(projectId: string): Promise<TaskItem[]> {
    const response = await fetch(`${API_BASE_URL}/projects/${projectId}/tasks`);
    if (!response.ok) {
        throw new Error(`Failed to fetch tasks: ${response.status}`);
    }
    return response.json();
}