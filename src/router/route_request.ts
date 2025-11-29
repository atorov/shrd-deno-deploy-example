import type RouteContext from "../types/RouteContext.ts";
import notFound from "../utils/routes/not_found.ts";
import matchPath from "./match_path.ts";
import ROUTES from "./routes.ts";

function routeRequest(req: Request): Promise<Response> {
    const url = new URL(req.url);

    for (const route of ROUTES) {
        if (route.method !== req.method) continue;

        const params = matchPath(route.pattern, url.pathname);
        if (!params) continue;

        const ctx: RouteContext = { req, url, params };

        return Promise.resolve(route.handler(ctx));
    }

    return Promise.resolve(notFound());
}

export default routeRequest;
