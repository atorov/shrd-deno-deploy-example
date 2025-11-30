import { Item } from "./types.ts";

const items: Item[] = [
    { id: 1, name: "First item" },
    { id: 2, name: "Second item" },
];

export function addItem(name: string): Promise<Item> {
    const newItem: Item = {
        id: items.length > 0 ? items[items.length - 1]!.id + 1 : 1,
        name,
    };
    items.push(newItem);

    return Promise.resolve(newItem);
}

export function deleteItem(id: number): Promise<null> {
    const index = items.findIndex((item) => item.id === id);

    if (index === -1) return Promise.resolve(null);

    items.splice(index, 1);

    return Promise.resolve(null);
}

export function getItemById(id: number): Promise<Item | null> {
    return Promise.resolve(items.find((item) => item.id === id) || null);
}

export function getAllItems(): Promise<Item[]> {
    return Promise.resolve(items);
}

export function updateItem(id: number, name: string): Promise<Item | null> {
    const item = items.find((item) => item.id === id);

    if (!item) return Promise.resolve(null);

    item.name = name;

    return Promise.resolve(item);
}
