export class Router {
  routeHandlers = [];

  constructor(route, parent) {
    this.route = route;
    if (parent) {
      this.parent = parent;
    }
  }

  addRoute(method, handler) {
    const routeHandlers = this.parent ? this.parent.routeHandlers : this.routeHandlers;
    const existingRoute = routeHandlers.find((routeHandler) => routeHandler.method === method && routeHandler.route === this.route);
    if (existingRoute) {
      existingRoute.handler = handler;
      return;
    }
    routeHandlers.push({
      route: this.route,
      method,
      handler,
    });
  }

  get = (handler) => {
    this.addRoute('GET', handler);
    return this;
  };

  post = (handler) => {
    this.addRoute('POST', handler);
    return this;
  };

  patch = (handler) => {
    this.addRoute('PATCH', handler);
    return this;
  };

  delete = (handler) => {
    this.addRoute('DELETE', handler);
    return this;
  };

  append = (childRoute) => new Router(`${this.route}/${childRoute}`, this.parent || this);

  appendChildRouter = (childRouter) => {
    const routeHandlers = this.parent ? this.parent.routeHandlers : this.routeHandlers;
    const newRouter = new Router(`${this.route}/${childRouter.route}`, this.parent || this);
    routeHandlers.push(...childRouter.routeHandlers);
    return newRouter;
  };
}
