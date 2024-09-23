// Constantes para categorías de IMC
const IMC_CATEGORIES = [
    { label: 'Bajo peso', maxValue: 18.5, color: '#87CEEB' },
    { label: 'Normal', maxValue: 24.9, color: '#4CAF50' },
    { label: 'Sobrepeso', maxValue: 29.9, color: '#FFCE56' },
    { label: 'Obesidad', maxValue: Infinity, color: '#FF6384' }
];

// Event Listeners
document.getElementById('activity-level').addEventListener('change', function() {
    document.getElementById('fitness-test').style.display = 'block';
});

document.getElementById('calculate-btn').addEventListener('click', calculate);

function calculate() {
    const formData = getFormData();
    if (!validateFormData(formData)) return;

    const imc = calculateIMC(formData.weight, formData.height);
    const healthAssessment = generateHealthAssessment(formData, imc);

    displayResults(healthAssessment);
    drawChart(imc);
}

function getFormData() {
    return {
        weight: parseFloat(document.getElementById('weight').value),
        height: parseFloat(document.getElementById('height').value) / 100,
        age: parseInt(document.getElementById('age').value),
        sleep: parseFloat(document.getElementById('sleep').value),
        activity: document.getElementById('active').value,
        waterIntake: parseInt(document.getElementById('water-intake').value),
        fruitsVeg: document.getElementById('fruits-veg').value,
        exerciseFrequency: document.getElementById('exercise-frequency').value,
        dietQuality: document.getElementById('diet-quality').value,
        gender: document.getElementById('gender').value
    };
}

function validateFormData(data) {
    if (Object.values(data).some(isNaN)) {
        alert('Por favor, completa todos los campos con valores válidos.');
        return false;
    }
    return true;
}

function calculateIMC(weight, height) {
    return weight / (height * height);
}

function generateHealthAssessment(data, imc) {
    let assessment = '';
    assessment += getIMCAssessment(imc);
    assessment += getAgeAssessment(data.age);
    assessment += getSleepAssessment(data.sleep);
    assessment += getWaterIntakeAssessment(data.waterIntake);
    assessment += getFruitsVegAssessment(data.fruitsVeg);
    assessment += getExerciseAssessment(data.exerciseFrequency);
    assessment += getDietQualityAssessment(data.dietQuality);
    assessment += getGenderSpecificAssessment(data.gender, imc, data.dietQuality, data.exerciseFrequency);
    return assessment;
}

function getIMCAssessment(imc) {
    const category = IMC_CATEGORIES.find(cat => imc <= cat.maxValue);
    let assessment = `Tu IMC es ${imc.toFixed(2)} (${category.label}). `;
    // Añade comentarios específicos y enlaces para cada categoría de IMC
    // ... (código existente para comentarios de IMC)
    return assessment;
}

function getAgeAssessment(age) {
    if (age < 18) return 'Tu salud parece estar en desarrollo. ';
    if (age < 65) return 'Tu salud parece estar en la etapa adulta. ';
    return 'Tu salud parece estar en la etapa senior. ';
}

function getSleepAssessment(sleep) {
    // ... (código existente para evaluación del sueño)
}

function getWaterIntakeAssessment(waterIntake) {
    // ... (código existente para evaluación de la ingesta de agua)
}

function getFruitsVegAssessment(fruitsVeg) {
    // ... (código existente para evaluación de frutas y verduras)
}

function getExerciseAssessment(exerciseFrequency) {
    // ... (código existente para evaluación del ejercicio)
}

function getDietQualityAssessment(dietQuality) {
    return `Tu dieta es calificada como ${dietQuality}. La calidad de la dieta tiene un impacto significativo en la salud a largo plazo, según múltiples estudios. `;
}

function getGenderSpecificAssessment(gender, imc, dietQuality, exerciseFrequency) {
    // ... (código existente para evaluación específica de género)
}

function displayResults(healthAssessment) {
    document.getElementById('result-text').innerHTML = healthAssessment;
    document.getElementById('result').style.display = 'block';
}

function drawChart(imc) {
    const ctx = document.getElementById('imc-chart').getContext('2d');
    
    const categories = [
        { label: 'Bajo peso', maxValue: 18.5, color: '#87CEEB' },
        { label: 'Normal', maxValue: 24.9, color: '#4CAF50' },
        { label: 'Sobrepeso', maxValue: 29.9, color: '#FFCE56' },
        { label: 'Obesidad', maxValue: Infinity, color: '#FF6384' }
    ];

    const userCategory = categories.find(cat => imc <= cat.maxValue);
    const userColor = userCategory ? userCategory.color : categories[categories.length - 1].color;

    const barColors = categories.map(cat => 
        cat === userCategory ? userColor : cat.color
    );

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: categories.map(cat => cat.label),
            datasets: [{
                label: 'IMC',
                data: categories.map(cat => cat.maxValue),
                backgroundColor: barColors,
                borderRadius: 10,
                barThickness: 30
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    max: Math.max(35, imc + 5)  // Ajusta el máximo del eje Y
                }
            },
            plugins: {
                annotation: {
                    annotations: {
                        line1: {
                            type: 'line',
                            yMin: imc,
                            yMax: imc,
                            borderColor: userColor,
                            borderWidth: 2,
                            label: {
                                content: `Tu IMC: ${imc.toFixed(2)}`,
                                enabled: true,
                                position: 'center',
                                backgroundColor: userColor,
                                color: 'white'
                            }
                        }
                    }
                }
            }
        }
    });
}
