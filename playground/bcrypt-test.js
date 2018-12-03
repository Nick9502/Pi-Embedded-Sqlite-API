const bcrypt = require('bcrypt');

var start = new Date()
var hrstart = process.hrtime()
const saltRounds = 10;
const myPlaintextPassword = 'testPassword';
const someOtherPlaintextPassword = 'testPassword2';

var bcryptTest = bcrypt.hash(myPlaintextPassword, saltRounds).then(function(hash) {
    console.log(hash);
    testPerformance();
});

/* Test Performance of a given process */
testPerformance = () => {
    var end = new Date() - start,
    hrend = process.hrtime(hrstart)
    console.info('Execution time: %dms', end)
    console.info('Execution time (hr): %ds %dms', hrend[0], hrend[1] / 1000000)
}

modules.export={bcryptTest};