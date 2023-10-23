import http from 'http';
import url from 'url';
import { parseRequestBody, getMatchedRoute, setCORSHeaders } from './infra.js';
import { getTodos } from './domain.js';
import { isPositiveInteger } from './utils.js';
import { Router } from './router.js';
const hostname = 'localhost';
const port = 3004;

let todos = await getTodos();

// const routeHandlers = [
//   {
//     route: '/users/:id',
//     method: 'POST',
//     handler: ({ req, res, pathVariables }) => {
//       parseRequestBody(req, (error, data) => {
//         if (error) {
//           res.statusCode = 400;
//           res.end(error.message);
//           return;
//         }

//         const userId = parseInt(pathVariables.id, 10);
//         if (isPositiveInteger(userId)) {
//           res.setHeader('Content-Type', 'application/json');
//           res.end(JSON.stringify({ userId, ...data }));
//         } else {
//           res.statusCode = 400;
//           res.end('Invalid user ID. It must be a positive integer.');
//         }
//       });
//     },
//   },
//   {
//     route: '/todos/:id',
//     method: 'GET',
//     handler: ({ res, pathVariables }) => {
//       const id = parseInt(pathVariables.id, 10);
//       if (isPositiveInteger(id)) {
//         res.setHeader('Content-Type', 'application/json');
//         res.end(JSON.stringify(todos.find((todo) => todo.id === id)));
//         return;
//       }
//       res.statusCode = 404;
//       res.setHeader('Content-Type', 'application/json');
//       res.end(JSON.stringify({ message: 'Todo not found', error: true }));
//     },
//   },
//   {
//     route: '/todos/:id',
//     method: 'PATCH',
//     handler: ({ req, res, pathVariables }) => {
//       parseRequestBody(req, (error, data) => {
//         if (error) {
//           res.statusCode = 400;
//           res.end(error.message);
//           return;
//         }
//         const id = parseInt(pathVariables.id, 10);
//         if (isPositiveInteger(id)) {
//           todos = todos.map((todo) => {
//             if (todo.id === id) {
//               return { ...todo, ...data };
//             }
//             return todo;
//           });
//           res.setHeader('Content-Type', 'application/json');
//           res.end(JSON.stringify({ id, ...data }));
//           return;
//         }
//         res.statusCode = 400;
//         res.setHeader('Content-Type', 'application/json');
//         res.end(JSON.stringify({ message: 'Invalid todo ID. It must be a positive integer.', error: true }));
//       });
//     },
//   },
//   {
//     route: '/todos/:id',
//     method: 'DELETE',
//     handler: ({ res, pathVariables }) => {
//       const id = parseInt(pathVariables.id, 10);
//       if (isPositiveInteger(id)) {
//         todos = todos.filter((todo) => todo.id !== id);
//         res.setHeader('Content-Type', 'application/json');
//         res.end(JSON.stringify({ id }));
//       }
//     },
//   },
//   {
//     route: '/todos',
//     method: 'POST',
//     handler: ({ req, res }) => {
//       parseRequestBody(req, (error, data) => {
//         if (error) {
//           res.statusCode = 400;
//           res.end(error.message);
//           return;
//         }
//         todos.unshift(data);
//         res.setHeader('Content-Type', 'application/json');
//         res.end(JSON.stringify(data));
//       });
//     },
//   },
//   {
//     route: '/todos',
//     method: 'GET',
//     handler: ({ res }) => {
//       res.setHeader('Content-Type', 'application/json');
//       res.end(JSON.stringify(todos));
//     },
//   },
// ];
const appRouter = new Router('/').get(({ res }) => {
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ a: 'ddddddd' }));
});
const router = new Router('todos')
  .get(({ res }) => {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(todos));
  })
  .post(({ req, res }) => {
    parseRequestBody(req, (error, data) => {
      if (error) {
        res.statusCode = 400;
        res.end(error.message);
        return;
      }
      todos.unshift(data);
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(data));
    });
  });
