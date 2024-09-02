"use client"

import Image from "next/image"
import styles from "./page.module.css"
import { Fragment, useEffect, useState } from "react"
import { Task, TodoistAdapter } from "@/system/tasks"
import { Loading } from "@/assets/types/utility"
import axios from "axios"
import { ApiResponseBodyShape as GetTodoistTasksApiResponseBodyShape } from "./api/tasks/sources/todoist/getTasks/types"
import { TodoistApiWrapper } from "@/system/apis/todoist/wrapper"

export default function Home() {
  const [tasks, setTasks] = useState<Loading<Array<Task>>>("loading")

  // on load -> load tasks
  useEffect(() => {
    const dataLoader = async () => {
      // TODO: add authentication
      const tasksResult = await axios.get<GetTodoistTasksApiResponseBodyShape>(
        "/api/tasks/sources/todoist/getTasks"
      )

      if (tasksResult.status == 200) {
        setTasks(
          tasksResult.data.tasks.map(
            (todoistTask) => new TodoistAdapter(todoistTask)
          )
        )
      }
    }

    dataLoader()
  }, [])

  return (
    <>
      {tasks == "loading" ? (
        <p>Loading...</p>
      ) : (
        <>
          {tasks.map((task, index) => {
            return (
              <Fragment key={index}>
                <h1>{task.title}</h1>
                <p>{task.notes}</p>
                <p>{task.completed ? "Completed" : "Not completed"}</p>
                <p>
                  Due Date:{" "}
                  {task.dueDate
                    ? "Due on " + task.dueDate.toString()
                    : "No due date"}
                </p>
                <p>Priority: {task.priority}</p>
              </Fragment>
            )
          })}
        </>
      )}
    </>
  )
}
