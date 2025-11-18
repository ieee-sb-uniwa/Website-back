import { t } from 'elysia';

export const paramsSchema = t.Optional(
  t.Object({ id: t.String() })
);

export const querySchema = t.Object({
  lang: t.Optional(t.String()),
});
