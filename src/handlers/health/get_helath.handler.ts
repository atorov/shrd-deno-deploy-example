import type { RouteHandler } from "../../types/RouteHnadler.ts";
import json from "../../utils/routes/json.ts";

const getHealth: RouteHandler = () => json({ message: "Service is healthy" });

export default getHealth;
