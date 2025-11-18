import { Elysia, ElysiaCustomStatusResponse, t } from 'elysia';
import { Types } from 'mongoose';

import { findOne } from '../common/database/service';
import { paramsSchema, querySchema } from './models';
import Project from './schema';

export const projects = new Elysia({ prefix: '/projects' })
  .get('/:id', async ({ status, params, query }) => {
    try {
      const { lang = "gr" } = query;
      const { id } = params;

      const result = await findOne(Project, { _id: new Types.ObjectId(id) }, { lang });
      if (!result) {
        throw status(404, 'Not Found');
      }

      return result;
    } catch (error) {
      console.error(`Error | GET (/projects/:id):`, error);

      if (error instanceof ElysiaCustomStatusResponse) {
        throw error;
      }

      throw status(500, 'Internal Server Error');
    }
  }, {
    params: paramsSchema,
    query: querySchema,
    response: {
      404: t.String(),
      500: t.String(),
    },
    detail: {
      tags: ['Projects']
    }
  })
