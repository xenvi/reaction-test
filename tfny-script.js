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
            cursor: pointer;
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
        .tfny-gameWrapper {
            position: absolute;
            z-index: 1;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            display: none;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            background: #4f9cd6;
            color: #fff;
            font-family:"Helvetica Neue",Helvetica,"Lucida Grande","Lucida Sans Unicode",Arial,Verdana,sans-serif;
            animation: 0.2s linear tfny-fadein;
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
        .tfny-errorWrapper {
            position: absolute;
            z-index: 1;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            display: none;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            background: #4f9cd6;
            color: #fff;
            cursor: pointer;
            font-family:"Helvetica Neue",Helvetica,"Lucida Grande","Lucida Sans Unicode",Arial,Verdana,sans-serif;
            animation: 0.2s linear tfny-fadein;
        }
    `
    let styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);

    // create start page
    let startPage = document.createElement("section");
    startPage.classList.add("tfny-wrapper");

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

    // append content to canvas
    canvas.appendChild(startPage);
    
    // on click of start page, start game
    startPage.addEventListener('click', () => {
        // startPage.style.animation = '0.2s linear fadeout';
        gameFunction(canvas);
    })

    function gameFunction(canvas) {
        // set variables
        let roundNumber = 0;
        let roundDataArr = [];

        // create game canvas
        let gamePage = document.createElement("section");
        gamePage.classList.add("tfny-gameWrapper");
    
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
        errorPage.classList.add("tfny-errorWrapper");

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
    
        // append content to canvas
        canvas.appendChild(gamePage);
        gamePage.style.display = 'flex';
        
        // create timer
        var rand = Math.floor(Math.random() * 3000) + 2000  // 2-3 secs
        function changeButton() {
            circle.classList.add("tfny-circleGreen");
            circle.classList.remove("tfny-circleRed");
        }
        setTimeout(changeButton, rand);

       // handle circle click
       circle.addEventListener('click', () => {
           if (circle.classList.contains('tfny-circleRed')) {
                canvas.appendChild(errorPage);
                errorPage.style.display = 'flex';
           //} else if (circle.classList.contains('tfny-circleGreen')) {
             //   canvas.appendChild(resultPage);
               // resultPage.style.display = 'flex';
            }
       })

       // on error page click, restart game
       circle.addEventListener('click', () => {
        if (circle.classList.contains('tfny-circleRed')) {
             canvas.appendChild(errorPage);
             errorPage.style.display = 'flex';
        //} else if (circle.classList.contains('tfny-circleGreen')) {
          //   canvas.appendChild(resultPage);
            // resultPage.style.display = 'flex';
         }
    })
    }
}

// call start test function on button click
const startButton = document.getElementById("start");
startButton.addEventListener('click', () => startReactionTest(document.getElementById("tfny-canvas")))