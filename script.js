function getPasswordStrength(password) {
    let strength = 'Very Weak';
    let color = 'red';
    let percentage = 20;
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
            break;
        case 2:
            strength = 'Weak';
            color = '#FF8C00';
            percentage = 40;
            break;
        case 3:
            strength = 'Decent';
            color = '#FFD700';
            percentage = 60;
            break;
        case 4:
            strength = 'Good';
            color = 'lightgreen';
            percentage = 80;
            break;
        case 5:
            strength = 'Very Good';
            color = 'green';
            percentage = 100;
            break;
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
            localStorage.setItem('darkMode', 'enabled');
        } else {
            document.body.classList.remove('dark-mode');
            localStorage.setItem('darkMode', 'disabled');
        }
    });
});
