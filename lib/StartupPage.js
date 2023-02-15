import { sleep, SECONDS, animateGuiguis } from "./helpers.js";
import { Route } from "./Router.js";
import { Letterize } from "./Letterize.js";

export class StartupPage extends Route {
  animating = false;

  constructor() {
    super("page-startup");
    this.init();
  }

  init() {
    new Letterize(document.getElementById("text-quiz"), (index) =>
      index % 2 ? "txtmayo" : "txtketchup"
    );
  }

  async onEnter() {
    this.animateGuiguiHeads();
  }

  async animateGuiguiHeads() {
    if (this.animating) {
      return;
    }

    while (this.active) {
      this.animating = true;

      animateGuiguis();

      await sleep(5 * SECONDS + Math.random() * 4 * SECONDS);
    }

    this.animating = false;
  }
}
