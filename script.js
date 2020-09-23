var styles = `
    .startPage {
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
        font-family:"Helvetica Neue",Helvetica,"Lucida Grande","Lucida Sans Unicode",Arial,Verdana,sans-serif
    }
    .startContainer {
        padding: 1rem;
    }
    h1 {
        text-align: center;
        font-size: 4rem;
        margin: 0
    }
    h2 {
        text-align: center;
        font-size: 1.3rem;
    }
`

var styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

function startReactionTest(wrapper) {
    // create start page
    var startPage = document.createElement("section");
    startPage.classList.add("startPage");

        // create start page wrapper
        var startContainer = document.createElement("div");
        startContainer.classList.add("startContainer");
        startPage.appendChild(startContainer);
        // create title
        var h1 = document.createElement("h1");
        h1.appendChild(document.createTextNode("Reaction Time Test"));
        startContainer.appendChild(h1);
        // create subtitle
        var h2 = document.createElement("h2");
        h2.appendChild(document.createTextNode("When the red circle turns green, click/tap it as fast as possible. Click anywhere to begin!"));
        startContainer.appendChild(h2);

    // append content to wrapper
    wrapper.appendChild(startPage);
}

// call start test function on button click
const startButton = document.getElementById("start");
startButton.addEventListener('click', () => startReactionTest(document.getElementById("reactionTestWrapper")))