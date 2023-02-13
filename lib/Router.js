import { keyCodes } from "./helpers.js";

export class Route {
  nextRoute = null;
  previousRoute = null;
  _active = false;

  set active(value) {
    this._active = value;
    if (value) {
      this.onEnter();
    } else {
      this.onLeave();
    }
  }

  get active() {
    return this._active;
  }

  constructor(id) {
    this.id = id;
  }

  onKeyDown(e) {}

  onEnter() {}

  onLeave() {}
}

export class Router {
  _activeRoute = null;

  set activeRoute(route) {
    if (this._activeRoute === route) {
      return;
    }

    if (this._activeRoute) {
      this._activeRoute.active = false;
    }

    this._activeRoute = route;
    this._activeRoute.active = true;
    window.location.hash = this._activeRoute.id;
  }

  get activeRoute() {
    return this._activeRoute;
  }

  constructor(routes) {
    this.routes = routes;
    this.routes.forEach((route, index, routes) => {
      route.nextRoute = routes[Math.min(index + 1, routes.length - 1)];
      route.previousRoute = routes[Math.max(index - 1, 0)];
    });
  }

  start() {
    document.addEventListener("keydown", this.onKeyDown);
    this.activeRoute =
      this.routes.find((route) => route.id === window.location.hash.slice(1)) ||
      this.routes[0];
  }

  onKeyDown = (e) => {
    if (e.keyCode === keyCodes.left) {
      this.activeRoute = this.activeRoute.previousRoute;
      return;
    } else if (e.keyCode === keyCodes.right) {
      this.activeRoute = this.activeRoute.nextRoute;
      return;
    }

    this.activeRoute.onKeyDown(e);
  };
}
