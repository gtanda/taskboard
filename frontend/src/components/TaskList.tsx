import {useEffect, useState} from "react";
import {fetchTasksByProjectId} from "../api/taskItem.ts";
import type {TaskItem} from "../types/taskItem.ts";

interface TaskListProps {
    projectId: string;
}

export default function TaskList({projectId} : TaskListProps)  {
    const [tasks, setTasks] = useState<TaskItem[]>([]);
    const [error, setError] = useState("");
    
    useEffect(() => {
        const fetchProjectTasks = async () => {
            try {
                const response = await fetchTasksByProjectId(projectId);
                setTasks(response);
            } catch (err) {
                setError(err instanceof Error ? err.message : "An unknown error occurred.");
            }
        }
        fetchProjectTasks();
        
    }, [projectId])
    
    return <>
        {error && <p>{error}</p>}
        <ul>
            {tasks.map((t) => <li key ={t.id}>{t.title}</li>)}    
        </ul>
    </>
}