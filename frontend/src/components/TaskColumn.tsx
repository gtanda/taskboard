import type {TaskItem} from "../types/taskItem.ts";
import TaskCard from "./TaskCard.tsx";
import {useDroppable} from "@dnd-kit/core";
import type {TaskState} from "../types/taskState.ts";

interface TaskColumnProps {
    columnTitle: string;
    state: TaskState;
    tasks: TaskItem[]
    onTaskDelete: (taskId : string) => void;
    onTaskUpdate: (updatedTask : TaskItem) => void;
}

export default function TaskColumn({columnTitle, state, tasks, onTaskDelete, onTaskUpdate} : TaskColumnProps) {
    const {setNodeRef, isOver} = useDroppable({id: state});
    
    return <div ref={setNodeRef} style={{backgroundColor: isOver ? "lightblue" : undefined}}>
        <h2>{columnTitle}</h2>
        <ul>
            {tasks.map(task => <TaskCard key={task.id} task={task} onTaskDelete={onTaskDelete} onTaskUpdate={onTaskUpdate} />)}
        </ul>
    </div>
}