// // -------------------- Types and in-memory "database" --------------------

// type JsonValue =
//   | string
//   | number
//   | boolean
//   | null
//   | JsonValue[]
//   | { [key: string]: JsonValue };

// interface Item {
//   id: number;
//   name: string;
// }

// let items: Item[] = [
//   { id: 1, name: "First item" },
//   { id: 2, name: "Second item" },
// ];

// // -------------------- Helper functions --------------------

// function json(data: JsonValue, init?: ResponseInit): Response {
//   return new Response(JSON.stringify(data), {
//     headers: { "Content-Type": "application/json; charset=utf-8" },
//     ...init,
//   });
// }

// function notFound(): Response {
//   return json({ error: "Not found" }, { status: 404 });
// }

// function badRequest(message: string): Response {
//   return json({ error: message }, { status: 400 });
// }

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

// // -------------------- Mini Router --------------------

// interface Context {
//   req: Request;
//   url: URL;
//   params: Record<string, string>;
// }

// type RouteHandler = (ctx: Context) => Response | Promise<Response>;

// interface Route {
//   method: string;
//   pattern: string; // e.g. "/items/:id"
//   handler: RouteHandler;
// }

// // very simple matcher for "/items/:id"
// function matchPath(pattern: string, path: string): Record<string, string> | null {
//   const patternParts = pattern.split("/").filter(Boolean);
//   const pathParts = path.split("/").filter(Boolean);

//   if (patternParts.length !== pathParts.length) {
//     return null;
//   }

//   const params: Record<string, string> = {};

//   for (let i = 0; i < patternParts.length; i++) {
//     const p = patternParts[i];
//     const segment = pathParts[i];

//     if (p.startsWith(":")) {
//       const key = p.slice(1);
//       params[key] = decodeURIComponent(segment);
//     } else if (p !== segment) {
//       return null;
//     }
//   }

//   return params;
// }

// // -------------------- Defining routes --------------------

// const routes: Route[] = [];

// // small helpers for registration
// function GET(pattern: string, handler: RouteHandler) {
//   routes.push({ method: "GET", pattern, handler });
// }

// function POST(pattern: string, handler: RouteHandler) {
//   routes.push({ method: "POST", pattern, handler });
// }

// function PUT(pattern: string, handler: RouteHandler) {
//   routes.push({ method: "PUT", pattern, handler });
// }

// function DELETE(pattern: string, handler: RouteHandler) {
//   routes.push({ method: "DELETE", pattern, handler });
// }

// // ---- Routes ----

// // Root
// GET("/", (ctx) =>
//   json({
//     message: "Hello from Deno REST API",
//     docs: ["/health", "/items"],
//   })
// );

// // Health check
// GET("/health", () => json({ status: "ok" }));

// // List items
// GET("/items", () => json(items));

// // Get single item
// GET("/items/:id", (ctx) => {
//   const id = Number(ctx.params.id);
//   if (Number.isNaN(id)) {
//     return badRequest("Invalid 'id' - must be a number.");
//   }
//   const item = items.find((x) => x.id === id);
//   if (!item) {
//     return notFound();
//   }
//   return json(item);
// });

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

// // -------------------- Main handler + error handling --------------------

// async function routeRequest(req: Request): Promise<Response> {
//   const url = new URL(req.url);

//   for (const route of routes) {
//     if (route.method !== req.method) continue;
//     const params = matchPath(route.pattern, url.pathname);
//     if (!params) continue;

//     const ctx: Context = { req, url, params };
//     return await route.handler(ctx);
//   }

//   return notFound();
// }

async function mainHandler(_req: Request): Promise<Response> {
    //   try {
    //     return await routeRequest(req);
    //   } catch (err) {
    //     console.error("Unhandled error:", err);
    //     return json({ error: "Internal Server Error" }, { status: 500 });
    //   }

    // TODO: replace with actual handler
    return new Response("Hello from Deno!");
}

// // -------------------- Start (local / Docker / Deno Deploy) --------------------

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
