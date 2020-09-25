export class Task {
    public readonly id: number;
    public readonly date: Date;
    public readonly description: string;
    public readonly isDone: boolean;

    constructor(id: number, date: Date, description: string, isDone: boolean) {
        this.id = id;
        this.date = date;
        this.description = description;
        this.isDone = isDone;
    }
}
