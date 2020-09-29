function startReactionTest(canvas, userPickedRound) {
    // load files - remove box-sizing on deliver
    let styles = `
        body, html, * {
            box-sizing: border-box;
        }
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
        @keyframes bgGradient {
            0% {
                background-position: 0% 50%;
            }
            50% {
                background-position: 100% 50%;
            }
            100% {
                background-position: 0% 50%;
            }
        }
        @keyframes pulse {
            0% {
                transform: scale(0.95);
                box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.7);
            }
            
            70% {
                transform: scale(1);
                box-shadow: 0 0 0 10px rgba(255, 255, 255, 0);
            }
            
            100% {
                transform: scale(0.95);
                box-shadow: 0 0 0 0 rgba(255, 255, 255, 0);
            }
        }
        @keyframes blink {
            0% {
              opacity: .2;
            }
            20% {
              opacity: 1;
            }
            100% {
              opacity: .2;
            }
        }
        .tfny-container {
            position: absolute;
            z-index: 1;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            background: linear-gradient(-45deg, #395799, #467ce0, #41b3e0, #54dece);
            background-size: 400% 400%;
            animation: tfny-fadein 0.2s linear, bgGradient 20s ease infinite;
            color: #fff;
            font-family:"Helvetica Neue",Helvetica,"Lucida Grande","Lucida Sans Unicode",Arial,Verdana,sans-serif;
        }
        .tfny-colWrapper {
            position: absolute;
            z-index: 2;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            padding: 1rem;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            animation: 0.2s linear tfny-fadein;
        }
        .tfny-rowWrapper {
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 1rem 0;
            animation: 0.2s linear tfny-fadein;
        }
        .tfny-continueWrapper {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            margin-left: 2rem;
        }
        .tfny-graphWrapper {
            margin-right: 2rem;
        }
        .tfny-h1 {
            text-align: center;
            font-size: 3rem;
            text-transform: uppercase;
            letter-spacing: 3px;
            font-weight: normal;
            margin: 0 0 1rem 0;
            text-shadow: 0 0.5rem 0.3rem rgba(0,0,0,0.2);
        }
        .tfny-h1-leftAlign {
            text-align: left;
            font-size: 3rem;
            text-transform: uppercase;
            letter-spacing: 3px;
            font-weight: normal;
            margin: 0 0 1rem 0;
            text-shadow: 0 0.5rem 0.3rem rgba(0,0,0,0.2);
        }
        .tfny-h2 {
            text-align: center;
            font-size: 1.3rem;
            text-shadow: 0 0.3rem 0.1rem rgba(0,0,0,0.2);
            margin-block-start: 0;
            margin-block-end: 0;
        }
        .tfny-h2-red {
            color: #f20c0c;
        }
        .tfny-h2-green {
            color: #0cf264;
        }
        .tfny-gameText {
            color: #fff;
            font-size: 2rem;
            text-align: center;
            text-transform: uppercase;
            letter-spacing: 3px;
            text-shadow: 0 0.3rem 0.1rem rgba(0,0,0,0.2);
        }
        .tfny-gameText span {
            font-family: georgia;
            animation: 1.4s both infinite blink;
        }
        .tfny-gameText span:nth-child(2) {
            animation-delay: .2s;
        }
        .tfny-gameText span:nth-child(3) {
            animation-delay: .4s;
        }
        .tfny-circleRed {
            max-width: 300px;
            max-height: 300px;
            width: 100%;
            height: 100%;
            border-radius: 50%;
            box-shadow: 0px 0px 0px 10px rgba(242, 12, 12,0.5);
            cursor: pointer;
            background: #f20c0c;
            transition: 0.2s ease-in-out;
        }
        .tfny-circleRed:hover {
        }
        .tfny-circleGreen {
            max-width: 300px;
            max-height: 300px;
            width: 100%;
            height: 100%;
            border-radius: 50%;
            box-shadow: 0px 0px 0px 10px rgba(12, 242, 100, 0.5);
            cursor: pointer;
            background: #0cf264;
            transition: 0.2s ease-in-out;
        }
        .tfny-circleGreen:hover {
        }
        .tfny-icons {
            margin: 0 auto 15px auto;
            width: 75px;
            height: 75px;
        }
        .tfny-icons svg path {
            box-shadow: 0 0 0 0 rgba(255, 255, 255, 1);
            //animation: pulse 2s ease infinite;
        }
        .tfny-axis path, .tfny-axis line {
            fill: none;
            stroke: #fff;
            stroke-width: 2px;
        }
        .tfny-graphArea {
            fill: rgba(255,255,255,0.4);
        }
        .tfny-graphLine {
            fill: none;
            stroke: #fff;
            stroke-width: 4px;
        }
        .tfny-count {
            font-size: 10rem;
            border: 1rem solid #fff;
            color: #fff;
            border-radius: 50%;
            padding: 0 3rem;
            margin: 1rem 0;
        }
    `
    let styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);

    // create app wrapper
    let appWrapper = document.createElement("section");
    appWrapper.classList.add("tfny-container");
    canvas.appendChild(appWrapper);

    // create start page
    let startPage = document.createElement("section");
    startPage.classList.add("tfny-colWrapper");
    startPage.style.cursor = "pointer";

        // create icon
        let startIcon = document.createElement('div')
        startIcon.classList.add("tfny-icons");
        startIcon.innerHTML+=`<svg viewBox="0 0 20 20">
        <path fill="#fff" d="M15.94,10.179l-2.437-0.325l1.62-7.379c0.047-0.235-0.132-0.458-0.372-0.458H5.25c-0.241,0-0.42,0.223-0.373,0.458l1.634,7.376L4.06,10.179c-0.312,0.041-0.446,0.425-0.214,0.649l2.864,2.759l-0.724,3.947c-0.058,0.315,0.277,0.554,0.559,0.401l3.457-1.916l3.456,1.916c-0.419-0.238,0.56,0.439,0.56-0.401l-0.725-3.947l2.863-2.759C16.388,10.604,16.254,10.22,15.94,10.179M10.381,2.778h3.902l-1.536,6.977L12.036,9.66l-1.655-3.546V2.778z M5.717,2.778h3.903v3.335L7.965,9.66L7.268,9.753L5.717,2.778zM12.618,13.182c-0.092,0.088-0.134,0.217-0.11,0.343l0.615,3.356l-2.938-1.629c-0.057-0.03-0.122-0.048-0.184-0.048c-0.063,0-0.128,0.018-0.185,0.048l-2.938,1.629l0.616-3.356c0.022-0.126-0.019-0.255-0.11-0.343l-2.441-2.354l3.329-0.441c0.128-0.017,0.24-0.099,0.295-0.215l1.435-3.073l1.435,3.073c0.055,0.116,0.167,0.198,0.294,0.215l3.329,0.441L12.618,13.182z"></path>
        <animateTransform attributeType="XML" attributeName="transform" type="scale"       values="1;1.25;1" additive="sum" begin="0s" dur="2s" repeatCount="indefinite"/>
        </svg>`;
        startPage.appendChild(startIcon)
        // create title
        let h1 = document.createElement("h1");
        h1.classList.add("tfny-h1");
        h1.appendChild(document.createTextNode("Reaction Time Test"));
        startPage.appendChild(h1);
        // create subtitle
        let h2 = document.createElement("h2");
        h2.classList.add("tfny-h2");
        h2.appendChild(document.createTextNode("When the "));
        let red = document.createElement('span');
        red.classList.add("tfny-h2-red");
        red.appendChild(document.createTextNode("red"));
        h2.appendChild(red);
        h2.appendChild(document.createTextNode(" circle turns "));
        let green = document.createElement('span');
        green.classList.add("tfny-h2-green");
        green.appendChild(document.createTextNode("green"));
        h2.appendChild(green);
        h2.appendChild(document.createTextNode(", click it as fast as possible. Click anywhere to begin!"));
        startPage.appendChild(h2);

    // append content to wrapper
    appWrapper.appendChild(startPage);
    
    // on click of start page, start game
    startPage.addEventListener('click', () => {
        startPage.parentNode.removeChild(startPage);
        gameFunction(canvas);
    })

    // set variables
    let roundNumber = 0;
    let roundDataArr = [{'round': 0, 'data': 0}];

    function gameFunction(canvas) {
        // set variables
        let startTime;
        let interval;
        let finalRoundTime = 0;

        // create game canvas
        let gamePage = document.createElement("section");
        gamePage.classList.add("tfny-colWrapper");
    
            // create loading text
            let gameText = document.createElement('p');
            gameText.classList.add("tfny-gameText");
            gameText.appendChild(document.createTextNode("Wait"));
            let span1 = document.createElement('span');
            span1.appendChild(document.createTextNode("."));
            let span2 = document.createElement('span');
            span2.appendChild(document.createTextNode("."));
            let span3 = document.createElement('span');
            span3.appendChild(document.createTextNode("."));
            gameText.appendChild(span1);
            gameText.appendChild(span2);
            gameText.appendChild(span3);
            gamePage.appendChild(gameText);
            // create circle
            let circle = document.createElement('div');
            circle.classList.add("tfny-circleRed");
            gamePage.appendChild(circle);
        
        // create error canvas when click too fast
        let errorPage = document.createElement("section");
        errorPage.classList.add("tfny-colWrapper");
        errorPage.style.cursor = "pointer";

            // create icon
            let errorIcon = document.createElement('div')
            errorIcon.classList.add("tfny-icons");
            errorIcon.innerHTML+=`<svg viewBox="0 0 20 20">
				<path fill="#fff" d="M18.344,16.174l-7.98-12.856c-0.172-0.288-0.586-0.288-0.758,0L1.627,16.217c0.339-0.543-0.603,0.668,0.384,0.682h15.991C18.893,16.891,18.167,15.961,18.344,16.174 M2.789,16.008l7.196-11.6l7.224,11.6H2.789z M10.455,7.552v3.561c0,0.244-0.199,0.445-0.443,0.445s-0.443-0.201-0.443-0.445V7.552c0-0.245,0.199-0.445,0.443-0.445S10.455,7.307,10.455,7.552M10.012,12.439c-0.733,0-1.33,0.6-1.33,1.336s0.597,1.336,1.33,1.336c0.734,0,1.33-0.6,1.33-1.336S10.746,12.439,10.012,12.439M10.012,14.221c-0.244,0-0.443-0.199-0.443-0.445c0-0.244,0.199-0.445,0.443-0.445s0.443,0.201,0.443,0.445C10.455,14.021,10.256,14.221,10.012,14.221"></path>
                <animateTransform attributeType="XML" attributeName="transform" type="scale"       values="1;1.25;1" additive="sum" begin="0s" dur="2s" repeatCount="indefinite"/>
                </svg>`;
                errorPage.appendChild(errorIcon)
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
        resultPage.classList.add("tfny-colWrapper");
        resultPage.style.cursor = "pointer";

            // create time result
            let timeText = document.createElement("h1");
            timeText.classList.add("tfny-h1");
            resultPage.appendChild(timeText);
            // create row wrapper for graph + countdown
            let resultRow = document.createElement('section');
            resultRow.classList.add("tfny-rowWrapper");
            // display graph
            let graphWrapper = document.createElement("div")
            graphWrapper.classList.add("tfny-graphWrapper");
            resultRow.appendChild(graphWrapper);
            // create countdown - if round is last, exit resultsPage and return average data
            let continueWrapper = document.createElement('div')
            continueWrapper.classList.add("tfny-continueWrapper")
            let countdownText = document.createElement("span");
            if (roundNumber < userPickedRound - 1) {
                let continueText = document.createElement('h2')
                continueText.classList.add("tfny-h2");
                continueText.appendChild(document.createTextNode('Next round in ...'));
                continueWrapper.appendChild(continueText);

                countdownText.classList.add("tfny-count");
                countdownText.appendChild(document.createTextNode('3'));
            } else {
                countdownText.classList.add("tfny-h1-leftAlign");
                countdownText.appendChild(document.createTextNode('Calculating'));
                countdownText.appendChild(document.createElement("br"));
                countdownText.appendChild(document.createTextNode('results ...'));
                setTimeout(endReactionTest, 3000)
            }
            continueWrapper.appendChild(countdownText);
            resultRow.appendChild(continueWrapper);
            resultPage.appendChild(resultRow);
            // display round
            let roundText = document.createElement("h2")
            roundText.classList.add("tfny-h2");
            resultPage.appendChild(roundText);
            

        // append content to wrapper
        appWrapper.appendChild(gamePage);
        gamePage.style.display = 'flex';
        
        // create button red to green timer
        var rand = Math.floor(Math.random() * 2000) + 2000
        function changeButton() {
            circle.classList.add("tfny-circleGreen");
            circle.classList.remove("tfny-circleRed");
            startTimer();
            gameText.innerText = "Click !"
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
                currentRound();
                stopTimer();
                if (roundNumber < userPickedRound) countdown();
                displayGraph();
            }
       })

       // on error page click, restart game
       errorPage.addEventListener('click', () => {
            errorPage.style.display = 'none';
            errorPage.parentNode.removeChild(errorPage);
            gameFunction(canvas);
        })

        // functions
        function displayGraph() {
            var margin = {top: 20, right: 20, bottom: 30, left: 50},
                width = 450 - margin.left - margin.right,
                height = 350 - margin.top - margin.bottom;
            
            var x = d3.scaleLinear()
                .domain([0, d3.max(roundDataArr, function(d) { return d.round; })])
                .range([0, width]);
            
            var y = d3.scaleLinear()
                .domain([0, d3.max(roundDataArr, function(d) { return d.data; })])
                .range([height, 0]);
            
            var xAxis = d3.axisBottom()
                .scale(x).tickSize(0).tickValues([]);
            
            var yAxis = d3.axisLeft()
                .scale(y).tickSize(0).tickValues([]);
            
            var area = d3.area()
                .x(function(d) { return x(d.round); })
                .y0(height)
                .y1(function(d) { return y(d.data); });
            
            var valueline = d3.line()
                .x(function(d) { return x(d.round); })
                .y(function(d) { return y(d.data); });
            
            var svg = d3.select(".tfny-graphWrapper")
                .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
            
            svg.append("path")
                .datum(roundDataArr)
                .attr("class", "tfny-graphArea")
                .attr("d", area);
            
            svg.append("path")
                .datum(roundDataArr)
                .attr("class", "tfny-graphLine")
                .attr("d", valueline);
            
            svg.append("g")
                .attr("class", "tfny-x tfny-axis")
                .attr("transform", "translate(0," + height + ")")
                .call(xAxis);
            
            svg.append("g")
                .attr("class", "tfny-y tfny-axis")
                .call(yAxis);
        }
        function startTimer() {
            startTime = Date.now();
            interval = setInterval(function(){
                let currentTime = Date.now() - startTime
                updateDisplay(currentTime);
            });
        }
        function stopTimer(){
            timeText.appendChild(document.createTextNode(finalRoundTime + " ms"));
            roundDataArr = [...roundDataArr, {'round': roundNumber, 'data': finalRoundTime}]
            clearInterval(interval);
        }
        function updateDisplay(currentTime){
            finalRoundTime = currentTime;
        }
        function countdown() {
            var timeRemaining = 2;
            var timer = setInterval(function(){
                if(timeRemaining < 0){
                    clearInterval(timer);
                    document.querySelector(".tfny-count").innerHTML = 0;
                    resultPage.style.display = 'none';
                    resultPage.parentNode.removeChild(resultPage);
                    gameFunction(canvas);
                } else {
                    document.querySelector(".tfny-count").innerHTML = timeRemaining;
                    timeRemaining -= 1;
                }
            }, 1000);
        }
        function currentRound() {
            if (roundNumber >= userPickedRound) {
                roundNumber = userPickedRound;
            } else {
                roundNumber++;
            }
            roundText.appendChild(document.createTextNode("Round " + roundNumber + " out of " + userPickedRound));
        }
        function endReactionTest() {
            // calc avg
            let newDataArr = [];
            let total = 0;
            let avg = 0;
            roundDataArr.forEach((item) => {
                newDataArr.push(item.data);
            });
            newDataArr.forEach((item) => {
                total += item
            })
            avg = total / newDataArr.length
            console.log('avg', avg)

            return avg;
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
}
let callReactionTest = function() {
    let userPickedRound = 10;
    startReactionTest(document.getElementById("tfny-canvas"), userPickedRound)
}

loadReactionScript('https://d3js.org/d3.v5.min.js', callReactionTest);