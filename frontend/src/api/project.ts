import type {CreateProjectDto, Project, UpdateProjectDto} from "../types/project";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function createProject(project: CreateProjectDto) : Promise<Project> {
    const response = await fetch(`${API_BASE_URL}/projects`, {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(project),
    });
    
    if (!response.ok) {
        throw new Error(`Unable to create project, ${response.status}`);
    }
    
    return response.json();
}

export async function fetchProjects(): Promise<Project[]> {
    const response = await fetch(`${API_BASE_URL}/projects`);
    if (!response.ok) {
        throw new Error(`Failed to fetch projects: ${response.status}`);
    }
    
    return response.json();
}

export async function updateProject(projectId: string, project: UpdateProjectDto) : Promise<void> {
    const response = await fetch(`${API_BASE_URL}/projects/${projectId}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(project),
    });
    
    if (!response.ok) {
        throw new Error(`Unable to update project, ${response.status}`);
    }
}

export async function deleteProject(projectId: string) : Promise<void> {
    const response = await fetch(`${API_BASE_URL}/projects/${projectId}`, {
        method: 'DELETE',
    })
    
    if (!response.ok) {
        throw new Error(`Failed to delete project, ${response.status}`);
    }
}