import { requestHandler } from "@tanstack/react-start/server"
import { handleRequest } from "../api"

export const handler = requestHandler(async (event) => {
  const url = new URL(event.request.url)
  const pathname = url.pathname
  const method = event.request.method
  return handleRequest(event.request, method, pathname)
})
