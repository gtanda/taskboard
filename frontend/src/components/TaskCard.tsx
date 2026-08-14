import type {TaskItem} from "../types/taskItem.ts";
import {useState} from "react";

interface TaskCardProps {
    task: TaskItem;
    onTaskDelete: (taskId : string) => void;
    onTaskUpdate: (updateTask: TaskItem) => void;
}

export default function TaskCard({task, onTaskDelete, onTaskUpdate} : TaskCardProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description ?? '');
    
    
    const handleUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        
        const updatedTask : TaskItem = {
            ...task,
            title: title,
            description: description
        }
        
        onTaskUpdate(updatedTask)
        setIsEditing(false);
    }
    
    if (isEditing) {
        return (
            <>
                <form onSubmit={handleUpdate}>
                    <input value={title} onChange={(e) => setTitle(e.target.value)}/>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)}/>
                    <button type={"submit"}>Update</button>
                </form>
                <div>
                    <button onClick={() =>  setIsEditing(false)}>Cancel</button>
                </div>
            </>

        )
    }
    
    return <div>
        <p>{task.title}</p>
        <p>{task.description}</p>
        <button onClick={() => setIsEditing(true)}>Edit</button>
        <button onClick={() => onTaskDelete(task.id)}>Delete</button>
    </div>
}