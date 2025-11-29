import { STATUS_CODE } from "@std/http/status";
import json from "./json.ts";

function badRequest(message: string): Promise<Response> {
    return Promise.resolve(
        json({ error: message }, { status: STATUS_CODE.BadRequest }),
    );
}

export default badRequest;
