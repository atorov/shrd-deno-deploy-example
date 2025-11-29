import type { RouteHandler } from "../types/RouteHnadler.ts";

export type Route = {
    method: string;
    pattern: string; // e.g. "/items/:id"
    handler: RouteHandler;
};
