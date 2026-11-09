import express from 'express';

const NOT_IMPLEMENTED_MESSAGE = 'This database operation has not yet been implemented by the student group.';

function notImplemented(req, res) {
  res.status(501).json({
    error: {
      code: 'NOT_IMPLEMENTED',
      message: NOT_IMPLEMENTED_MESSAGE,
    },
  });
}

function registerPlaceholderRoutes(router) {
  router.post('/auth/login', notImplemented);
  router.get('/auth/me', notImplemented);

  router.get('/campuses', notImplemented);
  router.get('/rooms', notImplemented);
  router.get('/rooms/:id', notImplemented);
  router.post('/rooms', notImplemented);
  router.patch('/rooms/:id', notImplemented);

  router.get('/reservations', notImplemented);
  router.post('/reservations', notImplemented);
  router.patch('/reservations/:id/cancel', notImplemented);

  router.get('/service-requests', notImplemented);
  router.post('/service-requests', notImplemented);
  router.get('/service-requests/:id', notImplemented);
  router.post('/service-requests/:id/comments', notImplemented);
  router.patch('/service-requests/:id/status', notImplemented);

  router.get('/analytics/summary', notImplemented);
  router.get('/analytics/export', notImplemented);

  router.get('/integration/events', notImplemented);
  router.get('/integration/status', notImplemented);
  router.post('/integration/process-pending', notImplemented);
}

export function registerRoutes(app) {
  const router = express.Router();

  router.get('/health', (req, res) => {
    res.json({
      data: {
        status: 'ok',
        databases: {
          postgresql: 'NOT_CONFIGURED',
          mongodb: 'NOT_CONFIGURED',
        },
        integration: 'NOT_CONFIGURED',
      },
      meta: {},
    });
  });

  registerPlaceholderRoutes(router);
  app.use('/api', router);
}
