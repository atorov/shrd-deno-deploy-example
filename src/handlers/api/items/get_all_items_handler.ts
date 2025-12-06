import { getAllItems } from "../../../db/db.ts";
import json from "../../../utils/routes/json.ts";

async function getAllItemsHandler(): Promise<Response> {
    console.log(`::: Handling get all items request`);

    const items = await getAllItems();

    console.log(`::: Fetched items:`, items);

    console.log("::: Sending JSON response with items");
    return json(items);
}

export default getAllItemsHandler;
