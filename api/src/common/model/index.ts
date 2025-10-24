import { t } from 'elysia';

export const baseQuery = t.Object({
  lang: t.Optional(t.String()),
  limitAmount: t.Optional(t.Number()),
  sortBy: t.Optional(t.String()),
  keywords: t.Optional(t.String())
})

export const notFound = t.Literal('Not found');
