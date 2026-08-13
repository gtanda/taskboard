import type {TaskItem} from "../types/taskItem.ts";

interface TaskColumnProps {
    columnTitle: string;
    tasks: TaskItem[]
}

export default function TaskColumn({columnTitle, tasks} : TaskColumnProps) {
    return <>
        <h2>{columnTitle}</h2>
        <ul>
            {tasks.map(task => <li key={task.id}><strong>{task.title}</strong> -- {task.description}</li>)}
        </ul>
    </>
}