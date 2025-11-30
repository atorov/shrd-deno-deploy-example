import { STATUS_CODE } from "@std/http/status";
import routeRequest from "./router/route_request.ts";
import json from "./utils/routes/json.ts";

// // ---- Routes ----

// // Root
// GET("/", (ctx) =>
//   json({
//     message: "Hello from Deno REST API",
//     docs: ["/health", "/items"],
//   })
// );

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
