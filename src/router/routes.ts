import { METHOD, type Method } from "@std/http/unstable-method";
import getGreetingHandler from "../handlers/api/[root]/get_greeting.handler.ts";
import getHealthHandler from "../handlers/api/health/get_helath.handler.ts";
import deleteItemHandler from "../handlers/api/items/delete_item_handler.ts";
import getAllItemsHandler from "../handlers/api/items/get_all_items_handler.ts";
import getSingleItemHandler from "../handlers/api/items/get_single_item.handler.ts";
import postItemHandler from "../handlers/api/items/post_item_handler.ts";
import putItemHandler from "../handlers/api/items/put_item_handler.ts";
import type { RouteHandler } from "../types/RouteHnadler.ts";
import type { Route } from "./types.ts";

const routes: Route[] = [];

// A small helper for registering routes
function registerRoute(method: Method, pattern: string, handler: RouteHandler) {
    routes.push({ method, pattern, handler });
}

// Greeting route
registerRoute(METHOD.Get, "/", getGreetingHandler);

// Health check
registerRoute(METHOD.Get, "/api/health", getHealthHandler);

// Items routes
// - Create item
registerRoute(METHOD.Post, "/api/items", postItemHandler);
// - Get all items
registerRoute(METHOD.Get, "/api/items", getAllItemsHandler);
// - Get item
registerRoute(METHOD.Get, "/api/items/:id", getSingleItemHandler);
// - Update item
registerRoute(METHOD.Put, "/api/items/:id", putItemHandler);
// - Delete item
registerRoute(METHOD.Delete, "/api/items/:id", deleteItemHandler);

export default routes;
