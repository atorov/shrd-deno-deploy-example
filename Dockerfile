FROM denoland/deno

WORKDIR /app

COPY deno.json ./
COPY src ./src

RUN deno cache src/main.ts

ENV PORT=9001

CMD [ "deno", "task", "start" ]
