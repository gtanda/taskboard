import type {TaskItem} from "../types/taskItem.ts";
import TaskCard from "./TaskCard.tsx";

interface TaskColumnProps {
    columnTitle: string;
    tasks: TaskItem[]
    onTaskDelete: (taskId : string) => void;
    onTaskUpdate: (updatedTask : TaskItem) => void;
}

export default function TaskColumn({columnTitle, tasks, onTaskDelete, onTaskUpdate} : TaskColumnProps) {
    return <>
        <h2>{columnTitle}</h2>
        <ul>
            {tasks.map(task => <TaskCard key={task.id} task={task} onTaskDelete={onTaskDelete} onTaskUpdate={onTaskUpdate} />)}
        </ul>
    </>
}