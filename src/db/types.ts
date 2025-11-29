import z from "zod";
import ItemSchema from "./ItemSchema.ts";

export type Item = z.infer<typeof ItemSchema>;
