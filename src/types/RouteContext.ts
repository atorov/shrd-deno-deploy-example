type RouteContext = {
    req: Request;
    url: URL;
    params: Record<string, string>;
};

export default RouteContext;
