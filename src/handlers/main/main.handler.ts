import { STATUS_CODE } from "@std/http/status";
import routeRequest from "../../router/route_request.ts";
import json from "../../utils/routes/json.ts";

async function mainHandler(req: Request): Promise<Response> {
    try {
        return await routeRequest(req);
    } catch (error) {
        console.error("Unhandled error:", error);
        return json({ error: "Internal Server Error" }, {
            status: STATUS_CODE.InternalServerError,
        });
    }
}

export default mainHandler;
