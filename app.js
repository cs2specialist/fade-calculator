document.getElementById('calculateButton').addEventListener('click', async function () {
    try {
        // Load JSON data
        const response = await fetch('fade-percentages.json');
        const fadeData = await response.json();

        // Get user input
        const weaponInput = document.getElementById('weapon').value.trim();
        const seedInput = parseInt(document.getElementById('seed').value.trim(), 10);

        // Validate seed input
        if (isNaN(seedInput)) {
            document.getElementById('result').textContent = "Invalid seed number. Please enter a valid number.";
            return;
        }

        // Find the weapon in the data
        const weapon = fadeData.find(w => w.weapon.toLowerCase() === weaponInput.toLowerCase());

        // If the weapon is not found
        if (!weapon) {
            document.getElementById('result').textContent = `Weapon "${weaponInput}" not found.`;
            return;
        }

        // Find the seed in the weapon data
        const seedData = weapon.percentages.find(p => p.seed === seedInput);

        // If the seed is not found
        if (!seedData) {
            document.getElementById('result').textContent = `Seed "${seedInput}" not found for weapon "${weaponInput}".`;
            return;
        }

        // Display the result
        document.getElementById('result').textContent = `The fade percentage for ${weaponInput} with seed ${seedInput} is ${seedData.percentage}%.`;

    } catch (error) {
        console.error('Failed to calculate fade:', error);
        document.getElementById('result').textContent = "An error occurred. Please try again.";
    }
});
