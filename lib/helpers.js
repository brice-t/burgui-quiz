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

export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
export const SECOND = 1000;
export const SECONDS = SECOND;

export function animateGuiguis() {
  const random = Math.round(Math.random());
  let timeline;

  switch (random) {
    case 0: {
      timeline = anime.timeline({
        targets: "#guigui-bottom-left",
        easing: "easeOutExpo",
      });
      break;
    }
    case 1: {
      timeline = anime
        .timeline({
          targets: "#guigui-bottom-right",
          easing: "easeOutExpo",
        })
        .add({
          scaleX: -1,
          duration: 0,
        });
      break;
    }
  }

  timeline
    .add({
      translateY: -110,
      duration: 4000,
    })
    .add({
      translateY: 0,
      duration: 1000,
    });
}

export function hideGuiguis() {
  let timelineL, timelineR;

  timelineL = anime.timeline({
    targets: "#guigui-bottom-left",
    easing: "easeOutExpo",
  });

  timelineR = anime
    .timeline({
      targets: "#guigui-bottom-right",
      easing: "easeOutExpo",
    })
    .add({
      scaleX: -1,
      duration: 0,
    });

  timelineL
    .add({
      translateY: 100,
      duration: 3000,
    });
  timelineR
    .add({
      translateY: 100,
      duration: 3000,
    });

}

