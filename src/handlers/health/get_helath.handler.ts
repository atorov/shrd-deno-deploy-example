import type { RouteHandler } from "../../types/RouteHnadler.ts";
import json from "../../utils/routes/json.ts";

const getHealthHandler: RouteHandler = () =>
    json({ message: "Service is healthy" });

export default getHealthHandler;
