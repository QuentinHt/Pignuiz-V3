// Globals

// Login variable

let questionType = document.formQuizz.typeQuestion;
let form = document.querySelector('#createQuizz form');
let containerQuestions = form.querySelector('.questions');
let allQuestions = containerQuestions.querySelectorAll('div');

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

//changeFormLog.addEventListener('click', changeFormLogin);