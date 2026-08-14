import {useState, useEffect} from "react";
import {deleteProject, fetchProjects, updateProject} from "../api/project";
import type {Project, UpdateProjectDto} from "../types/project.ts";
import ProjectCard from "./ProjectCard.tsx";
import CreateProjectForm from "./CreateProjectForm.tsx";

export default function ProjectList() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [error, setError] = useState("");
    
    useEffect(() => {
        const fetchProject = async () => {
            try {
                const response = await fetchProjects();
                setProjects(response);
            } catch (err) {
                setError(err instanceof Error ? err.message : "An unknown error occurred.");
            }
        }
        
        fetchProject();
    }, [])
    
    const handleProjectCreate = (newProject: Project) => {
        setProjects((prevProjects) => [...prevProjects, newProject]);
    }
    
    const handleProjectUpdate = async (updatedProject: Project) => {
        try {
            const dto : UpdateProjectDto = {
                title: updatedProject.title,
                description: updatedProject.description,
            }
            
            await updateProject(updatedProject.id, dto);
            setProjects((currentProjects) => currentProjects.map((p) => p.id === updatedProject.id ? updatedProject : p));
        } catch (err) {
            setError(err instanceof Error ? err.message : "An unknown error occurred.");
        }
    }
    
    const handleProjectDelete = async (projectId : string) => {
        if (!window.confirm("Are you sure you want to delete this project and all associated tasks?")) return;
        try {
            await deleteProject(projectId);
            setProjects((currentProjects) => currentProjects.filter((p) => p.id !== projectId))
        } catch (error) {
            setError(error instanceof Error ? error.message : "An unknown error occurred.");
        }
    }
    
    return <>
        {error && <p>{error}</p>}
        <CreateProjectForm onProjectCreate={handleProjectCreate} />
        <ul>
            {projects.map((project : Project) => <ProjectCard key={project.id} project={project} onProjectUpdate={handleProjectUpdate}
            onProjectDelete={handleProjectDelete}
            />)}    
        </ul>
    </>
    
}