import { TodoistApiWrapper } from "@/system/apis/todoist/wrapper"

export async function GET(request: Request) {
  // check that the token is defined
  if (process.env.TODOIST_API_TOKEN == undefined) {
    return new Response("Failed to find Todoist API token", {
      status: 500,
    })
  }
  const todoistApi = new TodoistApiWrapper(process.env.TODOIST_API_TOKEN)

  const tasks = await todoistApi.getTasks()

  return Response.json({
    tasks: tasks,
  })
}
