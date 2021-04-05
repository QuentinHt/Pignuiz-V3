// Globals

// Login variable

let formLogin = document.getElementById('log');
let formRegister = document.getElementById('register');
let changeFormLog = document.getElementById('changeFormLog');

// Globals functions

// Login functions

let changeFormLogin = () => {
    if(formLogin.classList.contains('hidden')){
        formLogin.classList.remove('hidden');
        formRegister.classList.add('hidden');
        changeFormLog.innerHTML = 'Pas de compte ? Inscris toi Pignouf !';
    }
    else {
        formLogin.classList.add('hidden');
        formRegister.classList.remove('hidden');
        changeFormLog.innerHTML = 'Déjà inscris ? Connecte toi Pignouf !';
    }
}

// Global Events

// Login Events

console.log(changeFormLog)

changeFormLog.addEventListener('click', changeFormLogin);