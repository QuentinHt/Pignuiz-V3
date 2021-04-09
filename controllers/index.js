/* 
Definition
*/
    const Controllers = {
        auth: require('./auth.controller'),
        post: require('./post.controller'),
        user: require('./user.controller'),
        quizz: require('./quizz.controller')
    }
//

/*  
Export
*/
    module.exports = Controllers;
//