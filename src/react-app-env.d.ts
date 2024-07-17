/// <reference types="react-scripts" />

export type Validator<T extends object> = {
	[Prop in keyof T]?: (arg: T[Prop], form?: any) => string | null;
};

export type FormError<T extends object> = {
	[Prop in keyof T]: string | null;
};

export interface Todo {
    id: number;
    _id:string;
    title: string;
    description:string
    date: string;
    createdAt:string
    start: string;
    status:'Completed'|'Pending'|'Overdue'
    end: string;
    complete: boolean;
}

export type FormInput = Omit<Todo, "id", "complete">;
// export type FormInput = Omit<Todo, "id", "complete">;