import { t } from "elysia";

export const responseSponsor = t.Object({
  _id: t.String(),
  id: t.Number(),
  title: t.String(),
  tier: t.Union([
    t.Literal("bronze"),
    t.Literal("silver"),
    t.Literal("gold"),
    t.Literal("platinum"),
    t.Literal("diamond"),
    t.Literal("elite"),
  ]),
  scale: t.Number(),
  img: t.String(),
  url: t.String(),
  createdAt: t.Optional(t.String()),
  updatedAt: t.Optional(t.String()),
});
