export const keyCodes = {
  left: 37,
  up: 38,
  right: 39,
  down: 40,
  a: 65,
  e: 69,
  w: 87,
  c: 67,
};

export class Page {
  constructor(id) {
    this.id = id;
  }

  onKeyDown(e) {}

  onSelected() {}

  onDeselected() {}
}

export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
export const SECOND = 1000;
export const SECONDS = SECOND;
