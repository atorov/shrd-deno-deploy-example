// Very simple matcher for "/items/:id" style patterns
function matchPath(
    pattern: string,
    path: string,
): Record<string, string> | null {
    console.log(`::: Matching path: pattern="${pattern}", path="${path}"`);

    const patternParts = pattern.split("/").filter(Boolean);
    const pathParts = path.split("/").filter(Boolean);

    if (patternParts.length !== pathParts.length) return null;

    const params: Record<string, string> = {};

    for (let i = 0; i < patternParts.length; i++) {
        const p = patternParts[i];
        const segment = pathParts[i];

        if (p?.startsWith(":") && segment !== undefined) {
            const key = p.slice(1);
            params[key] = decodeURIComponent(segment);
        } else if (p !== segment) return null;
    }

    console.log(`::: Matched params:`, params);
    return params;
}

export default matchPath;
