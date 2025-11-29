import { STATUS_CODE } from "@std/http/status";
import { addItem } from "../../db/db.ts";
import ItemSchema from "../../db/ItemSchema.ts";
import type RouteContext from "../../types/RouteContext.ts";
import badRequest from "../../utils/routes/bad_request.ts";
import json from "../../utils/routes/json.ts";

async function postItemHandler(ctx: RouteContext): Promise<Response> {
    let data: unknown;
    try {
        data = await ctx.req.json();
    } catch {
        return badRequest("Invalid JSON body!");
    }

    const validatedItem = ItemSchema.omit({ id: true }).safeParse(data);
    if (!validatedItem.success) return badRequest(validatedItem.error.message);

    const newItem = await addItem(validatedItem.data.name);

    return json(newItem, { status: STATUS_CODE.Created });
}

export default postItemHandler;
