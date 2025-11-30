import { STATUS_CODE } from "@std/http/status";

function noContent(): Response {
    return new Response(null, {
        headers: { "Content-Type": "application/noContent; charset=utf-8" },
        status: STATUS_CODE.NoContent,
    });
}

export default noContent;
