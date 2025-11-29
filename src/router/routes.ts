import { METHOD, type Method } from "@std/http/unstable-method";
import getHealthHandler from "../handlers/health/get_helath.handler.ts";
import getAllItemsHandler from "../handlers/items/get_all_items_handler.ts";
import getSingleItemHandler from "../handlers/items/get_single_item.handler.ts";
import type { RouteHandler } from "../types/RouteHnadler.ts";
import type { Route } from "./types.ts";

const routes: Route[] = [];

// A small helper for registering routes
function registerRoute(method: Method, pattern: string, handler: RouteHandler) {
    routes.push({ method, pattern, handler });
}

// TODO: add root route
// ...

// Health check
registerRoute(METHOD.Get, "/api/health", getHealthHandler);

// Items routes
// - Get all items
registerRoute(METHOD.Get, "/api/items", getAllItemsHandler);
// - Get item
registerRoute(METHOD.Get, "/api/items/:id", getSingleItemHandler);

// { method: "POST", pattern: "/items", handler: createItemHandler },
// { method: "PUT", pattern: "/items/:id", handler: updateItemHandler },

export default routes;
