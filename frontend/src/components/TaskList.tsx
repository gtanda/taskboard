import {useEffect, useState} from "react";
import {deleteTask, fetchTasksByProjectId, updateTask} from "../api/taskItem.ts";
import type {TaskItem, UpdateTaskDto} from "../types/taskItem.ts";
import {TaskState} from "../types/taskState.ts";
import TaskColumn from "./TaskColumn.tsx";
import CreateTaskForm from "./CreateTaskForm.tsx";
import {useParams} from "react-router-dom";



export default function TaskList()  {
    const [tasks, setTasks] = useState<TaskItem[]>([]);
    const [error, setError] = useState("");
    const {projectId} = useParams();
    
    if (!projectId) {
        return <p>No project selected.</p>
    }
    
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
    
    const handleTaskUpdate = async (updatedTask: TaskItem) => {
        try {
          const dto : UpdateTaskDto = {
              title: updatedTask.title,
              description: updatedTask.description,
              state: updatedTask.state,
              position: updatedTask.position
          }
          await updateTask(updatedTask.id, dto);
          setTasks((currentTasks) => currentTasks.map((t) => t.id === updatedTask.id ? updatedTask : t))
        } catch (error) {
            setError(error instanceof Error ? error.message : "An unknown error occurred.");
        }
        
    }
    
    return <>
        {error && <p>{error}</p>}
        <CreateTaskForm projectId={projectId} onTaskCreate={handleTaskCreated} />
            <TaskColumn columnTitle={"To Do"} onTaskDelete={handleTaskDelete} onTaskUpdate={handleTaskUpdate} tasks={todoTasks}  />
            <TaskColumn columnTitle={"In Progress"} onTaskDelete={handleTaskDelete} onTaskUpdate={handleTaskUpdate} tasks={inProgressTasks} />
            <TaskColumn columnTitle={"Completed"} onTaskDelete={handleTaskDelete} onTaskUpdate={handleTaskUpdate} tasks={completedTasks} />
    </>
}