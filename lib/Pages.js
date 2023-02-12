import { keyCodes } from "./helpers.js";
import { Letterize } from "./Letterize.js";

export class Page {
  constructor(id) {
    this.id = id;
  }

  onKeyDown(e) {}

  onResize() {}

  onHashChange() {}
}

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

export class ScorePage extends Page {
  teams = {
    ketchup: {
      score: 0,
      element: document.getElementById("score-number-ketchup"),
    },
    mayo: {
      score: 0,
      element: document.getElementById("score-number-mayo"),
    },
  };

  constructor(maxScore) {
    super("page-score");
    this.maxScore = maxScore;
    this.init();
  }

  init() {
    new Letterize(this.teams.ketchup.element);
    new Letterize(this.teams.mayo.element);
  }

  incrScore(incrVal, team) {
    team.score = Math.min(Math.max(0, team.score + incrVal), this.maxScore);

    this.updateScoreMarkup(team);
  }

  updateScoreMarkup(team) {
    team.element.dataset.text = team.score.toLocaleString("fr-FR", {
      minimumIntegerDigits: 2,
      useGrouping: false,
    });
    this.fillImg("beer-" + team, (team.score / this.maxScore) * 100);
  }

  async fillImg(target, percentage) {
    anime({
      targets: `#${target} .fill`,
      easing: "easeOutElastic",
      clipPath: `polygon(0 100%, 100% 100%, 100% ${
        100 - Math.round(percentage)
      }%, 0 ${Math.round(100 - percentage)}%)`,
      duration: 1000,
    });
  }

  onKeyDown(e) {
    if (e.keyCode === keyCodes.a) {
      this.incrScore(-1, this.teams.ketchup);
    } else if (e.keyCode === keyCodes.e) {
      this.incrScore(1, this.teams.ketchup);
    } else if (e.keyCode === keyCodes.w) {
      this.incrScore(-1, this.teams.mayo);
    } else if (e.keyCode === keyCodes.c) {
      this.incrScore(1, this.teams.mayo);
    }
  }
}
