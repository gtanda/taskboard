import {TaskState} from "./taskState.ts";

export interface TaskItem {
    id: string;
    title: string;
    description: string | null;
    state: TaskState;
    created: string;
    position: number;
    projectId: string
}

export interface CreateTaskDto {
    title: string;
    description: string | null;
}