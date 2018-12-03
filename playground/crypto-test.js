var crypto = require('crypto');

var start = new Date()
var hrstart = process.hrtime()
const saltRounds = 10;
const plaintext = 'testPassword';
const plaintext2 = 'testPassword2';

/**
 * Calculates the MD5 hash of a string.
 *
 * @param  {String} string - The string (or buffer).
 * @return {String}        - The MD5 hash.
 */
function md5(string) {
    hashMd5 = crypto.createHash('md5').update(string).digest('hex');
    testPerformance();
    return hashMd5;
}

/**
 * generates random string of characters i.e salt
 * @function
 * @param {number} length - Length of the random string.
 */
var genRandomString = function(length){
    return crypto.randomBytes(Math.ceil(length/2))
            .toString('hex') /** convert to hexadecimal format */
            .slice(0,length);   /** return required number of characters */
};

/**
 * hash password with sha512.
 * @function
 * @param {string} password - List of required fields.
 * @param {string} salt - Data to be validated.
 */
var sha512 = function(password, salt){
    var hash = crypto.createHmac('sha512', salt); /** Hashing algorithm sha512 */
    hash.update(password);
    var value = hash.digest('hex');
    return {
        salt:salt,
        passwordHash:value
    };
};

function saltHashPassword(userpassword) {
    var salt = genRandomString(16); /** Gives us salt of length 16 */
    var passwordData = sha512(userpassword, salt);
    testPerformance();
	console.log('Using SHA-512 to hash Plaintext...')
    console.log('UserPassword = '+userpassword);
    console.log('Passwordhash = '+passwordData.passwordHash);
	console.log('nSalt = '+passwordData.salt);
}

/* Test Performance of a given process */
testPerformance = () => {
    var end = new Date() - start,
    hrend = process.hrtime(hrstart)
    console.info('Execution time: %dms', end)
    console.info('Execution time (hr): %ds %dms', hrend[0], hrend[1] / 1000000)
}

saltHashPassword(plaintext);
console.log('MD5 Hashed Plaintext is: ',md5(plaintext));
