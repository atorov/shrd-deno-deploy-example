function html<Values extends Record<string, unknown>>(
    template: string,
    values?: Values,
): Response {
    let content = template;

    if (values) {
        content = template.replace(/\{\{(\w+)\}\}/g, (match, key) => {
            return values[key] !== undefined ? String(values[key]) : match;
        });
    }

    return new Response(
        content,
        {
            headers: {
                "Content-Type": "text/html; charset=utf-8",
            },
            status: 200,
        },
    );
}

export default html;
