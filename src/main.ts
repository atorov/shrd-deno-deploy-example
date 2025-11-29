import { STATUS_CODE } from "@std/http/status";
import routeRequest from "./router/route_request.ts";
import json from "./utils/routes/json.ts";

// // -------------------- Helper functions --------------------

// // Basic validation for item payload
// function validateItemPayload(body: unknown):
//   | { ok: true; value: { name: string } }
//   | { ok: false; errors: string[] } {
//   const errors: string[] = [];

//   if (typeof body !== "object" || body === null) {
//     errors.push("Body must be a JSON object.");
//   } else {
//     const maybeName = (body as Record<string, unknown>).name;
//     if (typeof maybeName !== "string") {
//       errors.push("Field 'name' is required and must be a string.");
//     } else if (maybeName.trim().length < 2) {
//       errors.push("Field 'name' must be at least 2 characters long.");
//     }
//   }

//   if (errors.length > 0) {
//     return { ok: false, errors };
//   }

//   return {
//     ok: true,
//     value: { name: (body as any).name as string },
//   };
// }

// // ---- Routes ----

// // Root
// GET("/", (ctx) =>
//   json({
//     message: "Hello from Deno REST API",
//     docs: ["/health", "/items"],
//   })
// );

// // List items
// GET("/items", () => json(items));

// // Create item
// POST("/items", async (ctx) => {
//   let body: unknown;
//   try {
//     body = await ctx.req.json();
//   } catch {
//     return badRequest("Invalid JSON body.");
//   }

//   const validation = validateItemPayload(body);
//   if (!validation.ok) {
//     return badRequest(validation.errors.join(" "));
//   }

//   const id = items.length ? items[items.length - 1].id + 1 : 1;
//   const item: Item = { id, name: validation.value.name.trim() };
//   items.push(item);

//   return json(item, { status: 201 });
// });

// // Update item
// PUT("/items/:id", async (ctx) => {
//   const id = Number(ctx.params.id);
//   if (Number.isNaN(id)) {
//     return badRequest("Invalid 'id' - must be a number.");
//   }

//   const existing = items.find((x) => x.id === id);
//   if (!existing) {
//     return notFound();
//   }

//   let body: unknown;
//   try {
//     body = await ctx.req.json();
//   } catch {
//     return badRequest("Invalid JSON body.");
//   }

//   const validation = validateItemPayload(body);
//   if (!validation.ok) {
//     return badRequest(validation.errors.join(" "));
//   }

//   existing.name = validation.value.name.trim();

//   return json(existing);
// });

// // Delete item
// DELETE("/items/:id", (ctx) => {
//   const id = Number(ctx.params.id);
//   if (Number.isNaN(id)) {
//     return badRequest("Invalid 'id' - must be a number.");
//   }

//   const index = items.findIndex((x) => x.id === id);
//   if (index === -1) {
//     return notFound();
//   }

//   const [removed] = items.splice(index, 1);
//   return json({ deleted: removed.id });
// });

// TODO: move it to handlers folder
// Main handler with error handling
async function mainHandler(req: Request): Promise<Response> {
    try {
        return await routeRequest(req);
    } catch (error) {
        console.error("!!! Unhandled error:", error);
        return json({ error: "Internal Server Error" }, {
            status: STATUS_CODE.InternalServerError,
        });
    }
}

// -------------------- Start (local / Docker / Deno Deploy) --------------------

if (import.meta.main) {
    // If PORT exists (local / Docker), we use it.
    // If not – Deno Deploy (and Deno by default) manage the port.
    const portFromEnv = typeof Deno !== "undefined" && "env" in Deno
        ? Deno.env.get("PORT")
        : undefined;

    if (portFromEnv) {
        const port = Number(portFromEnv) || 8000;
        console.log(`::: Listening on http://localhost:${port}`);

        Deno.serve({ port }, mainHandler);
    } else {
        console.log(
            "::: Listening with default Deno.serve() (Deno Deploy / local default)",
        );
        Deno.serve(mainHandler);
    }
}
