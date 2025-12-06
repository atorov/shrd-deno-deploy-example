import { STATUS_CODE } from "@std/http/status";
import { addItem } from "../../../db/db.ts";
import ItemSchema from "../../../db/ItemSchema.ts";
import type RouteContext from "../../../types/RouteContext.ts";
import badRequest from "../../../utils/routes/bad_request.ts";
import json from "../../../utils/routes/json.ts";

async function postItemHandler(ctx: RouteContext): Promise<Response> {
    console.log(
        `::: Handling post item request: ${ctx.req.method} ${ctx.req.url}`,
    );

    let data: unknown;
    try {
        data = await ctx.req.json();
    } catch {
        console.log("::: Invalid JSON body");
        return badRequest("Invalid JSON body!");
    }

    const validatedItem = ItemSchema.omit({ id: true }).safeParse(data);
    console.log("::: Validated item data:", validatedItem.data);

    if (!validatedItem.success) {
        console.log("::: Validation failed:", validatedItem.error.message);
        return badRequest(validatedItem.error.message);
    }

    const newItem = await addItem(validatedItem.data.name);
    console.log(`::: Created new item:`, newItem);

    console.log("::: Sending JSON response with created item");
    return json(newItem, { status: STATUS_CODE.Created });
}

export default postItemHandler;
