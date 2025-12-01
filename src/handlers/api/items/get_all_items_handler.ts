import { getAllItems } from "../../../db/db.ts";
import json from "../../../utils/routes/json.ts";

async function getAllItemsHandler(): Promise<Response> {
    const items = await getAllItems();

    return json(items);
}

export default getAllItemsHandler;
