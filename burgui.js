import { StartupPage } from "./lib/StartupPage.js";
import { PubPage } from "./lib/PubPage.js";
import { ScorePage } from "./lib/ScorePage.js";
import { Router } from "./lib/Router.js";
import { Letterize } from "./lib/Letterize.js";

const router = new Router([
  new StartupPage(),
  new ScorePage(25),
  new PubPage(),
]);

onload = () => {
  Letterize.start();

  const body = document.getElementsByTagName("body")[0];
  body.classList.remove("hidden");

  router.start();
};
