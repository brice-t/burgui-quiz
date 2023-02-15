import { sleep, SECONDS, animateGuiguis } from "./helpers.js";
import { Route } from "./Router.js";
import { Letterize } from "./Letterize.js";

export class PubPage extends Route {
  constructor() {
    super("page-pub");
    this.init();
  }

  init() {
    new Letterize(document.getElementById("pub-text-quiz"), (index) =>
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

      await sleep(8 * SECONDS + Math.random() * 8 * SECONDS);
    }

    this.animating = false;
  }

}
