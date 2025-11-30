import { deleteItem, getItemById } from "../../db/db.ts";
import type RouteContext from "../../types/RouteContext.ts";
import badRequest from "../../utils/routes/bad_request.ts";
import noContent from "../../utils/routes/no_content.ts";

async function deleteItemHandler(ctx: RouteContext): Promise<Response> {
    const id = Number(ctx.params.id);
    if (Number.isNaN(id)) return badRequest("Invalid 'id' - must be a number!");

    const itemToDelete = await getItemById(id);

    if (!itemToDelete) return noContent();

    await deleteItem(id);

    return noContent();
}

export default deleteItemHandler;
