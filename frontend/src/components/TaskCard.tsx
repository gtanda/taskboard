import type {TaskItem} from "../types/taskItem.ts";

interface TaskCardProps {
    task: TaskItem;
    onTaskDelete: (taskId : string) => void;
}

export default function TaskCard({task, onTaskDelete} : TaskCardProps) {
    const handleDelete = async () => {
        onTaskDelete(task.id);
    };
    
    return <>
        <li>{task.title} {task.description} <button onClick={handleDelete}>Delete</button></li>
    </>
}