import type {Project} from "../types/project.ts";
import {useState} from "react";



interface ProjectCardProps {
    project: Project;
    onProjectDelete: (projectId : string) => void;
    onProjectUpdate: (updatedProject : Project) => void;
}

export default function ProjectCard({project, onProjectUpdate, onProjectDelete}: ProjectCardProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(project.title);
    const [description, setDescription] = useState(project.description ?? "");
    
    
    const handleUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        
        const projectToUpdate : Project = {
            ...project,
            title: title,
            description: description,
        }
        
        onProjectUpdate(projectToUpdate);
        setIsEditing(false);
        
    }
    
    if (isEditing) {
        return (
            <div>
                <form onSubmit={handleUpdate}>
                    <input onChange={(e) => setTitle(e.target.value)} value={title}/>
                    <textarea onChange={(e) => setDescription(e.target.value)} value={description} />
                    <button type={"submit"}>Update</button>
                </form>
                <button onClick={() => setIsEditing(false)} >Cancel</button>
            </div>
        )
    }
    
    
    return (
        <div>
            <h2>{project.title}</h2>
            <h2>{project.id}</h2>
            <h4>{project.description}</h4>
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <button onClick={() => onProjectDelete(project.id)} >Delete</button>
        </div>
    )
}