import { StartupPage } from "./lib/StartupPage.js";
import { PubPage } from "./lib/PubPage.js";
import { ScorePage } from "./lib/ScorePage.js";
import { keyCodes } from "./lib/helpers.js";

const pages = [new StartupPage(), new ScorePage(25), new PubPage()];

pages.forEach((page, index, pages) => {
  page.nextPage = pages[Math.min(index + 1, pages.length - 1)];
  page.previousPage = pages[Math.max(index - 1, 0)];
});

let selectedPage =
  pages.find((page) => page.id === window.location.hash.slice(1)) || pages[0];

const changePage = (newPage) => {
  selectedPage.onDeselected();
  selectedPage = newPage;
  selectedPage.onSelected();
  window.location.hash = selectedPage.id;
};

onload = () => {
  document.addEventListener("keydown", (e) => {
    e = e || window.event;

    if (e.keyCode === keyCodes.left) {
      changePage(selectedPage.previousPage);
    } else if (e.keyCode === keyCodes.right) {
      changePage(selectedPage.nextPage);
    }

    selectedPage.onKeyDown(e);
  });

  const body = document.getElementsByTagName("body")[0];
  body.classList.remove("hidden");

  selectedPage.onSelected();
};
