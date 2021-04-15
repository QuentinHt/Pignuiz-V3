// Globals

// Login variable

let sectionStart = document.getElementById('accueilQuizz');
let sectionPlay = document.getElementById('gameQuizz');
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

let count = 1;
let actualQuestion = 0;
// Globals functions

let startQuizz = () => {
    sectionStart.classList.add('hidden');
    sectionPlay.classList.remove('hidden');

    numberQuestion.textContent = count;

    if(quizz.questions[actualQuestion].type == 1){
        textQuestion(quizz.questions[actualQuestion]);
    }
    else if(quizz.questions[actualQuestion].type == 2){
        petitBacQuestion(quizz.questions[actualQuestion]);
    }
    actualQuestion ++;
    downTimer(30);
};

let downTimer = (x) => {
    if(x > 0){
        timer.textContent = x;
        setTimeout(function() { downTimer(x - 1); }, 10);
    }
    else {
        if(actualQuestion == quizz.questions.length){
            console.log('quizz fini')
        }
        else {
            if(quizz.questions[actualQuestion].type == 1){
                textQuestion(quizz.questions[actualQuestion]);
            }
            else if(quizz.questions[actualQuestion].type == 2){
                petitBacQuestion(quizz.questions[actualQuestion]);
            }
            actualQuestion ++;
            downTimer(30);
        }
    }
}

let nextQuestion = () => {
    // for(let i = 0; i < quizz.questions.length; i ++){
    //     console.log(quizz.questions[i]);
    // }
};

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
    inputText = '';
}

let petitBacQuestion = (q) => {
    hiddenContainers();
    containerPetitBac.classList.remove('hidden');
    letter.textContent = q.letter;
    for(let i = 0; i < 5; i++){
        themeLabel[i].textContent = q.theme[i];
        themeInput[i].textContent = '';
    }
}

// Global Events

// Login Events

buttonStart.addEventListener('click', startQuizz);