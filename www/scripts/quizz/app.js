// Globals

// Login variable

let sectionStart = document.getElementById('accueilQuizz');
let sectionPlay = document.getElementById('gameQuizz');

let buttonStart = sectionStart.querySelector('button');
// Globals functions

// Login functions

let startQuizz = () => {
    sectionStart.classList.add('hidden');
    sectionPlay.classList.remove('hidden');
}

// Global Events

// Login Events

buttonStart.addEventListener('click', startQuizz);