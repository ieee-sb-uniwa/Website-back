import { t } from 'elysia';

export const CouncilQuery = t.Object({
  lang: t.Optional(t.String()),
  keywords: t.Optional(t.String()),
})
