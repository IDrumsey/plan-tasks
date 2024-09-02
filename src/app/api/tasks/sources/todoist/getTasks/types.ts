import { Task as TodoistTask } from "@doist/todoist-api-typescript"
import { z } from "zod"

export interface ApiResponseBodyShape {
  tasks: Array<TodoistTask>
}
