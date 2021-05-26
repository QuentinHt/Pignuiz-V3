const test = document.getElementById('test');


socket.on('displayResult', function(response) {
    allResponse.push(response);
});

socket.on('startQuizz', function(response) {
    startQuizz();
});

socket.on('startDisplayResponse', function(data) {
    startDisplayResponse();
});

socket.on('executecommand', function(data){
    var a = 'foo';
    commands[data.commandName](a);
});
