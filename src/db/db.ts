import { Item } from "./types.ts";

const items: Item[] = [
    { id: 1, name: "First item" },
    { id: 2, name: "Second item" },
];

export function getItemById(id: number): Promise<Item | null> {
    return Promise.resolve(items.find((item) => item.id === id) || null);
}
