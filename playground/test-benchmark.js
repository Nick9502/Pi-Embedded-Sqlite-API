
var brcryptTest = require('./bcrypt-test')
var start = new Date()
var hrstart = process.hrtime();

const plaintext1 = 'testPassword';
const plaintext_1 = 'testPassword';
const plaintext2 = 'lemongrabislit305'


/* Test Performance of a given process */
testPerformance = () => {
    var end = new Date() - start,
    hrend = process.hrtime(hrstart)
    console.info('Execution time: %dms', end)
    console.info('Execution time (hr): %ds %dms', hrend[0], hrend[1] / 1000000)
}