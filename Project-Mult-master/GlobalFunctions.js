function getJSON() {
    return new Promise((suc, fail) => {
        fetch("questions.json").then(response => {
            try {
                //console.log(response);
                suc(response.json());
            } catch (e) {
                fail(e);
            }
        })
    });
}

async function getQuestionStart() {
    res = await getJSON(); //JS object with all the questions
}

function getQuestion() {
    let max = res.length;
    let tem = res[randomQuestion(max)];

    question = tem.question;
    answers[0] = tem.answers[0].answer;
    answers[1] = tem.answers[1].answer;
    answers[2] = tem.answers[2].answer;
    answers[3] = tem.answers[3].answer;
    correctAnswer = tem.answers[checkForCorrectAnswer(tem)].answer;

    printTest();
}

function checkForCorrectAnswer(tem) {
    for (let i=0; i<tem.answers.length; i++){

        if (tem.answers[i].correct === "t"){
            return i;
        }
    }
}

function randomQuestion(max) { //Podia n ser por brute force, melhorar
    let x = Math.floor(Math.random() * max);

    while (wasAlreadyAsked(x)){
        x = Math.floor(Math.random() * max);
    }

    return x;
}

function wasAlreadyAsked(num) {
    for (let i=0; i<alreadyAnswered.length; i++){
        if (num === alreadyAnswered[i]){
            return true;
        }
    }

    return false;
}

function printTest() {
    console.log("Question: " + question);

    for (let i=0; i<answers.length; i++){
        console.log("Answer" + i + ": " + answers[i]);
    }

    console.log("Correct Answer: " + correctAnswer);
}


function hitPointsManager(){
    if (hitPoints === 2){
        hitPoint1.disableBody(true, true);
    }
    else if (hitPoints === 1){
        hitPoint2.disableBody(true, true);
    }
    else if (hitPoints === 0){
        hitPoint3.disableBody(true, true);

    }
}

function scoreManager() {
    scoreText.setText("Score: " + score);
}

function timeManager() {
    let t = (Math.floor(performance.now()/1000)) -2;
    timeText.setText("Time: " + t);
}

function sumScore(x) {
    score += x;
}

function scoreCalculator() {

}

function versoAPAGAR() {
    let itemsArray = [];

    localStorage.setItem('items', JSON.stringify(itemsArray));
    let data = JSON.parse(localStorage.getItem('items'));
}

function addHighScore(nome, pont) {
    let data = JSON.parse(localStorage.getItem("highscores"));

    if (data.length<10){
        data.add({name: nome, score: pont})
    }
    else {
        for (let i=9; i>=0; i--){
            if (pont>data[i].score){
                data[i].name = nome;
                data[i].score = pont;
            }
        }
    }
}

function turnOff(){
    inv = false;
}
function loadHighScores() {

}

