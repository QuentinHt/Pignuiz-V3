socket.on('displayResult', function(response) {
    allResponse.push(response);
});

socket.on('startQuizz', function(response) {
    startQuizz();
});

socket.on('connected', function(data){
    connected(data);
})

socket.on('startDisplayResponse', function(data) {
    startDisplayResponse();
});

socket.on('textResponse', function(data) {
    textResponse(data);
});

socket.on('petitBacResponse', function(data) {
    petitBacResponse(data);
});

socket.on('validate', function() {
    correct();
});

socket.on('nextAnswer', function() {
    nextResponse();
});

socket.on('showScore', function() {
    showScore();
});

socket.on('executecommand', function(data){
    var a = 'foo';
    commands[data.commandName](a);
});
