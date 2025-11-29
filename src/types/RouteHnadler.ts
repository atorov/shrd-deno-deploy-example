import type RouteContext from "./RouteContext.ts";

export type RouteHandler = (ctx: RouteContext) => Response | Promise<Response>;
