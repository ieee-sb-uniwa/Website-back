import { Elysia } from 'elysia';
import { FilterQuery } from 'mongoose';

import { findAll } from '../common/database/service';
import { notFound } from '../common/model';

import { Council } from './schema';
import { CouncilQuery } from './model';

export const council = new Elysia({ prefix: '/council' })
  .get('/', async ({ query, status }) => {
      try {
        const { lang = "gr", keywords } = query;

        const mongoQuery: FilterQuery<Record<string, RegExp>> = {};
        if (keywords) {
          const keywordArray = keywords
            .split(',')
            .map(k => new RegExp(k.trim(), 'i'));
          mongoQuery[`info.${lang}.keywords`] = { $in: keywordArray };
        }

        const result = await findAll(Council, {
          lang,
          query: mongoQuery,
        });

        return result;
      } catch (error) {
        console.error(`Error | GET (/council):`, error);
        return status(404, 'Not found');
      }
    },
    {
      query: CouncilQuery,
      response: {
        404: notFound,
      },
      detail: {
        tags: ['Counselor - Council']
      }
    }
  )
