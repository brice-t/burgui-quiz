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










const maxScore = 25;

let pagesOrder = [
        'page-startup',
        'page-score'
        ];
var currentPageIndex = 0,
        currentScore = { 'ketchup' : 0 , 'mayo' : 0};

function currentPageIs(pageId) {
    return (pagesOrder[currentPageIndex] === pageId);
}



function incrScore(incrVal, team) {
    var newScore = currentScore[team] + incrVal;
    newScore = Math.max(0, newScore);
    newScore = Math.min(newScore, maxScore);

    currentScore[team] = newScore;

    updateScoreMarkup(team);

    setFillLeft();
}

function updateScoreMarkup(team) {
    let scoreNumberNode = document.getElementById('score-number-' + team);
    scoreNumberNode.innerHTML = currentScore[team].toLocaleString('fr-FR', {
            minimumIntegerDigits: 2,
            useGrouping: false
        });
    fillImg('beer-' + team, currentScore[team] / maxScore * 100);
}

function setFillLeft() {
    if(currentPageIs('page-score')) {
        let fillNode = null;
        for(const team in currentScore) {
            fillNode = document.querySelector('#beer-' + team + ' img.fill');
            fillNode.style.left = 'calc(' + (-fillNode.offsetWidth + 'px') + ' + 25%';
        }
    }
}


(function() {
    // init currentPageIndex according to hash
    if(window.location.hash) {
       currentPageIndex = Math.max(0, pagesOrder.indexOf(window.location.hash.replace('#', '')));
    }

    window.addEventListener("resize", setFillLeft);
    window.addEventListener("hashchange", setFillLeft);


    document.addEventListener("keydown", checkKey);
    function checkKey(e) {
        e = e || window.event;

        if (e.keyCode == '38') {
            // up arrow
        }
        else if (e.keyCode == '40') {
            // down arrow
        }
        else if (e.keyCode == '37') {
            // left arrow
            var nextPageIndex = Math.max(currentPageIndex-1, 0);
            currentPageIndex = nextPageIndex;
            window.location.hash = pagesOrder[currentPageIndex];
            setFillLeft();
        }
        else if (e.keyCode == '39') {
            // right arrow
            var nextPageIndex = Math.min(currentPageIndex+1, pagesOrder.length - 1);
            currentPageIndex = nextPageIndex;
            window.location.hash = pagesOrder[currentPageIndex];
            setFillLeft();
        }
        else if (e.keyCode == '65') {
            // letter A
            if(currentPageIs('page-score')) {
                incrScore(-1, 'ketchup');
            }
        }
        else if (e.keyCode == '69') {
            // letter E
            if(currentPageIs('page-score')) {
                incrScore(1, 'ketchup');
            }
        }
        else if (e.keyCode == '87') {
            // letter W
            if(currentPageIs('page-score')) {
                incrScore(-1, 'mayo');
            }
        }
        else if (e.keyCode == '67') {
            // letter W
            if(currentPageIs('page-score')) {
                incrScore(1, 'mayo');
            }
        }
    }
})();

