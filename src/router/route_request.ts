import type RouteContext from "../types/RouteContext.ts";
import matchPath from "./match_path.ts";
import notFound from "./not_found.ts";
import ROUTES from "./routes.ts";

async function routeRequest(req: Request): Promise<Response> {
    const url = new URL(req.url);

    for (const route of ROUTES) {
        if (route.method !== req.method) continue;

        const params = matchPath(route.pattern, url.pathname);
        if (!params) continue;

        const ctx: RouteContext = { req, url, params };
        return await route.handler(ctx);
    }

    return notFound();
}

export default routeRequest;
