import { sleep, SECONDS } from "./helpers.js";
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
      const random = Math.round(Math.random());
      let timeline;

      switch (random) {
        case 0: {
          timeline = anime.timeline({
            targets: "#guigui-bottom-left",
            easing: "easeOutExpo",
          });
          break;
        }
        case 1: {
          timeline = anime
            .timeline({
              targets: "#guigui-bottom-right",
              easing: "easeOutExpo",
            })
            .add({
              scaleX: -1,
              duration: 0,
            });
          break;
        }
      }

      timeline
        .add({
          translateY: -110,
          duration: 4000,
        })
        .add({
          translateY: 0,
          duration: 1000,
        });

      await sleep(8 * SECONDS + Math.random() * 8 * SECONDS);
    }

    this.animating = false;
  }
}
