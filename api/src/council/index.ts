import { Elysia, error as elysiaError, t } from 'elysia';

import { findAll, findOne } from '../common/database/service';
import { baseQuery, notFound } from '../common/model';

import { Council } from './schema';
import { FilterQuery, Types } from 'mongoose';

export const council = new Elysia({ prefix: '/council' })
  .get('/', async ({ query }) => {
      try {
        const { lang = "gr", limitAmount, keywords, sortBy } = query;

        const mongoQuery: FilterQuery<any> = {};
        if (keywords) {
          const keywordArray = keywords
            .split(',')
            .map(k => new RegExp(k.trim(), 'i'));
          mongoQuery[`info.${lang}.keywords`] = { $in: keywordArray };
        }

        const result = await findAll(Council, {
          lang,
          sortBy,
          query: mongoQuery,
          limit: limitAmount ? Number(limitAmount) : undefined
        });

        return result;
      } catch (error) {
        console.error(`Error | GET (/council):`, error);
        return elysiaError(404, 'Not found');
      }
    },
    { 
      query: baseQuery, 
      response: { 
        400: notFound,
      }
    }
  )
  .get('/:id', async ({ query, params }) => {
      try {
        const { lang = "gr" } = query;
        const { id } = params;

        const result = await findOne(Council, { _id: new Types.ObjectId(id) }, { lang });
        
        if (!result) {
          return elysiaError(404, 'Council member not found');
        }
        
        return result;
      } catch (error) {
        console.error(`Error | GET (/council/${params.id}):`, error)
      }
    },
    { 
      params: t.Object({ id: t.String() }),
      query: t.Object({ lang: t.Optional(t.String()) }), 
      response: { 
        400: notFound,
      }
    }
  )