const todoIdRouter = new Router(':id')
  .get(({ res, pathVariables }) => {
    const id = parseInt(pathVariables.id, 10);
    if (isPositiveInteger(id)) {
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(todos.find((todo) => todo.id === id)));
      return;
    }
    res.statusCode = 404;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ message: 'Todo not found', error: true }));
  })
  .post(({ req, res, pathVariables }) => {
    parseRequestBody(req, (error, data) => {
      if (error) {
        res.statusCode = 400;
        res.end(error.message);
        return;
      }

      const userId = parseInt(pathVariables.id, 10);
      if (isPositiveInteger(userId)) {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ userId, ...data }));
      } else {
        res.statusCode = 400;
        res.end('Invalid user ID. It must be a positive integer.');
      }
    });
  })
  .delete(({ res, pathVariables }) => {
    const id = parseInt(pathVariables.id, 10);
    if (isPositiveInteger(id)) {
      todos = todos.filter((todo) => todo.id !== id);
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ id }));
    }
  })
  .patch(({ req, res, pathVariables }) => {
    parseRequestBody(req, (error, data) => {
      if (error) {
        res.statusCode = 400;
        res.end(error.message);
        return;
      }
      const id = parseInt(pathVariables.id, 10);
      if (isPositiveInteger(id)) {
        todos = todos.map((todo) => {
          if (todo.id === id) {
            return { ...todo, ...data };
          }
          return todo;
        });
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ id, ...data }));
        return;
      }
      res.statusCode = 400;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ message: 'Invalid todo ID. It must be a positive integer.', error: true }));
    });
  });

appRouter
  .appendChildRouter(router)
  .appendChildRouter(todoIdRouter)
  .get(({ res, pathVariables }) => {
    const id = parseInt(pathVariables.id, 10);
    if (isPositiveInteger(id)) {
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(todos.find((todo) => todo.id === id)));
      return;
    }
    res.statusCode = 404;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ message: 'Todo not found', error: true }));
  })
  .append('edit')
  .get(({ res }) => {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ a: 'ddddddd' }));
  });

const { routeHandlers } = appRouter;
console.log(routeHandlers);

const server = http.createServer((req, res) => {
  setCORSHeaders(res);
  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    res.end();
    return;
  }

  const parsedUrl = url.parse(req.url, true);
  const matchedRoute = getMatchedRoute({ parsedUrl, requestMethod: req.method, routeHandlers });
  if (matchedRoute) {
    matchedRoute.handler({ req, res, query: parsedUrl.query, pathVariables: matchedRoute.pathVariables });
  } else {
    res.statusCode = 404;
    res.end('Not Found');
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

// const createRouter = (route) => {
//   const routeHandlers = [];
//   const addRoute = (method, handler) => {
//     const existingRoute = routeHandlers.find((routeHandler) => routeHandler.method === method && routeHandler.route === route);
//     if (existingRoute) {
//       existingRoute.handler = handler;
//       return;
//     }
//     routeHandlers.push({
//       route,
//       method,
//       handler,
//     });
//   };
//   const createMethodHandler = (method) =>
//     function (handler) {
//       addRoute(method, handler);
//       return this;
//     };
//   return {
//     get: createMethodHandler('GET'),
//     post: createMethodHandler('POST'),
//     append: function (childRoute) {
//       const childRouter = createRouter(childRoute);
//       return new Proxy(childRouter, {
//         get: (router, method) => {
//           if (method === 'append') {
//             return router[method];
//           }
//           const result = this[''];
//           console.log(result, router);
//           routeHandlers.push(...result.getAll());
//           return result;
//         },
//       });
//     },
//     getAll: () => routeHandlers,
//   };
// };
// const router = createRouter('/todos');
// router
//   .get(({ res }) => {
//     res.setHeader('Content-Type', 'application/json');
//     res.end(JSON.stringify(todos));
//   })
//   .append('/users/:id')
//   .post(({ req, res, pathVariables }) => {})
//   .get()
//   .append('edit')
//   .post(({ req, res, pathVariables }) => {});
// console.log(router);
