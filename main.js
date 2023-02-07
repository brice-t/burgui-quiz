onload = async () => {
  let percentage = 0;
  while (true) {
    percentage += 10;
    if (percentage > 100) {
      percentage = 0;
    }

    fillImg("beer", percentage);

    await sleep(2000);
  }
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const fillImg = async (target, percentage) => {
  anime({
    targets: `#${target} .fill`,
    easing: "easeOutElastic",
    clipPath: `polygon(0 100%, 100% 100%, 100% ${
      100 - Math.round(percentage)
    }%, 0 ${Math.round(100 - percentage)}%)`,
    duration: 1000,
  });
};
