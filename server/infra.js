export const getPathVariables = (route, pathname) => {
  const routeSegments = route.split('/');
  const pathSegments = pathname.split('/');

  if (routeSegments.length !== pathSegments.length) {
    return null;
  }

  const pathVariables = {};
  for (let i = 0; i < routeSegments.length; i++) {
    if (routeSegments[i].startsWith(':')) {
      pathVariables[routeSegments[i].substring(1)] = pathSegments[i];
    } else if (routeSegments[i] !== pathSegments[i]) {
      return null;
    }
  }

  return pathVariables;
};

export const parseRequestBody = (req, callback) => {
  let body = '';
  req.on('data', (chunk) => {
    body += chunk.toString();
  });
  req.on('end', () => {
    let data;
    if (req.headers['content-type'] === 'application/json') {
      try {
        data = JSON.parse(body);
      } catch (error) {
        return callback(new Error('Invalid JSON data'));
      }
    } else {
      return callback(new Error('Unsupported content type. Please provide JSON data.'));
    }
    callback(null, data);
  });
};

export function getMatchedRoute({ parsedUrl, requestMethod, routeHandlers }) {
  const pathname = parsedUrl.pathname;
  for (const routeHandler of routeHandlers) {
    const pathVariables = getPathVariables(routeHandler.route, pathname);
    if (pathVariables && routeHandler.method === requestMethod) {
      const matchedRoute = routeHandler;
      matchedRoute.pathVariables = pathVariables;
      return matchedRoute;
    }
  }
  return null;
}

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': '*',
  'Access-Control-Max-Age': 2592000,
  'Access-Control-Allow-Headers': '*',
  'Access-Control-Allow-Credentials': true,
};
export const setCORSHeaders = (res) => {
  Object.entries(CORS_HEADERS).forEach(([key, value]) => {
    res.setHeader(key, value);
  });
};
