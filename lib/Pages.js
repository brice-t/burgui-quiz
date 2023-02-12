import { keyCodes } from "./helpers.js";

export class Page {
  constructor(id) {
    this.id = id;
  }

  onKeyDown(e) {}

  onResize() {}

  onHashChange() {}
}

export class ScorePage extends Page {
  constructor(maxScore) {
    super("page-score");
    this.maxScore = maxScore;
    this.currentScore = { ketchup: 0, mayo: 0 };
  }

  incrScore(incrVal, team) {
    this.currentScore[team] = Math.min(
      Math.max(0, this.currentScore[team] + incrVal),
      this.maxScore
    );

    this.updateScoreMarkup(team);
  }

  updateScoreMarkup(team) {
    let scoreNumberNode = document.getElementById("score-number-" + team);
    scoreNumberNode.innerHTML = this.currentScore[team].toLocaleString(
      "fr-FR",
      {
        minimumIntegerDigits: 2,
        useGrouping: false,
      }
    );
    this.fillImg(
      "beer-" + team,
      (this.currentScore[team] / this.maxScore) * 100
    );
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
      this.incrScore(-1, "ketchup");
    } else if (e.keyCode === keyCodes.e) {
      this.incrScore(1, "ketchup");
    } else if (e.keyCode === keyCodes.w) {
      this.incrScore(-1, "mayo");
    } else if (e.keyCode === keyCodes.c) {
      this.incrScore(1, "mayo");
    }
  }
}
