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
            displayRoundGraph()
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
        function displayRoundGraph() {
            // set the dimensions and margins of the graph
            var margin = {top: 10, right: 30, bottom: 30, left: 50},
            width = 360 - margin.left - margin.right,
            height = 300 - margin.top - margin.bottom;

            // append the svg object to the body of the page
            var svg = d3.select(resultPage)
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");

            //Read the data
            roundDataArr.forEach(function(d) {
                return { round : d.round, data : d.data } },
            // Now I can use this dataset:
            function(data) {

            // Add X axis 
            var x = d3.scaleLinear()
            .domain(d3.extent(data, function(d) { return d.round; }))
            .range([ 0, width ]);
            svg.append("g")
            .attr("transform", "translate(0," + (height+5) + ")")
            .call(d3.axisBottom(x).ticks(5).tickSizeOuter(0));

            // Add Y axis
            var y = d3.scaleLinear()
            .domain( d3.extent(data, function(d) { return +d.data; }) )
            .range([ height, 0 ]);
            svg.append("g")
            .attr("transform", "translate(-5,0)")
            .call(d3.axisLeft(y).tickSizeOuter(0));

            // Add the area
            svg.append("path")
            .datum(data)
            .attr("fill", "#69b3a2")
            .attr("fill-opacity", .3)
            .attr("stroke", "none")
            .attr("d", d3.area()
                .x(function(d) { return x(d.round) })
                .y0( height )
                .y1(function(d) { return y(d.data) })
                )

            // Add the line
            svg.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", "#69b3a2")
            .attr("stroke-width", 4)
            .attr("d", d3.line()
                .x(function(d) { return x(d.round) })
                .y(function(d) { return y(d.data) })
                )

            // Add the line
            svg.selectAll("myCircles")
            .data(data)
            .enter()
            .append("circle")
                .attr("fill", "red")
                .attr("stroke", "none")
                .attr("cx", function(d) { return x(d.round) })
                .attr("cy", function(d) { return y(d.data) })
                .attr("r", 3)

            })
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
            roundDataArr.push({'round': roundNumber, 'data': finalRoundTime});
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
    startReactionTest(document.getElementById("tfny-canvas"))
}

loadReactionScript('https://d3js.org/d3.v5.min.js', callReactionTest);