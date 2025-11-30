import { METHOD, type Method } from "@std/http/unstable-method";
import getHealthHandler from "../handlers/health/get_helath.handler.ts";
import deleteItemHandler from "../handlers/items/delete_item_handler.ts";
import getAllItemsHandler from "../handlers/items/get_all_items_handler.ts";
import getSingleItemHandler from "../handlers/items/get_single_item.handler.ts";
import postItemHandler from "../handlers/items/post_item_handler.ts";
import putItemHandler from "../handlers/items/put_item_handler.ts";
import type { RouteHandler } from "../types/RouteHnadler.ts";
import type { Route } from "./types.ts";

const routes: Route[] = [];

// TODO: move to a separate file
// A small helper for registering routes
function registerRoute(method: Method, pattern: string, handler: RouteHandler) {
    routes.push({ method, pattern, handler });
}

// TODO: add root route
// ...

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
