// Globals

// Login variable

let sectionStart = document.getElementById('accueilQuizz');
let sectionPlay = document.getElementById('gameQuizz');
let sectionReponse = document.getElementById('reponseQuizz');
let allSectionQuestion = sectionPlay.querySelectorAll('div');

let buttonStart = sectionStart.querySelector('button');
let numberQuestion = sectionPlay.querySelector('h1 span');
let timer = document.getElementById('timer');

// Question text
let containerText = sectionPlay.querySelector('.text');
let h2Text = containerText.querySelector('h2');
let inputText = containerText.querySelector('input');

// Question Petit bac
let containerPetitBac = sectionPlay.querySelector('.petitBac');
let letter = containerPetitBac.querySelector('h2');
let themeLabel = containerPetitBac.querySelectorAll('label');
let themeInput = containerPetitBac.querySelectorAll('input');

const quizz = JSON.parse(dataQuizz);

let actualQuestion = 0;
let dataResponse = [];
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

let downTimer = (x) => {
    if(x > 0){
        timer.textContent = x;
        setTimeout(function() { downTimer(x - 1); }, 100);
    }
    else {
        pushReponse(quizz.questions[actualQuestion].type);
        actualQuestion ++;
        if(actualQuestion == quizz.questions.length){
            console.log(dataResponse);
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

// Function Questions
let textQuestion = (q) => {
    hiddenContainers();
    containerText.classList.remove('hidden');
    h2Text.textContent = q.question;
    inputText.value = '';
}

let petitBacQuestion = (q) => {
    hiddenContainers();
    containerPetitBac.classList.remove('hidden');
    letter.textContent = q.letter;
    for(let i = 0; i < 5; i++){
        themeLabel[i].textContent = q.theme[i];
        themeInput[i].value = '';
    }
}

// Result functions

let startResponse = () => {
    sectionPlay.classList.add('hidden');
    sectionReponse.classList.remove('hidden');
}

// Global Events

// Login Events

buttonStart.addEventListener('click', startQuizz);