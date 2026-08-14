export interface Project {
    id: string;
    title: string;
    description: string | null;
}

export interface CreateProjectDto {
    title: string;
    description: string | null;
}

export interface UpdateProjectDto {
    title: string;
    description: string | null;
}