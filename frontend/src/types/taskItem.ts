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

export interface UpdateTaskDto {
    title: string;
    description: string | null;
    state: TaskState;
    position: number;
}

export interface TaskReorderDto {
    taskId: string;
    newPosition: number;
    newState: TaskState;
}