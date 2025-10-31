import { t } from "elysia";

export const ScientificGroupsQuery = t.Object({
  lang: t.Optional(t.String()),
  keywords: t.Optional(t.String()),
  limitAmount: t.Optional(t.Number()),
});

export const ScientificGroupsByIdName = t.Object({
  id: t.String(),
});

export const ScientificGroupByIdQuery = t.Object({
  lang: t.Optional(t.String()),
});
