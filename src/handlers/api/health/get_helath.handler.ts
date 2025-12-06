import type { RouteHandler } from "../../../types/RouteHnadler.ts";
import json from "../../../utils/routes/json.ts";

const getHealthHandler: RouteHandler = () => {
    console.log(`::: Handling health check request`);
    return Promise.resolve(json({ message: "Service is healthy" }));
};

export default getHealthHandler;
