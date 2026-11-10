export function databaseRouteNotImplemented(request, response) {
  response.status(501).json({
    error: {
      code: 'NOT_IMPLEMENTED',
      message: 'This database-dependent route is reserved for student implementation.',
    },
  });
}
