import { Page, sleep, SECONDS } from "./helpers.js";
import { Letterize } from "./Letterize.js";

export class StartupPage extends Page {
  selected = false;

  constructor() {
    super("page-startup");
    this.init();
  }

  async init() {
    new Letterize(document.getElementById("text-burgui"));
    new Letterize(document.getElementById("text-quiz"), (index) =>
      index % 2 ? "txtmayo" : "txtketchup"
    );
  }

  onDeselected() {
    this.selected = false;
  }

  async onSelected() {
    if (this.selected) {
      return;
    }
    this.selected = true;

    while (this.selected) {
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
  }
}
