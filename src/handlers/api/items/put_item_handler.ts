import { getItemById, updateItem } from "../../../db/db.ts";
import ItemSchema from "../../../db/ItemSchema.ts";
import type RouteContext from "../../../types/RouteContext.ts";
import badRequest from "../../../utils/routes/bad_request.ts";
import json from "../../../utils/routes/json.ts";
import notFound from "../../../utils/routes/not_found.ts";

async function putItemHandler(ctx: RouteContext): Promise<Response> {
    console.log(
        `::: Handling put item request: ${ctx.req.method} ${ctx.req.url}`,
    );

    const id = Number(ctx.params.id);
    console.log(`::: Parsed id: ${id}`);

    if (Number.isNaN(id)) {
        console.log("::: Invalid id parameter");
        return badRequest("Invalid 'id' - must be a number!");
    }

    const existingItem = await getItemById(id);
    console.log(`::: Fetched existing item:`, existingItem);

    if (!existingItem) {
        console.log(`::: Item with id ${id} not found`);
        return notFound();
    }

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

    const updatedItem = await updateItem(id, validatedItem.data.name);
    console.log(`::: Updated item:`, updatedItem);

    if (!updatedItem) {
        console.log(`::: Item with id ${id} not found after update`);
        return notFound();
    }

    console.log("::: Sending JSON response with updated item");
    return json(updatedItem);
}

export default putItemHandler;
