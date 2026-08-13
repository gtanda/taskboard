import type {Project} from "../types/project";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function fetchProjects(): Promise<Project[]> {
    const response = await fetch(`${API_BASE_URL}/projects`);
    if (!response.ok) {
        throw new Error(`Failed to fetch projects: ${response.status}`);
    }
    
    return response.json();
}