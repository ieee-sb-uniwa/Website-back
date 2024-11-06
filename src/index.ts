import { Elysia } from "elysia";

const app = new Elysia();

app.get("/", () => "Hello ffff!");
app.listen(3000);

console.log(
  `🦊 Elysia is fannng at ${app.server?.hostname}:${app.server?.port}`
);
