import { getItemById } from "../../../db/db.ts";
import type RouteContext from "../../../types/RouteContext.ts";
import badRequest from "../../../utils/routes/bad_request.ts";
import json from "../../../utils/routes/json.ts";
import notFound from "../../../utils/routes/not_found.ts";

async function getSingleItemHandler(ctx: RouteContext): Promise<Response> {
    const id = Number(ctx.params.id);

    if (Number.isNaN(id)) return badRequest("Invalid 'id' - must be a number.");

    const item = await getItemById(id);

    if (!item) return notFound();

    return json(item);
}

export default getSingleItemHandler;
