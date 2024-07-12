export const taskDescription = (data: any) => {
    if (!data) {
        return "Task description  is required";
    }

    if (!(data instanceof String || typeof data === "string")) {
        return "Invalid task description"
    }

    return null;
}