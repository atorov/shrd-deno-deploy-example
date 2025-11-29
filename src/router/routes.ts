import getHealth from "../handlers/health/get_helath.handler.ts";
import type { RouteHandler } from "../types/RouteHnadler.ts";
import type { Route } from "./types.ts";

const routes: Route[] = [];

// Small helpers for registration of routes
function GET(pattern: string, handler: RouteHandler) {
    routes.push({ method: "GET", pattern, handler });
}

// function POST(pattern: string, handler: RouteHandler) {
//   routes.push({ method: "POST", pattern, handler });
// }

// function PUT(pattern: string, handler: RouteHandler) {
//   routes.push({ method: "PUT", pattern, handler });
// }

// function DELETE(pattern: string, handler: RouteHandler) {
//   routes.push({ method: "DELETE", pattern, handler });
// }

// TODO: add root route
// ...

// Health check
GET("/api/health", getHealth);

// { method: "GET", pattern: "/items/:id", handler: getItemHandler },
// { method: "POST", pattern: "/items", handler: createItemHandler },
// { method: "PUT", pattern: "/items/:id", handler: updateItemHandler },

export default routes;
