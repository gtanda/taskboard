import {useEffect, useState} from "react";
import {deleteTask, fetchTasksByProjectId, reorderTasks, updateTask} from "../api/taskItem.ts";
import type {TaskItem, TaskReorderDto, UpdateTaskDto} from "../types/taskItem.ts";
import {TaskState} from "../types/taskState.ts";
import TaskColumn from "./TaskColumn.tsx";
import CreateTaskForm from "./CreateTaskForm.tsx";
import {Link, Navigate, useParams} from "react-router-dom";
import {DndContext} from "@dnd-kit/core";
import type {DragEndEvent} from "@dnd-kit/core";

export default function TaskList()  {
    const [tasks, setTasks] = useState<TaskItem[]>([]);
    const [error, setError] = useState("");
    const {projectId} = useParams();
    
    
    if (!projectId) {
        return <Navigate to={"/not-found"}/>;
    }
    
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

    const todoTasks = tasks.filter((t) => t.state === TaskState.Todo);
    const inProgressTasks = tasks.filter((t) => t.state === TaskState.InProgress);
    const completedTasks = tasks.filter((t) => t.state === TaskState.Completed);
    
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
    
    
    const handleDragEnd = async (e: DragEndEvent) => {
        const {active, over} = e;
        if (!over) return;
        
        const draggedTask = tasks.find((t) => t.id === active.id);
        if (!draggedTask) return;
    
        const newState = over.id as TaskState;
        if (draggedTask.state == newState) return;
        
        const tasksInNewColumn = tasks.filter((t) => t.state === newState);
        const newPosition = tasksInNewColumn.length;
        
        const taskReorderList : TaskReorderDto[] = [{
            taskId: draggedTask.id,
            newPosition: newPosition,
            newState: newState,
        }]
        
        try {
            await reorderTasks(taskReorderList);
            setTasks((currentTasks) => currentTasks.map((t) => t.id === draggedTask.id ? {...draggedTask, state: newState, position: newPosition} : t) );
        } catch (error) {
            setError(error instanceof Error ? error.message : "An unknown error occurred.");
        }
    }
    
    return <>
        {error && <p>{error}</p>}
        <Link to={"/"}>Go Back</Link>
        <CreateTaskForm projectId={projectId} onTaskCreate={handleTaskCreated} />
        <DndContext onDragEnd={handleDragEnd}>
            <TaskColumn columnTitle={"To Do"} onTaskDelete={handleTaskDelete} onTaskUpdate={handleTaskUpdate} tasks={todoTasks} state={TaskState.Todo} />
            <TaskColumn columnTitle={"In Progress"} onTaskDelete={handleTaskDelete} onTaskUpdate={handleTaskUpdate} tasks={inProgressTasks} state={TaskState.InProgress}/>
            <TaskColumn columnTitle={"Completed"} onTaskDelete={handleTaskDelete} onTaskUpdate={handleTaskUpdate} tasks={completedTasks} state={TaskState.Completed}/>
        </DndContext>
    </>
}