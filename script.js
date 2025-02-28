// Log to confirm script is running (remove after testing)
console.log("Script loaded successfully");

// Password strength logic
function getPasswordStrength(password) {
    let strength = 'Very Weak';
    let color = 'red';
    let percentage = 20;
    let feedback = '';
    const hasLowerCase = /[a-z]/.test(password);
    const hasUpperCase = /[A-Z]/.test(password);
    const hasNumbers = /[0-9]/.test(password);
    const hasSpecial = /[!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/.test(password);
    const lengthCriteria = password.length >= 8;
    const criteriaCount =
        (hasLowerCase ? 1 : 0) +
        (hasUpperCase ? 1 : 0) +
        (hasNumbers ? 1 : 0) +
        (hasSpecial ? 1 : 0) +
        (lengthCriteria ? 1 : 0);
    
    switch (criteriaCount) {
        case 0:
        case 1:
            strength = 'Very Weak';
            color = 'red';
            percentage = 20;
            feedback = 'Add more character types and increase length.';
            break;
        case 2:
            strength = 'Weak';
            color = '#FF8C00';
            percentage = 40;
            feedback = 'Try adding special characters or uppercase letters.';
            break;
        case 3:
            strength = 'Decent';
            color = '#FFD700';
            percentage = 60;
            feedback = 'Good start! Add more variety or length for strength.';
            break;
        case 4:
            strength = 'Good';
            color = 'lightgreen';
            percentage = 80;
            feedback = 'Almost there! Increase length for maximum security.';
            break;
        case 5:
            strength = 'Very Good';
            color = 'green';
            percentage = 100;
            feedback = 'Excellent password! Very secure.';
            break;
    }
    return { strength, color, percentage, feedback };
}

// Generate password function
function generatePassword() {
    const length = parseInt(document.getElementById('length').value);
    const includeNumbers = document.getElementById('includeNumbers').checked;
    const includeSpecial = document.getElementById('includeSpecial').checked;
    const includeUppercase = document.getElementById('includeUppercase').checked;
    const includeLowercase = document.getElementById('includeLowercase').checked;
    let characters = '';
    if (includeLowercase) characters += 'abcdefghijklmnopqrstuvwxyz';
    if (includeUppercase) characters += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeNumbers) characters += '0123456789';
    if (includeSpecial) characters += '!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~';
    if (!characters) {
        alert('Please select at least one character type.');
        return;
    }
    let password = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        password += characters[randomIndex];
    }
    document.getElementById('password').value = password;
    const { strength, color, percentage, feedback } = getPasswordStrength(password);
    document.getElementById('progressFill').style.width = `${percentage}%`;
    document.getElementById('progressFill').style.backgroundColor = color;
    document.getElementById('strengthText').textContent = strength;
    document.getElementById('strengthText').style.color = color;
    document.getElementById('strengthFeedback').textContent = feedback;
}

// Event listeners with error handling
const lengthInput = document.getElementById('length');
if (lengthInput) {
    lengthInput.addEventListener('input', function () {
        document.getElementById('lengthValue').textContent = this.value;
    });
} else {
    console.error("Element #length not found");
}

const generateBtn = document.getElementById('generate');
if (generateBtn) {
    generateBtn.addEventListener('click', generatePassword);
} else {
    console.error("Element #generate not found");
}

const regenerateBtn = document.getElementById('regenerate');
if (regenerateBtn) {
    regenerateBtn.addEventListener('click', generatePassword);
} else {
    console.error("Element #regenerate not found");
}

const copyBtn = document.getElementById('copyBtn');
if (copyBtn) {
    copyBtn.addEventListener('click', function () {
        const passwordField = document.getElementById('password');
        if (passwordField) {
            passwordField.select();
            passwordField.setSelectionRange(0, 99999);
            navigator.clipboard.writeText(passwordField.value).then(() => {
                const notification = document.getElementById('copyNotification');
                if (notification) {
                    notification.style.opacity = 1;
                    setTimeout(() => notification.style.opacity = 0, 2000);
                }
            });
        } else {
            console.error("Element #password not found");
        }
    });
} else {
    console.error("Element #copyBtn not found");
}

const darkModeToggle = document.getElementById('darkModeToggle');
if (darkModeToggle) {
    darkModeToggle.addEventListener('change', function () {
        console.log("Dark mode toggled:", this.checked); // Debugging
        if (this.checked) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
    });
} else {
    console.error("Element #darkModeToggle not found");
}
