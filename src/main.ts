import mainHandler from "./handlers/main/main.handler.ts";

console.log("::: Application starting...");

// Start (local / Docker / Deno Deploy)
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
