// Fetch the JSON data and make it available
async function loadFadeData() {
    const response = await fetch('fade-percentages.json');
    const data = await response.json();
    return data;
}

async function calculateFade() {
    const fadeData = await loadFadeData();
    const weaponInput = document.getElementById('weapon').value;
    const seedInput = parseInt(document.getElementById('seed').value, 10);

    if (isNaN(seedInput)) {
        document.getElementById('result').textContent = "Invalid seed number. Please enter a valid number.";
        return;
    }

    const weapon = fadeData.find(w => w.weapon.toLowerCase() === weaponInput.toLowerCase());

    if (!weapon) {
        document.getElementById('result').textContent = `Weapon "${weaponInput}" not found.`;
        return;
    }

    const seedData = weapon.percentages.find(p => p.seed === seedInput);

    if (!seedData) {
        document.getElementById('result').textContent = `Seed "${seedInput}" not found for weapon "${weaponInput}".`;
        return;
    }

    document.getElementById('result').textContent = `The fade percentage for ${weaponInput} with seed ${seedInput} is ${seedData.percentage}%.`;
}
