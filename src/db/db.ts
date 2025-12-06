import { Item } from "./types.ts";

const items: Item[] = [
    { id: 1, name: "First item" },
    { id: 2, name: "Second item" },
];

export function addItem(name: string): Promise<Item> {
    console.log(`::: Adding item with name: ${name}`);

    const newItem: Item = {
        id: items.length > 0 ? items[items.length - 1]!.id + 1 : 1,
        name,
    };

    items.push(newItem);

    console.log(`::: Created new item:`, newItem);
    return Promise.resolve(newItem);
}

export function deleteItem(id: number): Promise<null> {
    console.log(`::: Deleting item with id: ${id}`);

    const index = items.findIndex((item) => item.id === id);

    if (index === -1) {
        console.log(`::: Item with id ${id} not found for deletion`);
        return Promise.resolve(null);
    }

    items.splice(index, 1);

    console.log(`::: Item with id ${id} deleted`);
    return Promise.resolve(null);
}

export function getItemById(id: number): Promise<Item | null> {
    console.log(`::: Getting item with id: ${id}`);

    const result = Promise.resolve(
        items.find((item) => item.id === id) || null,
    );

    console.log(`::: Found item:`, result);
    return result;
}

export function getAllItems(): Promise<Item[]> {
    console.log(`::: Getting all items`);

    const result = Promise.resolve(items);

    console.log(`::: Found items:`, result);
    return result;
}

export function updateItem(id: number, name: string): Promise<Item | null> {
    console.log(`::: Updating item with id: ${id} to have name: ${name}`);

    const item = items.find((item) => item.id === id);
    console.log(`::: Found item for update:`, item);

    if (!item) {
        console.log(`::: Item with id ${id} not found for update`);
        return Promise.resolve(null);
    }

    item.name = name;

    console.log(`::: Updated item:`, item);
    return Promise.resolve(item);
}
