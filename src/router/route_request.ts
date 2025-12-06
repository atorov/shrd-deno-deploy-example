import type RouteContext from "../types/RouteContext.ts";
import notFound from "../utils/routes/not_found.ts";
import matchPath from "./match_path.ts";
import ROUTES from "./routes.ts";

function routeRequest(req: Request): Promise<Response> {
    console.log(`::: Routing request: ${req.method} ${req.url}`);

    const url = new URL(req.url);

    for (const route of ROUTES) {
        if (route.method !== req.method) continue;

        const params = matchPath(route.pattern, url.pathname);
        if (!params) {
            console.log(`::: No match for pattern: ${route.pattern}`);
            continue;
        }

        console.log(
            `::: Matched pattern: ${route.pattern} with params:`,
            params,
        );

        const ctx: RouteContext = { req, url, params };
        return Promise.resolve(route.handler(ctx));
    }

    console.log(
        `::: No matching route found for ${req.method} ${url.pathname}`,
    );
    return Promise.resolve(notFound());
}

export default routeRequest;
