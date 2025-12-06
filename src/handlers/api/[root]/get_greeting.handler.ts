import type { RouteHandler } from "../../../types/RouteHnadler.ts";
import html from "../../../utils/routes/html.ts";

const getGreetingHandler: RouteHandler = () => {
    console.log(`::: Handling greeting request`);
    return Promise.resolve(
        html(
            `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Deno REST API</title>
        </head>
        <body>
            <h1>Hello from Deno REST API</h1>
            <p>Available endpoints:</p>
            <ul></ul>
                <li><a href="/api/health">/api/health</a></li>
                <li><a href="/api/items">/api/items</a></li>
            </ul>
            {{date}}
        </body>
        </html>
`,
            {
                date: new Date().toISOString(),
            },
        ),
    );
};

export default getGreetingHandler;
