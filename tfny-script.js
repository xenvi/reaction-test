function startReactionTest(canvas) {
    // load files
    let styles = `
        @keyframes tfny-fadein {
            from {
            opacity: 0;
            }
            to {
            opacity: 1;
            }
        }
        @keyframes tfny-fadeout {
            from {
            opacity: 1;
            }
            to {
            opacity: 0;
            }
        }
        .tfny-wrapper {
            position: absolute;
            z-index: 1;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            background: #4f9cd6;
            color: #fff;
            font-family:"Helvetica Neue",Helvetica,"Lucida Grande","Lucida Sans Unicode",Arial,Verdana,sans-serif;
            animation: 0.2s linear tfny-fadein;
        }
        .tfny-innerWrapper {
            position: absolute;
            z-index: 2;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            animation: 0.2s linear tfny-fadein;
        }
        .tfny-container {
            padding: 1rem;
        }
        .tfny-h1 {
            text-align: center;
            font-size: 4rem;
            margin: 0
        }
        .tfny-h2 {
            text-align: center;
            font-size: 1.3rem;
        }
        .tfny-gameText {
            color: #fff;
            text-align: center;
        }
        .tfny-circleRed {
            width: 200px;
            height: 200px;
            border-radius: 50%;
            background: #f20c0c;
            box-shadow: 0 2rem 1rem rgba(0, 0, 0, 0.3);
            cursor: pointer;
        }
        .tfny-circleGreen {
            width: 200px;
            height: 200px;
            border-radius: 50%;
            background: #0cf264;
            box-shadow: 0 2rem 1rem rgba(0, 0, 0, 0.3);
            cursor: pointer;
        }
    `
    let styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);

    // create app wrapper
    let appWrapper = document.createElement("section");
    appWrapper.classList.add("tfny-wrapper");
    canvas.appendChild(appWrapper);

    // create start page
    let startPage = document.createElement("section");
    startPage.classList.add("tfny-innerWrapper");
    startPage.style.cursor = "pointer";

        // create start page container
        let startContainer = document.createElement("div");
        startContainer.classList.add("tfny-container");
        startPage.appendChild(startContainer);
        // create title
        let h1 = document.createElement("h1");
        h1.classList.add("tfny-h1");
        h1.appendChild(document.createTextNode("Reaction Time Test"));
        startContainer.appendChild(h1);
        // create subtitle
        let h2 = document.createElement("h2");
        h2.classList.add("tfny-h2");
        h2.appendChild(document.createTextNode("When the red circle turns green, click/tap it as fast as possible. Click anywhere to begin!"));
        startContainer.appendChild(h2);

    // append content to wrapper
    appWrapper.appendChild(startPage);
    
    // on click of start page, start game
    startPage.addEventListener('click', () => {
        startPage.parentNode.removeChild(startPage);
        gameFunction(canvas);
    })

    // set variables
    let roundNumber = 0;
    let roundDataArr = [];

    function gameFunction(canvas) {
        // set variables
        let startTime;
        let interval;
        let finalRoundTime = 0;

        // create game canvas
        let gamePage = document.createElement("section");
        gamePage.classList.add("tfny-innerWrapper");
    
            // create text
            let gameText = document.createElement('h2');
            gameText.classList.add("tfny-gameText");
            gameText.appendChild(document.createTextNode("Wait for the circle to turn green..."));
            gamePage.appendChild(gameText);
            // create game page container
            let gameContainer = document.createElement("div");
            gameContainer.classList.add("tfny-container");
            gamePage.appendChild(gameContainer);
            // create circle
            let circle = document.createElement('div');
            circle.classList.add("tfny-circleRed");
            gameContainer.appendChild(circle);
        
        // create error canvas when click too fast
        let errorPage = document.createElement("section");
        errorPage.classList.add("tfny-innerWrapper");
        errorPage.style.cursor = "pointer";

            // create title
            let h1 = document.createElement("h1");
            h1.classList.add("tfny-h1");
            h1.appendChild(document.createTextNode("Oops! Too soon."));
            errorPage.appendChild(h1);
            // create subtitle
            let h2 = document.createElement("h2");
            h2.classList.add("tfny-h2");
            h2.appendChild(document.createTextNode("Click to try again."));
            errorPage.appendChild(h2);
    
        // create results canvas on successful click
        let resultPage = document.createElement("section");
        resultPage.classList.add("tfny-innerWrapper");
        resultPage.style.cursor = "pointer";

            // create time result
            let timeText = document.createElement("h1")
            timeText.classList.add("tfny-timeText");
            resultPage.appendChild(timeText);
            // create subtitle
            let clickTextNode
            if (roundNumber == 10) {
                clickTextNode = "Calculating results ..."
            } else {
                clickTextNode = "Click anywhere to continue"
            }
            let clickText = document.createElement("h1")
            clickText.classList.add("tfny-h2");
            clickText.appendChild(document.createTextNode(clickTextNode));
            resultPage.appendChild(clickText);
            // display graph
            function displayGraph() {
                d3.select(resultPage).append('svg')
                .attr('height', 300)
                .attr('width', 800)
                .selectAll('rect')
                    .data(roundDataArr)
                    .enter()
                    .append('rect')
                    .attr('y', function (d, i) { return i * 40 })
                    .attr('height', 35)
                    .attr('x', 0)
                    .attr('width', function (d) { return d*100})
                    .style('fill', 'steelblue');
            }
            displayGraph()
            // display round
            let roundText = document.createElement("h2")
            roundText.classList.add("tfny-roundText");
            resultPage.appendChild(roundText);

        // append content to wrapper
        appWrapper.appendChild(gamePage);
        gamePage.style.display = 'flex';
        
        // create button red to green timer
        var rand = Math.floor(Math.random() * 3000) + 2000
        function changeButton() {
            circle.classList.add("tfny-circleGreen");
            circle.classList.remove("tfny-circleRed");
            startTimer();
        }
        circleTimer = setTimeout(changeButton, rand);

       // handle circle click
       circle.addEventListener('click', () => {
           if (circle.classList.contains('tfny-circleRed')) {
                appWrapper.appendChild(errorPage);
                errorPage.style.display = 'flex';
                gamePage.parentNode.removeChild(gamePage);
                clearTimeout(circleTimer)
           } else if (circle.classList.contains('tfny-circleGreen')) {
                appWrapper.appendChild(resultPage);
                resultPage.style.display = 'flex';
                gamePage.parentNode.removeChild(gamePage);
                stopTimer();
                currentRound();
            }
       })

       // on error page click, restart game
       errorPage.addEventListener('click', () => {
            errorPage.style.display = 'none';
            errorPage.parentNode.removeChild(errorPage);
            gameFunction(canvas);
        })
        
        // on result page click, continue game
       resultPage.addEventListener('click', () => {
            resultPage.style.display = 'none';
            resultPage.parentNode.removeChild(resultPage);
            gameFunction(canvas);
        })

        function startTimer() {
            startTime = Date.now();
            interval = setInterval(function(){
                let currentTime = Date.now() - startTime
                updateDisplay(currentTime);
            });
        }
        function stopTimer(){
            timeText.appendChild(document.createTextNode(finalRoundTime + " ms"));
            roundDataArr.push(finalRoundTime);
            clearInterval(interval);
        }
        function updateDisplay(currentTime){
            finalRoundTime = currentTime;
        }
        function currentRound() {
            if (roundNumber >= 10) {
                roundNumber = 10;
            } else {
                roundNumber++;
            }
            roundText.appendChild(document.createTextNode("Round " + roundNumber + " out of 10"));
        }
    }
}

function loadReactionScript(url, callback) {
    var head = document.head;
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    script.onreadystatechange = callback;
    script.onload = callback;
    head.appendChild(script);
    console.log("loaded")
}
var callReactionTest = function() {
    // call start test function on button click
    const startButton = document.getElementById("start");
    startButton.addEventListener('click', () => startReactionTest(document.getElementById("tfny-canvas")))
}

loadReactionScript('https://d3js.org/d3.v5.min.js', callReactionTest);