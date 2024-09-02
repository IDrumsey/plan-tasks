import { Nullable } from "@/assets/types/utility"
import { Task as TodoistTask } from "@doist/todoist-api-typescript"

export interface Task {
  title: string
  notes: string
  dueDate: Nullable<Date>
  completed: boolean
  dateCompleted: Nullable<Date>
  priority: Nullable<number>
  createdDate: Date
}

export class TodoistAdapter implements Task {
  private todoistTask: TodoistTask

  constructor(todoistTask: TodoistTask) {
    this.todoistTask = todoistTask
  }

  get title() {
    return this.todoistTask.content
  }

  get notes() {
    return this.todoistTask.description
  }

  get dueDate() {
    let todoistMostSpecificDueDate: Nullable<string> = null

    if (this.todoistTask.due) {
      if (this.todoistTask.due.datetime) {
        todoistMostSpecificDueDate = this.todoistTask.due.datetime
      }
      todoistMostSpecificDueDate = this.todoistTask.due.date
    }
    return todoistMostSpecificDueDate
      ? new Date(todoistMostSpecificDueDate)
      : null
  }

  get completed() {
    return this.todoistTask.isCompleted
  }

  get dateCompleted() {
    // todoist doesn't have this in their sdk yet i guess
    return null
  }

  get priority() {
    return this.todoistTask.priority
  }

  get createdDate() {
    return new Date(this.todoistTask.createdAt)
  }
}
