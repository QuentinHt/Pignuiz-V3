// Globals

let questionType = document.formQuizz.typeQuestion;
let createQuizz = document.querySelector('#createQuizz')
let form = createQuizz.querySelector('form');
let containerQuestions = form.querySelector('.questions');
let allQuestions = containerQuestions.querySelectorAll('div');

// Variables globales
let numQuestion = createQuizz.querySelector('h2 span');
let dataQuizz = [];

// Container question

let containerText = containerQuestions.querySelector('#text');
let containerPetitBac = containerQuestions.querySelector('#petitBac')

// Button next
let nextText = containerText.querySelector('.nextText');
let nextPetitBac = containerQuestions.querySelector('.nextPetitBac');

// Questions next
let questionText = containerText.querySelector('#textQuestion');
let reponseText = containerText.querySelector('#textReponse');

// Questions petit bac
let letterPetitBac = containerPetitBac.querySelector('#petitBacLetter');
let FirstPetitBac = containerPetitBac.querySelector('#petitBac1');
let SecondPetitBac = containerPetitBac.querySelector('#petitBac2');
let ThirdPetitBac = containerPetitBac.querySelector('#petitBac3');
let FourthPetitBac = containerPetitBac.querySelector('#petitBac4');
let FifthPetitBac = containerPetitBac.querySelector('#petitBac5');

// Globals functions

// Login functions


// Global Events

// Login Events

for (var i = 0; i < questionType.length; i++) {
    questionType[i].addEventListener('change', function() {
        for(let j = 0; j < allQuestions.length; j ++){
            allQuestions[j].classList.add('hidden');
        }
        containerQuestions.querySelector(`div:nth-of-type(${this.value})`).classList.remove('hidden');
    });
}

nextText.addEventListener('click', function(e){
    e.preventDefault();
    dataQuizz.push({
        'num': numQuestion.textContent,
        'question': questionText.value,
        'reponse': reponseText.value
    })
    console.log(dataQuizz)
});
nextPetitBac.addEventListener('click', function(e){
    e.preventDefault();
    dataQuizz.push({
        'num': numQuestion.textContent,
        'letter': letterPetitBac.value,
        'theme1': FirstPetitBac.value,
        'theme2': SecondPetitBac.value,
        'theme3': ThirdPetitBac.value,
        'theme4': FourthPetitBac.value,
        'theme5': FifthPetitBac.value
    })
    console.log(dataQuizz)
});

//changeFormLog.addEventListener('click', changeFormLogin);