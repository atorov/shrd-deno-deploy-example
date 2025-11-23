FROM denoland/deno:latest

WORKDIR /app

# Copy config and lockfile first to leverage Docker layer caching
# We use a wildcard trick (deno.loc[k]) to copy deno.lock only if it exists
COPY deno.json deno.loc[k] ./

COPY src ./src

# Compile/Cache the application code and dependencies
RUN deno cache src/main.ts

ENV PORT=9001

# Document the exposed port
EXPOSE 9001

# Run as non-root user for security
USER deno

CMD [ "deno", "task", "start" ]
