import { deleteItem, getItemById } from "../../../db/db.ts";
import type RouteContext from "../../../types/RouteContext.ts";
import badRequest from "../../../utils/routes/bad_request.ts";
import noContent from "../../../utils/routes/no_content.ts";

async function deleteItemHandler(ctx: RouteContext): Promise<Response> {
    console.log(
        `::: Handling delete item request: ${ctx.req.method} ${ctx.req.url}`,
    );

    const id = Number(ctx.params.id);
    console.log(`::: Parsed id: ${id}`);

    if (Number.isNaN(id)) {
        console.log("::: Invalid id parameter");
        return badRequest("Invalid 'id' - must be a number!");
    }

    const itemToDelete = await getItemById(id);
    console.log(`::: Fetched item to delete:`, itemToDelete);

    if (!itemToDelete) {
        console.log(`::: Item with id ${id} not found`);
        return noContent();
    }

    await deleteItem(id);

    console.log(`::: Deleted item with id ${id}`);
    return noContent();
}

export default deleteItemHandler;
