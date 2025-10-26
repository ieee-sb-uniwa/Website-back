import { Elysia, t } from 'elysia';

import { findAll, findOne } from '../common/database/service';
import { notFound } from '../common/model';

import Events from './schema';
import { FilterQuery, Types } from 'mongoose';
import { EventByIdParams, EventByIdQuery, EventsQuery } from './model'

export const events = new Elysia({ prefix: '/events' })
  .get('/', async ({ query, status }) => {
      try {
        const { lang = "gr", limitAmount, keywords } = query;
        const mongoQuery: FilterQuery<Record<string, RegExp>> = {};

        if (keywords) {
          const keywordArray = keywords
            .split(',')
            .map(k => new RegExp(k.trim(), 'i'));
          mongoQuery[`info.${lang}.keywords`] = { $in: keywordArray };
        }

        const result = await findAll(Events, {
          lang,
          query: mongoQuery,
          limit: limitAmount ? Number(limitAmount) : undefined
        });

        return result;
      } catch (error) {
        console.error(`Error | GET (/events):`, error);
        return status(404, 'Entity not found');
      }
    },
    {
      query: EventsQuery,
      response: {
        404: notFound,
      },
      detail: {
        tags: ['Events']
      }
    }
  )
  .get('/:id', async ({ query, params, status }) => {
      try {
        const { lang = "gr" } = query;
        const { id } = params;

        const result = await findOne(Events, { _id: new Types.ObjectId(id) }, { lang });

        if (!result) {
          return status(404, 'Event not found');
        }

        return result;
      } catch (error) {
        console.error(`Error | GET (/events/${params.id}):`, error)
      }
    },
    {
      params: EventByIdParams,
      query: EventByIdQuery,
      response: {
        404: notFound,
      },
      detail: {
        tags: ['Events']
      }
    }
  )
