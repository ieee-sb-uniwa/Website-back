import { t } from "elysia";

export const ScientificGroupsQuery = t.Object({
  lang: t.Optional(t.Union([t.Literal("gr"), t.Literal("en")])),
});

export const ScientificGroupsByName = t.Object({
  name: t.String(),
});

export const responseScientificGroup = t.Object({
  _id: t.String(),
  name: t.String(),
  name_short: t.Optional(t.String()),
  wallpaper: t.Optional(t.String()),
  logo: t.Optional(t.String()),
  description: t.Optional(t.String()),
  images: t.Optional(t.Array(t.String())),
  id: t.Optional(t.Number()),
  createdAt: t.Optional(t.String()),
  updatedAt: t.Optional(t.String()),
});
