import * as z from "zod";

const ItemSchema = z.object({
    id: z.number({ message: "ID must be a number" }).positive(
        "ID must be positive",
    ).int("ID must be an integer"),
    name: z.string({ message: "Name must be a string" })
        .min(2, "Name must be at least 2 characters long"),
});

export default ItemSchema;
