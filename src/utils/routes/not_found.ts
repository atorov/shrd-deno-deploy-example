import { STATUS_CODE } from "@std/http/status";
import json from "./json.ts";

function notFound(): Promise<Response> {
    return Promise.resolve(
        json({ error: "Not found" }, { status: STATUS_CODE.NotFound }),
    );
}

export default notFound;
