import { createStartHandler, defaultStreamHandler } from "@tanstack/react-start/server"
import { getRouterManifest } from "@tanstack/react-start/router-manifest"
import { createRouter } from "../router"
import { handleRequest } from "./api"

export default createStartHandler({
  createRouter,
  getRouterManifest,
})(async (request, ...args) => {
  const url = new URL(request.url)

  if (url.pathname.startsWith("/api/")) {
    return handleRequest(request, request.method, url.pathname)
  }

  return defaultStreamHandler(request, ...args)
})
