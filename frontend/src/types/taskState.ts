export const  TaskState = {
    Todo: 0,
    InProgress: 1,
    Completed: 2
} as const;

export type TaskState = typeof TaskState[keyof typeof TaskState];

