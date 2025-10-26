import { t } from 'elysia';

export const EventsQuery = t.Object({
  lang: t.Optional(t.String()),
  keywords: t.Optional(t.String()),
  limitAmount: t.Optional(t.Number()),
})

export const EventByIdParams = t.Object({
  id: t.String(),
})

export const EventByIdQuery = t.Object({
  lang: t.Optional(t.String()),
})
