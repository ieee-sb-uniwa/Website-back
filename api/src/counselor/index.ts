import { Elysia, t } from 'elysia';

import { findAll } from '../common/database/service';
import { notFound } from '../common/model';

import { Counselor } from './schema';

export const counselor = new Elysia({ prefix: '/counselor' })
  .get('/', async ({ query, status }) => {
      try {
        const { lang = "gr" } = query;


        const result = await findAll(Counselor, {
          lang,
        });

        return result;
      } catch (error) {
        console.error(`Error | GET (/counselor):`, error);
        return status(404, 'Not found');
      }
    },
    {
      query: t.Object({ lang: t.Optional(t.String()) }),
      response: {
        404: notFound,
      },
      detail: {
        tags: ['Counselor - Council']
      }
    }
  )
