import { t } from 'elysia';

export const ThirdPartyQuery = t.Object({
  lang: t.Optional(t.String()),
  keywords: t.Optional(t.String()),
  limitAmount: t.Optional(t.Number()),
})

export const ThirdPartyByIdParams = t.Object({
  id: t.String(),
})

export const ThirdPartyByIdQuery = t.Object({
  lang: t.Optional(t.String()),
  keywords: t.Optional(t.String()),
})
