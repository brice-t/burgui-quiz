export class Letterize {
  static start() {
    const nodes = document.getElementsByClassName("letterize");
    for (const node of nodes) {
      new Letterize(node);
    }
  }

  constructor(targetNode, getSpanClass = () => "") {
    this.targetNode = targetNode;
    this.getSpanClass = getSpanClass;
    this.setupObserver();
    this.letterize();
  }

  setupObserver() {
    const callback = (mutationsList) => {
      for (let mutation of mutationsList) {
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "data-text"
        ) {
          this.letterize();
        }
      }
    };

    const observer = new MutationObserver(callback);

    observer.observe(this.targetNode, { attributes: true });
  }

  letterize() {
    this.targetNode.innerHTML = this.targetNode.dataset.text
      .split("")
      .map(
        (letter, index) =>
          `<span class="${this.getSpanClass(index)}">${letter}</span>`
      )
      .join("");
  }
}
