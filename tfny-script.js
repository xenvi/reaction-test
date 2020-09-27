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
            background: linear-gradient(-45deg, #2fa0cf, #4b87e0, #5577c2);
            background-size: 400% 400%;
            animation: tfny-fadein 0.2s linear, bgGradient 15s ease infinite;
            color: #fff;
            font-family:"Helvetica Neue",Helvetica,"Lucida Grande","Lucida Sans Unicode",Arial,Verdana,sans-serif;
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
            font-size: 3rem;
            text-transform: uppercase;
            letter-spacing: 3px;
            font-weight: normal;
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
        .tfny-icons {
            margin: 0 auto 15px auto;
            width: 75px;
            height: 75px;box-shadow: 0 0 0 0 rgba(255, 255, 255, 1);
        }
        .tfny-icons svg path {
            animation: pulse 2s ease infinite;
        }

        .tfny-axis path, .tfny-axis line {
        fill: none;
        stroke: #fff;
        stroke-width: 2px;
        }

        .tfny-graphArea { fill: rgba(255,255,255,0.4); }

        .tfny-graphLine {
            fill: none;
            stroke: #fff;
            stroke-width: 4px;
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
        // create icon
        let startIcon = document.createElement('div')
        startIcon.classList.add("tfny-icons");
        startIcon.innerHTML+=`<svg viewBox="0 0 20 20">
        <path fill="#fff" d="M15.94,10.179l-2.437-0.325l1.62-7.379c0.047-0.235-0.132-0.458-0.372-0.458H5.25c-0.241,0-0.42,0.223-0.373,0.458l1.634,7.376L4.06,10.179c-0.312,0.041-0.446,0.425-0.214,0.649l2.864,2.759l-0.724,3.947c-0.058,0.315,0.277,0.554,0.559,0.401l3.457-1.916l3.456,1.916c-0.419-0.238,0.56,0.439,0.56-0.401l-0.725-3.947l2.863-2.759C16.388,10.604,16.254,10.22,15.94,10.179M10.381,2.778h3.902l-1.536,6.977L12.036,9.66l-1.655-3.546V2.778z M5.717,2.778h3.903v3.335L7.965,9.66L7.268,9.753L5.717,2.778zM12.618,13.182c-0.092,0.088-0.134,0.217-0.11,0.343l0.615,3.356l-2.938-1.629c-0.057-0.03-0.122-0.048-0.184-0.048c-0.063,0-0.128,0.018-0.185,0.048l-2.938,1.629l0.616-3.356c0.022-0.126-0.019-0.255-0.11-0.343l-2.441-2.354l3.329-0.441c0.128-0.017,0.24-0.099,0.295-0.215l1.435-3.073l1.435,3.073c0.055,0.116,0.167,0.198,0.294,0.215l3.329,0.441L12.618,13.182z"></path>
        </svg>`;
        startContainer.appendChild(startIcon)
        // create title
        let h1 = document.createElement("h1");
        h1.classList.add("tfny-h1");
        h1.appendChild(document.createTextNode("Reaction Time Test"));
        startContainer.appendChild(h1);
        // create subtitle
        let h2 = document.createElement("h2");
        h2.classList.add("tfny-h2");
        h2.appendChild(document.createTextNode("When the red circle turns green, click it as fast as possible. Click anywhere to begin!"));
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
    let roundDataArr = [{'round': 0, 'data': 0}];

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
            // if round is 10, exit resultsPage and return average data
            let clickTextNode
            if (roundNumber < 9) {
                clickTextNode = "Click anywhere to continue";
            } else {
                clickTextNode = "Calculating results ...";
                setTimeout(endReactionTest, 5000)
            }
            let clickText = document.createElement("h2")
            clickText.classList.add("tfny-h2");
            clickText.appendChild(document.createTextNode(clickTextNode));
            resultPage.appendChild(clickText);
            // display graph
            let graphWrapper = document.createElement("div")
            graphWrapper.classList.add("tfny-graphWrapper");
            resultPage.appendChild(graphWrapper);
            // display round
            let roundText = document.createElement("h2")
            roundText.classList.add("tfny-roundText");
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
                displayGraph();
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
            if (roundNumber < 10) {
                resultPage.style.display = 'none';
                resultPage.parentNode.removeChild(resultPage);
                gameFunction(canvas);
            }
        })

        // functions
        function displayGraph() {
            var margin = {top: 20, right: 20, bottom: 30, left: 50},
                width = 575 - margin.left - margin.right,
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
            console.log(roundDataArr)
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

            // clear data values
            roundDataArr = 0;
            roundNumber = 0;

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
    startReactionTest(document.getElementById("tfny-canvas"))
}

loadReactionScript('https://d3js.org/d3.v5.min.js', callReactionTest);