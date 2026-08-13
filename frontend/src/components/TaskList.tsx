import {useEffect, useState} from "react";
import {deleteTask, fetchTasksByProjectId} from "../api/taskItem.ts";
import type {TaskItem} from "../types/taskItem.ts";
import {TaskState} from "../types/taskState.ts";
import TaskColumn from "./TaskColumn.tsx";
import CreateTaskForm from "./CreateTaskForm.tsx";

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
            } catch (error) {
                setError(error instanceof Error ? error.message : "An unknown error occurred.");
            }
        }
        fetchProjectTasks();
        
    }, [projectId])
    
    const handleTaskCreated = (newTask : TaskItem) => {
        setTasks((prevTasks) => [...prevTasks, newTask]);
    }
    
    const handleTaskDelete = async (taskId : string) => {
        try {
            await deleteTask(taskId);
            setTasks((currentTasks) => currentTasks.filter(t => t.id !== taskId));
        } catch (error) {
            setError(error instanceof Error ? error.message : "An unknown error occurred.");
        }
    }
    
    return <>
        {error && <p>{error}</p>}
        <CreateTaskForm projectId={projectId} onTaskCreate={handleTaskCreated} />
            <TaskColumn columnTitle={"To Do"} onTaskDelete={handleTaskDelete} tasks={todoTasks} />
            <TaskColumn columnTitle={"In Progress"} onTaskDelete={handleTaskDelete} tasks={inProgressTasks} />
            <TaskColumn columnTitle={"Completed"} onTaskDelete={handleTaskDelete} tasks={completedTasks} />
    </>
}