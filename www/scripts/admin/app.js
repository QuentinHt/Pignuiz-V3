// Globals

let questionType = document.formQuizz.typeQuestion;
let createQuizz = document.querySelector('#createQuizz')
let form = createQuizz.querySelector('form');
let containerQuestions = form.querySelector('.questions');
let allQuestions = containerQuestions.querySelectorAll('div');
let buttonCreate = form.querySelector('.sendQuizz');

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
        'type': Number(document.querySelector('input[name="typeQuestion"]:checked').value),
        'question': questionText.value,
        'reponse': reponseText.value
    });
    questionText.value = '';
    reponseText.value = '';
    numQuestion.textContent = Number(numQuestion.textContent) + 1;
});
nextPetitBac.addEventListener('click', function(e){
    e.preventDefault();
    dataQuizz.push({
        'num': numQuestion.textContent,
        'type': Number(document.querySelector('input[name="typeQuestion"]:checked').value),
        'letter': letterPetitBac.value,
        'theme1': FirstPetitBac.value,
        'theme2': SecondPetitBac.value,
        'theme3': ThirdPetitBac.value,
        'theme4': FourthPetitBac.value,
        'theme5': FifthPetitBac.value
    });
    letterPetitBac.value = '';
    FirstPetitBac.value = '';
    SecondPetitBac.value = '';
    ThirdPetitBac.value = '';
    FourthPetitBac.value = '';
    FifthPetitBac.value = '';
    numQuestion.textContent = Number(numQuestion.textContent) + 1;
});

buttonCreate.addEventListener('click', function(e){
    e.preventDefault();
    if(dataQuizz.length > 0){
        console.log(dataQuizz)
    }
    else {
        console.error("Il n'y a pas assez de questions")
    }
})