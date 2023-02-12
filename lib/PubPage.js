import { Page, sleep, SECONDS } from "./helpers.js";
import { Letterize } from "./Letterize.js";

export class PubPage extends Page {
  selected = false;

  constructor() {
    super("page-pub");
    this.init();
  }

  async init() {
    new Letterize(document.getElementById("pub-text-burgui"));
    new Letterize(document.getElementById("pub-text-quiz"), (index) =>
      index % 2 ? "txtmayo" : "txtketchup"
    );
    new Letterize(document.getElementById("pub-text-pub"));
  }

  onDeselected() {
    this.selected = false;

    document.getElementById('guigui-bottom-left').style.display = 'inherit';
    document.getElementById('guigui-bottom-right').style.display = 'inherit';
  }

  async onSelected() {
    if (this.selected) {
      return;
    }
    this.selected = true;

    document.getElementById('guigui-bottom-left').style.display = 'none';
    document.getElementById('guigui-bottom-right').style.display = 'none';
  }
}
