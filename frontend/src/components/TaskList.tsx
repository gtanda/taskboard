import {useEffect, useState} from "react";
import {fetchTasksByProjectId} from "../api/taskItem.ts";
import type {TaskItem} from "../types/taskItem.ts";
import {TaskState} from "../types/taskState.ts";
import TaskColumn from "./TaskColumn.tsx";

interface TaskListProps {
    projectId: string;
}

export default function TaskList({projectId} : TaskListProps)  {
    const [tasks, setTasks] = useState<TaskItem[]>([]);
    const [error, setError] = useState("");
    const todoTasks = tasks.filter((t) => t.state === TaskState.Todo);
    const inProgressTasks = tasks.filter((t) => t.state === TaskState.InProgress);
    const completedTasks = tasks.filter((t) => t.state === TaskState.Completed);
    
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
            <TaskColumn columnTitle={"To Do"} tasks={todoTasks} />
            <TaskColumn columnTitle={"In Progress"} tasks={inProgressTasks} />
            <TaskColumn columnTitle={"Completed"} tasks={completedTasks} />
    </>
}