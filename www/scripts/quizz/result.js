const test = document.getElementById('test');

test.addEventListener('click', function(e) {
    console.log('oui')
    e.preventDefault();
    socket.emit('displayResult', 'non');
});

socket.on('displayResult', function(response) {
    console.log(response)
});

socket.on('executecommand', function(data){
    var a = 'foo';
    commands[data.commandName](a);
});

socket.on('chat message', function(msg) {
    console.log('sexe')
});
