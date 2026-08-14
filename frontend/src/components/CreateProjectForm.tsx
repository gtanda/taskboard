import {useState} from "react";
import type {CreateProjectDto, Project} from "../types/project.ts";
import {createProject} from "../api/project.ts";

interface CreateProjectFormProps {
    onProjectCreate: (project: Project) => void;
}

export default function CreateProjectForm({onProjectCreate} : CreateProjectFormProps) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    
    
    const handleSubmit =  async (e: React.FormEvent) => {
        e.preventDefault();
        
        const projectDto : CreateProjectDto = {
            title: title,
            description: description,
        }
        
        const createdProject = await createProject(projectDto);
        
        onProjectCreate(createdProject);
        
        setTitle('');
        setDescription('');
    };
    
    
    return (
        <>
            <form onSubmit={handleSubmit}>
                <input onChange={(e) => setTitle(e.target.value)} value={title} />
                <textarea onChange={(e) => setDescription(e.target.value)} value={description}/>
                <button type={"submit"}>Create Project</button>
            </form>
        </>
    )
}