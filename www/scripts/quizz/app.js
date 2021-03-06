// Globals

// Login variable

let sectionStart = document.getElementById('accueilQuizz');
let sectionPlay = document.getElementById('gameQuizz');
let sectionReponse = document.getElementById('reponseQuizz');
let sectionScore = document.getElementById('scoreQuizz');
let allSectionQuestion = sectionPlay.querySelectorAll('div');

let buttonStart = sectionStart.querySelector('button');
let numberQuestion = sectionPlay.querySelector('h2 span');
let timer = document.getElementById('timer');

let name = document.getElementById('name');

let sectionPlayers = sectionStart.querySelector('.listPlayers')

// Question text
let containerText = sectionPlay.querySelector('.text');
let h2Text = containerText.querySelector('h3');
let inputText = containerText.querySelector('input');

// Question Petit bac
let containerPetitBac = sectionPlay.querySelector('.petitBac');
let letter = containerPetitBac.querySelector('h3');
let themeLabel = containerPetitBac.querySelectorAll('label');
let themeInput = containerPetitBac.querySelectorAll('input');

// SectionResponse 
let beforeResponse = sectionReponse.querySelector('.beforeResult');
let response = sectionReponse.querySelector('.result');
let allSectionResponse = response.querySelectorAll('.container');
let buttonResponse = beforeResponse.querySelector('button');
let responseName = response.querySelector('.n');
let buttonValidate = response.querySelector('.validateButton');
let nextAnswer = response.querySelector('.next');

// SectionScore 
let containerScore = sectionScore.querySelector('.listScore');

// Response text
let containerTextResponse = response.querySelector('.text');
let responseTextQ = containerTextResponse.querySelector('.q');
let responseTextR = containerTextResponse.querySelector('.r');
let responseTextRu = containerTextResponse.querySelector('.rU');

// Response Petit bac
let containerPetitBacResponse = response.querySelector('.petitBac');
let letterResponse= containerPetitBacResponse.querySelector('.l');
let themeLabelResponse = containerPetitBacResponse.querySelectorAll('label');
let themeInputResponse = containerPetitBacResponse.querySelectorAll('input');

let numberResponse = response.querySelector('#questionResult span');
let nameResponse = response.querySelector('#nameResult')

const quizz = JSON.parse(dataQuizz);

// Set variables 

let actualQuestion = 0;
let actualResponse = 0;
let actualPlayer = 0;
let numberPlayers = 0;
let dataResponse = [name.textContent];

let allResponse = [];
let allScore = [];
let scoreWithPlayers = [];

// Quizz functions

// Show players names
let connected = (nameData) => {
    sectionPlayers.innerHTML += `<h4>- ${nameData}</h4>`
}

// First question
let startQuizz = () => {
    sectionStart.classList.add('hidden');
    sectionPlay.classList.remove('hidden');

    numberQuestion.textContent = '1';

    if(quizz.questions[actualQuestion].type == 1){
        textQuestion(quizz.questions[actualQuestion]);
    }
    else if(quizz.questions[actualQuestion].type == 2){
        petitBacQuestion(quizz.questions[actualQuestion]);
    }
    downTimer(20);
};

// First response
let startDisplayResponse = () => {
    beforeResponse.classList.add('hidden');
    response.classList.remove('hidden');
    numberPlayers = allResponse.length;
    for(let i = 0; i<allResponse.length; i++){
        allScore.push(0);
    }
    if(quizz.questions[actualResponse].type == 1){
        textResponse(quizz.questions[actualResponse])
    }
    else if(quizz.questions[actualResponse].type == 2){
        petitBacResponse(quizz.questions[actualResponse])
    }
};

// Init Score
let showScore = () => {
    sectionReponse.classList.add('hidden');
    sectionScore.classList.remove('hidden');
    triScore();
}

// Winner first
let triScore = () => {
    scoreWithPlayers = [];
    for(let i = 0; i < allScore.length; i++){
        scoreWithPlayers.push({name: allResponse[i][0], score: allScore[i]})
    };
    displayScore(scoreWithPlayers.sort(function (a, b) {
        return b.score - a.score;
    }));
}

// Show all score
let displayScore = (data) => {
    containerScore.innerHTML = '';    
    for(let i = 0; i < data.length; i++){
        containerScore.innerHTML += `
            <div class='oneScore'>${i + 1}${i == 0 ? 'er' : '??me'} : <span>${data[i].name}</span> avec <span>${data[i].score}</span> ${data[i].score < 2 ? 'point' : 'points'}</div>
        `;
    }
}

