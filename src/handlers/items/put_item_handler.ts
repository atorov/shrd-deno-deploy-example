import { getItemById, updateItem } from "../../db/db.ts";
import ItemSchema from "../../db/ItemSchema.ts";
import type RouteContext from "../../types/RouteContext.ts";
import badRequest from "../../utils/routes/bad_request.ts";
import json from "../../utils/routes/json.ts";
import notFound from "../../utils/routes/not_found.ts";

async function putItemHandler(ctx: RouteContext): Promise<Response> {
    const id = Number(ctx.params.id);

    if (Number.isNaN(id)) return badRequest("Invalid 'id' - must be a number!");

    const existingItem = await getItemById(id);

    if (!existingItem) return notFound();

    let data: unknown;
    try {
        data = await ctx.req.json();
    } catch {
        return badRequest("Invalid JSON body!");
    }

    const validatedItem = ItemSchema.omit({ id: true }).safeParse(data);

    if (!validatedItem.success) return badRequest(validatedItem.error.message);

    const updatedItem = await updateItem(id, validatedItem.data.name);

    if (!updatedItem) return notFound();

    return json(updatedItem);
}

export default putItemHandler;
