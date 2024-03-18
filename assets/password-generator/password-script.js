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

function generatePassword(length, includeUpperCase, includeLowerCase, includeNumbers, includeSpecialChars) {
  let password = '';

  // Arrays to track which character sets have been used
  let usedUpperCase = false;
  let usedLowerCase = false;
  let usedNumbers = false;
  let usedSpecialChars = false;

  // Determine which character sets to include
  const allowedChars = [];
  if (includeUpperCase) allowedChars.push(upperCasedCharacters);
  if (includeLowerCase) allowedChars.push(lowerCasedCharacters);
  if (includeNumbers) allowedChars.push(numericCharacters);
  if (includeSpecialChars) allowedChars.push(specialCharacters);

  // Add at least one character from each character set
  allowedChars.forEach(charSet => {
    const randomChar = charSet[Math.floor(Math.random() * charSet.length)];
    password += randomChar;

    // Update the corresponding flag
    if (charSet === upperCasedCharacters) usedUpperCase = true;
    if (charSet === lowerCasedCharacters) usedLowerCase = true;
    if (charSet === numericCharacters) usedNumbers = true;
    if (charSet === specialCharacters) usedSpecialChars = true;
  });

  // Add remaining characters randomly
  const remainingLength = length - allowedChars.length;
  for (let i = 0; i < remainingLength; i++) {
    // Concatenate characters randomly from all character sets
    const randomCharSet = allowedChars[Math.floor(Math.random() * allowedChars.length)];
    const randomChar = randomCharSet[Math.floor(Math.random() * randomCharSet.length)];
    password += randomChar;
  }

  // Shuffle the password to make it more random
  password = shuffleString(password);

  return password;
}

// Function to shuffle a string
function shuffleString(str) {
  const array = str.split('');
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array.join('');
}

function copyPassword() {
  const passwordInput = document.getElementById('password');
  passwordInput.select();

  try {
    const successful = document.execCommand('copy');
    if (successful) {
      alert('Password copied to clipboard');
    } else {
      alert('Failed to copy password to clipboard');
    }
  } catch (err) {
    console.error('Unable to copy password:', err);
    alert('Unable to copy password. Please try again or copy it manually.');
  }
}