// Timer before change question
let downTimer = (x) => {
    if(x > 0){
        timer.textContent = x;
        setTimeout(function() { downTimer(x - 1); }, 1000);
    }
    else {
        pushReponse(quizz.questions[actualQuestion].type);
        actualQuestion ++;
        if(actualQuestion == quizz.questions.length){
            socket.emit('displayResult', dataResponse);
            startResponse();
        }
        else {
            numberQuestion.textContent = actualQuestion + 1;
            if(quizz.questions[actualQuestion].type == 1){
                textQuestion(quizz.questions[actualQuestion]);
            }
            else if(quizz.questions[actualQuestion].type == 2){
                petitBacQuestion(quizz.questions[actualQuestion]);
            }
            downTimer(20);
        }
    }
}

// End quizz send all response
let pushReponse = (type) => {
    if(type == 1){
        dataResponse.push(inputText.value)
    }
    else if(type == 2){
        let petitBacReponse = [];
        for(let i = 0; i < 5; i++){
            petitBacReponse.push(themeInput[i].value);
        }
        dataResponse.push(petitBacReponse);
    }
}

// Reset questions containers
let hiddenContainers = () => {
    allSectionQuestion.forEach(question => {
        question.classList.add('hidden');
    })
}

// Reset response containers
let hiddenContainersResponse = () => {
    allSectionResponse.forEach(response => {
        response.classList.add('hidden');
    })
}

// Function Questions
// Question text
let textQuestion = (q) => {
    hiddenContainers();
    containerText.classList.remove('hidden');
    h2Text.textContent = q.question;
    inputText.value = '';
    inputText.focus();
}

// Question petit bac
let petitBacQuestion = (q) => {
    hiddenContainers();
    containerPetitBac.classList.remove('hidden');
    letter.textContent = q.letter;
    for(let i = 0; i < 5; i++){
        themeLabel[i].textContent = q.theme[i];
        themeInput[i].value = '';
        themeInput[i].placeholder = q.letter;
    }
    themeInput[0].focus();
}

// Function responses

// Show next response
let nextResponse = () => {
    if(buttonValidate.classList.contains('true')){
        allScore[actualPlayer]++;
    }
    buttonValidate.classList.add('false');
        buttonValidate.classList.remove('true');
        buttonValidate.textContent = 'Faux';
    if(actualPlayer + 1 == numberPlayers){
        actualPlayer = 0;
        actualResponse++
    }
    else {
        actualPlayer++;
    }
    if(actualResponse == quizz.questions.length){
        socket.emit('showScore');
    }
    else if(quizz.questions[actualResponse].type == 1){
        textResponse(quizz.questions[actualResponse])
        //socket.emit('textResponse', quizz.questions[actualResponse])
    }
    else if(quizz.questions[actualResponse].type == 2){
        petitBacResponse(quizz.questions[actualResponse])
        //socket.emit('petitBacResponse', quizz.questions[actualResponse])
    }
}

// Response question text
let textResponse = (q) => {
    hiddenContainersResponse();
    containerTextResponse.classList.remove('hidden');
    responseTextQ.textContent = `Question ${actualResponse + 1} : ${q.question}`;
    responseTextR.textContent = q.reponse;
    responseTextRu.textContent = allResponse[actualPlayer][actualResponse + 1];
    responseName.textContent = allResponse[actualPlayer][0];
}

// Response question petit bac
let petitBacResponse = (q) => {
    hiddenContainersResponse();
    containerPetitBacResponse.classList.remove('hidden');
    letterResponse.textContent = q.letter;
    responseName.textContent = allResponse[actualPlayer][0];
    for(let i = 0; i < 5; i++){
        themeLabelResponse[i].textContent = q.theme[i];
        themeInputResponse[i].value = allResponse[actualPlayer][actualResponse + 1][i];
    }
}

// Button false/true
let correct = () => {
    if(buttonValidate.textContent == 'Faux'){
        buttonValidate.classList.remove('false');
        buttonValidate.classList.add('true');
        buttonValidate.textContent = 'Correct';
    }
    else {
        buttonValidate.classList.add('false');
        buttonValidate.classList.remove('true');
        buttonValidate.textContent = 'Faux';
    }
}

// Result functions

let startResponse = () => {
    sectionPlay.classList.add('hidden');
    sectionReponse.classList.remove('hidden');
}


// Global Events

// Login Events

buttonStart.addEventListener('click', () => {
    socket.emit('startQuizz')
  }, false);

buttonResponse.addEventListener('click', () => {
    socket.emit('startDisplayResponse')
  }, false);

buttonValidate.addEventListener('click', () => {
    socket.emit('validate')
}, false);

nextAnswer.addEventListener('click', () => {
    socket.emit('nextAnswer');
});

socket.emit('connected', name.textContent);