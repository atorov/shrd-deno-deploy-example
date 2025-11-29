type JsonValue =
    | string
    | number
    | boolean
    | null
    | JsonValue[]
    | { [key: string]: JsonValue };

function json(data: JsonValue, init?: ResponseInit): Response {
    return new Response(JSON.stringify(data), {
        headers: { "Content-Type": "application/json; charset=utf-8" },
        ...init,
    });
}

export default json;
