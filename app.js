const http = require('http');
const controllers = require('./controllers/taskController');
const RouteHandler = require('./controllers/errorHandler.Controller');
const PORT = 3000;

const server = http.createServer((req, res) => {
  const { url, method } = req;
  const API__ROUTE = 'api';
  const TASK__ROUTE = `/${API__ROUTE}\/tasks\/?$`;
  // const PARAM__ROUTE = `/\/api\/tasks\/[0-9]+/`;

  if (url.match(TASK__ROUTE) && method === 'GET') {
    controllers.getTasks(req, res);
  } else if (url.match(/\/api\/tasks\/[0-9]+/) && method === 'GET') {
    controllers.getTaskById(req, res);
  } else if (url.match(TASK__ROUTE) && method === 'POST') {
    controllers.create(req, res);
  } else if (url.match(/\/api\/tasks\/[0-9]+/) && method === 'PUT') {
    controllers.update(req, res);
  } else if (url.match(/\/api\/tasks\/[0-9]+/) && method === 'DELETE') {
    controllers.remove(req, res);
  } else {
    RouteHandler.notFound(req, res);
  }
});

server.listen(PORT, () =>
  console.log(`Server listening on ${PORT}, http://localhost:${PORT}/api/tasks`)
);
