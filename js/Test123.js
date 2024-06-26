function calculateAge() {
    const birthdateInput = document.getElementById('birthdate').value;
    if (birthdateInput) {
        const birthdate = new Date(birthdateInput);
        const today = new Date();
        let age = today.getFullYear() - birthdate.getFullYear();
        const monthDifference = today.getMonth() - birthdate.getMonth();
        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthdate.getDate())) {
            age--;
        }
        document.getElementById('age').textContent = `Dein Alter ist ${age} Jahre.`;
    } else {
        document.getElementById('age').textContent = 'Bitte ein Geburtsdatum eingeben.';
    }
}
