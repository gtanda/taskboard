import type {CreateTaskDto, TaskItem} from "../types/taskItem.ts";
import {useState} from "react";
import {createTask} from "../api/taskItem.ts";

interface CreateTaskFormProps {
    projectId: string;
    onTaskCreate: (task: TaskItem) => void;
}

export default function CreateTaskForm({projectId, onTaskCreate} : CreateTaskFormProps) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        const taskItemDto : CreateTaskDto = {
            title: title,
            description: description
        }
        const taskItem = await createTask(projectId, taskItemDto);
        
        onTaskCreate(taskItem);

        setTitle('');
        setDescription('');
    };
    return <form onSubmit={handleSubmit}>
        <input value={title} onChange={(e) => setTitle(e.target.value)}/>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)}/>
        <button type={"submit"}>Add Task</button>
    </form>
}