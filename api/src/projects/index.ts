import { Elysia, ElysiaCustomStatusResponse, t } from 'elysia';
import { Types } from 'mongoose';

import { findAll, findOne } from '../common/database/service';
import { paramsSchema, querySchema, querySchemaSg } from './models';
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
  .get('/sg/:sgName', async ({ status, params, query }) => {
    try {
      const { lang = "gr", limitAmount } = query;
      const { sgName } = params;

      const result = await findAll(Project, {
        query: { sg: sgName.toLowerCase() },
        lang: lang,
        limit: limitAmount
      });

      return result;
    } catch (error) {
      console.error(`Error | GET (/projects/sg/:sgName):`, error);

      if (error instanceof ElysiaCustomStatusResponse) {
        throw error;
      }

      throw status(500, 'Internal Server Error');
    }
  }, {
    params: t.Object({ sgName: t.String() }),
    query: querySchemaSg,
    response: {
      404: t.String(),
      500: t.String(),
    },
    detail: {
      tags: ['Projects']
    }
  });
