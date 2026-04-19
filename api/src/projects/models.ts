import { t } from 'elysia';

export const paramsSchema = t.Optional(
  t.Object({ id: t.String() })
);

export const querySchema = t.Object({
  lang: t.Optional(t.String()),
});

export const querySchemaSg = t.Object({
  lang: t.Optional(t.String()),
  limitAmount: t.Optional(t.Number()),
})
