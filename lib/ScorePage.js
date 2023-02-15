import { keyCodes, hideGuiguis } from "./helpers.js";
import { Route } from "./Router.js";
import { Letterize } from "./Letterize.js";

export class ScorePage extends Route {
  teams = {
    ketchup: {
      score: 0,
      element: document.getElementById("score-number-ketchup"),
      name: "ketchup",
    },
    mayo: {
      score: 0,
      element: document.getElementById("score-number-mayo"),
      name: "mayo",
    },
  };

  constructor(maxScore) {
    super("page-score");
    this.maxScore = maxScore;
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
    this.fillImg("img-" + team.name, (team.score / this.maxScore) * 100);
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

  async onEnter() {
    this.animateGuiguiHeads();
  }

  async animateGuiguiHeads() {
    hideGuiguis();
  }

}
