// Set of special characters to be included in password
const specialCharacters = "!#$%&'()*+,-./:;<=>?@[]^_`{|}~";

// Set of numeric characters to be included in password
const numericCharacters = "0123456789";

// Set of lowercase characters to be included in password
const lowerCasedCharacters = "abcdefghijklmnopqrstuvwxyz";

// Set of uppercase characters to be included in password
const upperCasedCharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

// Add event listener to generate button
document.getElementById('generate').addEventListener('click', function() {
  // Ask user for the length of password
  let length = prompt("How many characters will your password be? Enter a number between 8 and 128");
    if (isNaN(length) || length < 8 || length > 128) {
        alert("Please enter a valid password length between 8 and 128.");
        return;
  }
  // Ask user to specify other preferences
    let includeUpperCase = confirm("Include uppercase characters?");
    let includeLowerCase = confirm("Include lowercase characters?");
    let includeNumbers = confirm("Include numbers?");
    let includeSpecialChars = confirm("Include special characters?");

  // Function to generate password with user input
  let password = generatePassword(length, includeUpperCase, includeLowerCase, includeNumbers, includeSpecialChars);

  // Display the generated password
  document.getElementById('password').value = password;

});

// Call password function to get a random element from an array
function generatePassword(length, includeUpperCase, includeLowerCase, includeNumbers, includeSpecialChars) {
  let allowedChars = '';
  if (includeUpperCase) allowedChars += upperCasedCharacters;
  if (includeLowerCase) allowedChars += lowerCasedCharacters;
  if (includeNumbers) allowedChars += numericCharacters;
  if (includeSpecialChars) allowedChars += specialCharacters;

  let password = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * allowedChars.length);
    password += allowedChars[randomIndex];
    }
  return password;
}

function copyPassword() {
  password.select();
  document.execCommand("copy")
  alert("Copied to clipboard");
}