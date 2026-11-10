import express from 'express';
import { checkMongoDb } from './db/mongodb.js';
import { checkPostgres } from './db/postgres.js';
import { databaseRouteNotImplemented } from './middleware/notImplemented.js';

function registerPlaceholderRoutes(router) {
  router.post('/auth/login', databaseRouteNotImplemented);
  router.get('/auth/me', databaseRouteNotImplemented);

  router.get('/campuses', databaseRouteNotImplemented);
  router.get('/rooms', databaseRouteNotImplemented);
  router.get('/rooms/:id', databaseRouteNotImplemented);
  router.post('/rooms', databaseRouteNotImplemented);
  router.patch('/rooms/:id', databaseRouteNotImplemented);

  router.get('/reservations', databaseRouteNotImplemented);
  router.post('/reservations', databaseRouteNotImplemented);
  router.patch('/reservations/:id/cancel', databaseRouteNotImplemented);

  router.get('/service-requests', databaseRouteNotImplemented);
  router.post('/service-requests', databaseRouteNotImplemented);
  router.get('/service-requests/:id', databaseRouteNotImplemented);
  router.post('/service-requests/:id/comments', databaseRouteNotImplemented);
  router.patch('/service-requests/:id/status', databaseRouteNotImplemented);

  router.get('/analytics/summary', databaseRouteNotImplemented);
  router.get('/analytics/export', databaseRouteNotImplemented);

  router.get('/integration/events', databaseRouteNotImplemented);
  router.get('/integration/status', databaseRouteNotImplemented);
  router.post('/integration/process-pending', databaseRouteNotImplemented);
}

export function registerRoutes(app) {
  const router = express.Router();

  router.get('/health', async (req, res) => {
    const [postgresql, mongodb] = await Promise.all([checkPostgres(), checkMongoDb()]);
    const healthy = [postgresql, mongodb].every(({ status }) => status !== 'UNAVAILABLE');
    const response = {
      data: {
        status: healthy ? 'ok' : 'degraded',
        databases: {
          postgresql: postgresql.status,
          mongodb: mongodb.status,
        },
        integration: 'NOT_CONFIGURED',
      },
      meta: {},
    };

    if (!healthy) return res.status(503).json({
      ...response,
      error: {
        code: 'DATABASE_UNAVAILABLE',
        message: 'One or more configured databases could not be reached.',
      },
    });

    return res.json(response);
  });

  registerPlaceholderRoutes(router);
  app.use('/api', router);
}
