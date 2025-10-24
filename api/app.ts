import { Elysia } from 'elysia';
import { cors } from '@elysiajs/cors';
import { swagger } from '@elysiajs/swagger';

import { council } from './src/council';
import { getConfig } from './src/common/helpers';
import { connectMongo } from './src/common/database/connect';
import { counselor } from './src/counselor';
import { events } from './src/events';
import { thirdPary } from './src/thirdparty';

const { corsAllowList } = getConfig('./config.yml');

const PORT = process.env.PORT || 5000;

if (process.env.ENABLE_MONGO_CONNECTION === 'true') await connectMongo();

const app = new Elysia()

app.use(cors({
  origin: (request) => {
    const origin = request.headers.get('origin') || '';
    const isDev = process.env.NODE_ENV === 'development';

    if (isDev) return true;

    return corsAllowList.includes(origin);
  },
}))

app
  .get('/ping', () => 'ok')
  .use(council)
  .use(counselor)
  .use(events)
  .use(thirdPary)

if (process.env.NODE_ENV === "development") {
  app.use(swagger());
}

app.listen(PORT, () => {
  console.log(`🦊 Elysia is running at http://localhost:${PORT}`);
});
