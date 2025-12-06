import { getItemById } from "../../../db/db.ts";
import type RouteContext from "../../../types/RouteContext.ts";
import badRequest from "../../../utils/routes/bad_request.ts";
import json from "../../../utils/routes/json.ts";
import notFound from "../../../utils/routes/not_found.ts";

async function getSingleItemHandler(ctx: RouteContext): Promise<Response> {
    console.log(
        `::: Handling get single item request: ${ctx.req.method} ${ctx.req.url}`,
    );

    const id = Number(ctx.params.id);
    console.log(`::: Parsed id: ${id}`);

    if (Number.isNaN(id)) {
        console.log("::: Invalid id parameter");
        return badRequest("Invalid 'id' - must be a number.");
    }

    const item = await getItemById(id);
    console.log(`::: Fetched item:`, item);

    if (!item) {
        console.log(`::: Item with id ${id} not found`);
        return notFound();
    }

    console.log("::: Sending JSON response with item");
    return json(item);
}

export default getSingleItemHandler;
