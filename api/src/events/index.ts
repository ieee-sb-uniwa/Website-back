import { Elysia, t } from 'elysia';

import { findAll, findOne } from '../common/database/service';
import { notFound } from '../common/model';

import Events from './schema';
import { FilterQuery, Types } from 'mongoose';
import { EventByIdParams, EventsQueryMin, EventsQuery, EventsSearchQuery } from './model'

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
      query: EventsQueryMin,
      response: {
        404: notFound,
      },
      detail: {
        tags: ['Events']
      }
    }
  )
  .get('/keywords', async ({ query, status }) => {
    try {
      const { lang = 'gr' } = query;

      const response = await Events.aggregate([
        { $unwind: `$info.${lang}.keywords` },
        {
          $group: {
            _id: null,
            unique: { $addToSet: `$info.${lang}.keywords` },
          },
        }
      ])

      return response[0].unique;
    } catch (error) {
      console.error(`Error | GET (/events/keywords):`, error)

      throw status(500, 'Internal Server Error');
    }
  }, {
      query: EventsQueryMin,
      response: {
        200: t.Array(t.String()),
        500: t.String()
      },
      detail: {
        tags: [
          'Events'
        ]
      }
    }
  )
  .get('/search', async ({ query, status }) => {
    try {
      const { lang = 'gr', query: q } = query;

      const response = await Events.aggregate([
        {
          $match: {
            [`info.${lang}.title`]: q ? { $regex: q, $options: 'i' } : q
          }
        },
        {
          $replaceRoot: {
            newRoot: {
              $mergeObjects: [
                "$$ROOT",
                { $getField: { field: lang, input: "$info" } }
              ]
            }
          }
        },
        { $unset: "info" }
      ]);

      return response;
    } catch (error) {
      console.error(`Error | GET (/events/search): `, error)

      throw status(500, 'Internal Server Error');
    }
  }, {
    query: EventsSearchQuery,
    response: {
      422: t.String(),
      500: t.String()
    },
    detail: {
      tags: [
        'Events'
      ]
    }
  }
)
