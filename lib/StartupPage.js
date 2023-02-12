import { Page } from "./helpers.js";
import { Letterize } from "./Letterize.js";

export class StartupPage extends Page {
  constructor() {
    super("page-startup");
    this.init();
  }

  init() {
    new Letterize(document.getElementById("text-burgui"));
    new Letterize(document.getElementById("text-quiz"), (index) =>
      index % 2 ? "txtmayo" : "txtketchup"
    );
  }
}
