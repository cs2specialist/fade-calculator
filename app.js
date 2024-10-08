// Function to fetch the JSON data and handle errors
async function loadFadeData() {
    try {
        const response = await fetch('fade-percentages.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const fadeData = await response.json();
        return fadeData;
    } catch (error) {
        console.error('Failed to load fade data:', error);
        return null;
    }
}

// Function to calculate the fade percentage
async function calculateFade() {
    const fadeData = await loadFadeData();
    if (!fadeData) {
        document.getElementById('result').textContent = 'Error loading data. Please try again later.';
        return;
    }

    const weaponInput = document.getElementById('weapon').value.trim();
    const seedInput = parseInt(document.getElementById('seed').value.trim(), 10);

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

// Ensure the function is attached to the button's click event
document.getElementById('calculateButton').addEventListener('click', calculateFade);
