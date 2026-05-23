import { createStartHandler, defaultStreamHandler } from "@tanstack/react-start/server"
import type { HandlerCallback } from "@tanstack/react-start/server"
import { handleRequest } from "./server/api"

const handler: HandlerCallback<any> = async (ctx) => {
  const url = new URL(ctx.request.url)

  if (url.pathname.startsWith("/api/")) {
    return handleRequest(ctx.request, ctx.request.method, url.pathname)
  }

  return defaultStreamHandler(ctx)
}

export default createStartHandler(handler)
