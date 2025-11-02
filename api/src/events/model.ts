import { t } from 'elysia';

export const EventsQuery = t.Object({
  lang: t.Optional(t.String()),
  keywords: t.Optional(t.String()),
  limitAmount: t.Optional(t.Number()),
})

export const EventByIdParams = t.Object({
  id: t.String(),
})

export const EventsQueryMin = t.Object({
  lang: t.Optional(t.String()),
})

export const EventsSearchQuery = t.Object({
  query: t.String(),
  lang: t.Optional(t.String()),
})
