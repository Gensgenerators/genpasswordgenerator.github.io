function getPasswordStrength(password) {
    let strength = 'Very Weak';
    let color = 'red';
    let percentage = 20;
    const hasLowerCase = /[a-z]/.test(password);
    const hasUpperCase = /[A-Z]/.test(password);
    const hasNumbers = /[0-9]/.test(password);
    const hasSpecial = /[!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/.test(password);
    const length = password.length;

    let criteriaCount = 0;
    if (hasLowerCase) criteriaCount++;
    if (hasUpperCase) criteriaCount++;
    if (hasNumbers) criteriaCount++;
    if (hasSpecial) criteriaCount++;

    // Calculate score based on length and criteria count
    let score = criteriaCount * 25 + (length > 8 ? (length - 8) : 0);

    if (score >= 90) {
        strength = 'Very Good';
        color = 'green';
        percentage = 100;
    } else if (score >= 70) {
        strength = 'Good';
        color = 'lightgreen';
        percentage = 80;
    } else if (score >= 50) {
        strength = 'Decent';
        color = '#FFD700';
        percentage = 60;
    } else if (score >= 30) {
        strength = 'Weak';
        color = '#FF8C00';
        percentage = 40;
    } else {
        strength = 'Very Weak';
        color = 'red';
        percentage = 20;
    }

    return { strength, color, percentage };
}


document.addEventListener('DOMContentLoaded', function () {
    // Load dark mode preference from localStorage
    const darkModePreference = localStorage.getItem('darkMode');
    if (darkModePreference === 'enabled') {
        document.body.classList.add('dark-mode');
        document.getElementById('darkModeToggle').checked = true;
    }
    document.getElementById('length').addEventListener('input', function () {
        document.getElementById('lengthValue').textContent = this.value;
    });

document.getElementById('generate').addEventListener('click', function () {
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
    const { strength, color, percentage } = getPasswordStrength(password);
    document.getElementById('progressFill').style.width = `${percentage}%`;
    document.getElementById('progressFill').style.backgroundColor = color;
    document.getElementById('strengthText').textContent = strength;
    document.getElementById('strengthText').style.color = color;
});

document.getElementById('copyBtn').addEventListener('click', function () {
    const passwordField = document.getElementById('password');
    passwordField.select();
    passwordField.setSelectionRange(0, 99999); // For mobile devices
    navigator.clipboard.writeText(passwordField.value).then(() => {
        const notification = document.getElementById('copyNotification');
        notification.style.opacity = 1;
        setTimeout(() => notification.style.opacity = 0, 2000);
    });
});

// Dark Mode Toggle
document.getElementById('darkModeToggle').addEventListener('change', function () {
    if (this.checked) {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }
});
