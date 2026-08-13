import {useState, useEffect} from "react";
import {fetchProjects} from "../api/project";
import type {Project} from "../types/project.ts";

export default function ProjectList() {
    const [projects, setProject] = useState<Project[]>([]);
    const [error, setError] = useState("");
    
    useEffect(() => {
        const fetchProject = async () => {
            try {
                const response = await fetchProjects();
                setProject(response);
            } catch (err) {
                setError(err instanceof Error ? err.message : "An unknown error occurred.");
            }
        }
        
        fetchProject();
    }, [])

    
    return <>
        {error && <p>{error}</p>}
        <ul>
            {projects.map((project) => <li key = {project.id}>{project.title}</li>)}
        </ul>
    </>
    
}