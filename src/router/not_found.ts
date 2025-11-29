import { STATUS_CODE } from "@std/http/status";
import json from "../utils/routes/json.ts";

function notFound(): Response {
    return json({ error: "Not found" }, { status: STATUS_CODE.NotFound });
}

export default notFound;
