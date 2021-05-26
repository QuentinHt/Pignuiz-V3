// Globals

// Login variable

let sectionStart = document.getElementById('accueilQuizz');
let sectionPlay = document.getElementById('gameQuizz');
let sectionReponse = document.getElementById('reponseQuizz');
let allSectionQuestion = sectionPlay.querySelectorAll('div');

let buttonStart = sectionStart.querySelector('button');
let numberQuestion = sectionPlay.querySelector('h2 span');
let timer = document.getElementById('timer');

let name = document.getElementById('name');

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
let allSectionResponse = response.querySelectorAll('div');
let buttonResponse = beforeResponse.querySelector('button');

// Response text
let containerTextResponse = response.querySelector('.text');
let responseTextQ = response.querySelector('.q');
let responseTextR = response.querySelector('.r');
let responseTextN = response.querySelector('.n');

// Response Petit bac
let containerPetitBacResponse = sectionPlay.querySelector('.petitBac');
let letterResponse= containerPetitBacResponse.querySelector('h3');
let themeLabelResponse = containerPetitBacResponse.querySelectorAll('label');
let themeInputResponse = containerPetitBacResponse.querySelectorAll('input');

let numberResponse = response.querySelector('#questionResult span');
let nameResponse = response.querySelector('#nameResult')

const quizz = JSON.parse(dataQuizz);

let actualQuestion = 0;
let actualResponse = 0;
let actualPlayer = 0;
let numberPlayers = 0;
let dataResponse = [name.textContent];

let allResponse = [];
// Quizz functions

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
    downTimer(30);
};

let startDisplayResponse = () => {
    beforeResponse.classList.add('hidden');
    response.classList.remove('hidden');
    if(quizz.questions[actualResponse].type == 1){
        socket.emit('textResponse', quizz.questions[actualResponse])
    }
    else if(quizz.questions[actualResponse].type == 2){
        socket.emit('petitBacResponse', quizz.questions[actualResponse])
    }
};

let downTimer = (x) => {
    if(x > 0){
        timer.textContent = x;
        setTimeout(function() { downTimer(x - 1); }, 30);
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
            downTimer(30);
        }
    }
}

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

let hiddenContainers = () => {
    allSectionQuestion.forEach(question => {
        question.classList.add('hidden');
    })
}

let hiddenContainersResponse = () => {
    allSectionResponse.forEach(response => {
        response.classList.add('hidden');
    })
}

// Function Questions
let textQuestion = (q) => {
    hiddenContainers();
    containerText.classList.remove('hidden');
    h2Text.textContent = q.question;
    inputText.value = '';
    inputText.focus();
}

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
let textResponse = (q) => {
    hiddenContainersResponse();
    containerTextResponse.classList.remove('hidden');
    responseTextQ.textContent = `Question ${actualResponse + 1} : ${q.question}`;
    responseTextR.textContent = allResponse[actualPlayer][actualResponse + 1];
    responseTextN.textContent = allResponse[actualPlayer][0];
    if(actualPlayer == numberPlayers){
        actualPlayer = 0;
        actualResponse++
    }
    else {
        actualPlayer++;
    }
}

let petitBacResponse = (q) => {
    hiddenContainersResponse();
    containerPetitBacResponse.classList.remove('hidden');
    letterResponse.textContent = q.letter;
    for(let i = 0; i < 5; i++){
        themeLabelResponse[i].textContent = q.theme[i];
        themeInputResponse[i].value = '';
        themeInputResponse[i].placeholder = q.letter;
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