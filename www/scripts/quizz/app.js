// Globals

// Login variable

let sectionStart = document.getElementById('accueilQuizz');
let sectionPlay = document.getElementById('gameQuizz');
let allSectionQuestion = sectionPlay.querySelectorAll('div');

let buttonStart = sectionStart.querySelector('button');

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
// Globals functions

let startQuizz = () => {
    sectionStart.classList.add('hidden');
    sectionPlay.classList.remove('hidden');

    if(quizz.questions[0].type == 1){
        textQuestion(quizz.questions[0]);
    }
    else if(quizz.questions[0].type == 2){
        petitBacQuestion(quizz.questions[0]);
    }
};

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
let textQuestion = () => {
    hiddenContainers();
    containerText.classList.remove('hidden');
}

let petitBacQuestion = () => {
    hiddenContainers();
    containerPetitBac.classList.remove('hidden');
}

// Global Events

// Login Events

buttonStart.addEventListener('click', startQuizz);