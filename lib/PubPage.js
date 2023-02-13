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
}
