/**
 * This files is the wrapper class that wraps the actual todoist js sdk
 */

import { TodoistApi, Task } from "@doist/todoist-api-typescript"

export class TodoistApiWrapper {
  private todoistApi: TodoistApi

  constructor(apiToken: string) {
    this.todoistApi = new TodoistApi(apiToken)
  }

  /**
   * Gets all the active tasks from todoist
   */
  public async getTasks(): Promise<Array<Task>> {
    return this.todoistApi.getTasks()
  }
}
