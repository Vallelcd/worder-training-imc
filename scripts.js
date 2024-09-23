document.getElementById('activity-level').addEventListener('change', function() {
    document.getElementById('fitness-test').style.display = 'block';
});


function calculate() {
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value) / 100; 
    const age = parseInt(document.getElementById('age').value);
    const sleep = parseFloat(document.getElementById('sleep').value);
    const activity = document.getElementById('active').value;
    const waterIntake = parseInt(document.getElementById('water-intake').value); // Cambiado a parseInt y ahora representa vasos de agua
    const fruitsVeg = document.getElementById('fruits-veg').value;
    const exerciseFrequency = document.getElementById('exercise-frequency').value;
    const dietQuality = document.getElementById('diet-quality').value;
    const gender = document.getElementById('gender').value;

    if (isNaN(weight) || isNaN(height) || isNaN(age) || isNaN(sleep) || isNaN(waterIntake)) {
        alert('Por favor, completa todos los campos.');
        return;
    }

    const imc = weight / (height * height);
    let condition, scientificComment, scientificLink;

    if (imc < 18.5) {
        condition = 'Bajo peso';
        scientificComment = 'Según estudios, un IMC bajo puede asociarse con deficiencias nutricionales y un sistema inmunológico debilitado.';
        scientificLink = 'https://www.who.int/tools/growth-reference-data-for-5to19-years/indicators/bmi-for-age';
    } else if (imc < 24.9) {
        condition = 'Normal';
        scientificComment = 'Investigaciones muestran que un IMC en este rango se asocia con un menor riesgo de enfermedades crónicas.';
        scientificLink = 'https://www.nhlbi.nih.gov/health/educational/lose_wt/BMI/bmicalc.htm';
    } else if (imc < 29.9) {
        condition = 'Sobrepeso';
        scientificComment = 'Estudios indican que el sobrepeso puede aumentar el riesgo de ciertas condiciones de salud.';
        scientificLink = 'https://www.cdc.gov/healthyweight/assessing/bmi/adult_bmi/english_bmi_calculator/bmi_calculator.html';
    } else {
        condition = 'Obesidad';
        scientificComment = 'La investigación muestra que la obesidad está asociada con un mayor riesgo de varias enfermedades crónicas.';
        scientificLink = 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4859313/';
    }

    let healthAssessment = `Tu edad me indica que estas `;
    
    if (age < 18) {
        healthAssessment += 'en desarrollo. ';
    } else if (age < 65) {
        healthAssessment += 'en la etapa adulta. ';
    } else {
        healthAssessment += 'en la etapa senior. ';
    }
    
    healthAssessment += `Tu IMC es ${imc.toFixed(2)} (${condition}). ${scientificComment} `;
    healthAssessment += `Para más información, consulta <a href="${scientificLink}" target="_blank">este estudio científico</a>. `;

    healthAssessment += `Tu dieta es calificada como ${dietQuality}. La calidad de la dieta tiene un impacto significativo en la salud a largo plazo, según múltiples estudios. `;

    // Añadimos más comentarios y links para cada condición de IMC
    if (imc < 18.5) {
        healthAssessment += `Un estudio reciente en el Journal of Clinical Endocrinology & Metabolism sugiere que el bajo peso puede afectar negativamente la densidad ósea. <a href="https://academic.oup.com/jcem/article/99/12/4516/2833082" target="_blank">Leer más</a>. `;
    } else if (imc >= 18.5 && imc < 24.9) {
        healthAssessment += `Una investigación publicada en The Lancet indica que mantener un IMC en este rango durante la adultez se asocia con una mayor esperanza de vida. <a href="https://www.thelancet.com/journals/lancet/article/PIIS0140-6736(16)30175-1/fulltext" target="_blank">Más detalles aquí</a>. `;
    } else if (imc >= 25 && imc < 29.9) {
        healthAssessment += `Un metaanálisis en el BMJ sugiere que incluso el sobrepeso leve puede aumentar el riesgo de ciertas enfermedades crónicas. <a href="https://www.bmj.com/content/353/bmj.i2156" target="_blank">Ver estudio</a>. `;
    } else {
        healthAssessment += `La revista Nature publicó un estudio que vincula la obesidad con un mayor riesgo de múltiples tipos de cáncer. <a href="https://www.nature.com/articles/s41467-020-16243-3" target="_blank">Leer el artículo</a>. `;
    }

    // Añadimos comentarios específicos para cada hora de sueño
    switch(Math.floor(sleep)) {
        case 5:
            healthAssessment += `Un estudio en Sleep Health asocia dormir 5 horas con un mayor riesgo de enfermedades cardiovasculares. <a href="https://www.sleephealthjournal.org/article/S2352-7218(17)30041-X/fulltext" target="_blank">Ver investigación</a>. `;
            break;
        case 6:
            healthAssessment += `Investigaciones en el European Heart Journal sugieren que dormir 6 horas puede aumentar el riesgo de desarrollar enfermedades cardíacas. <a href="https://academic.oup.com/eurheartj/article/32/12/1484/502022" target="_blank">Leer más</a>. `;
            break;
        case 7:
            healthAssessment += `Un estudio en la revista Sleep muestra que dormir 7 horas se asocia con el menor riesgo de mortalidad. <a href="https://academic.oup.com/sleep/article/33/5/585/2454478" target="_blank">Ver estudio</a>. `;
            break;
        case 8:
            healthAssessment += `La National Sleep Foundation recomienda entre 7-9 horas de sueño para adultos, basado en múltiples estudios. <a href="https://www.sleepfoundation.org/how-sleep-works/how-much-sleep-do-we-really-need" target="_blank">Más información</a>. `;
            break;
        case 9:
            healthAssessment += `Un estudio en el Journal of Sleep Research sugiere que dormir más de 9 horas podría estar asociado con problemas de salud subyacentes. <a href="https://onlinelibrary.wiley.com/doi/full/10.1111/jsr.12712" target="_blank">Leer artículo</a>. `;
            break;
        default:
            healthAssessment += `La cantidad de sueño que reportas está fuera del rango típico estudiado. Considera consultar a un profesional de la salud. `;
    }

    // Nuevo código para evaluar el consumo de agua en vasos
    switch(true) {
        case waterIntake <= 2:
            healthAssessment += `Estás bebiendo ${waterIntake} vaso(s) de agua al día. Un estudio en el Journal of Nutrition encontró que una hidratación inadecuada se asocia con un mayor índice de masa corporal y obesidad. <a href="https://academic.oup.com/jn/article/146/3/555/4589902" target="_blank">Ver estudio</a>. `;
            break;
        case waterIntake <= 4:
            healthAssessment += `Tu consumo de ${waterIntake} vasos de agua al día es un buen comienzo. Investigaciones en el American Journal of Clinical Nutrition sugieren que aumentar la ingesta de agua puede ayudar en el control del peso. <a href="https://academic.oup.com/ajcn/article/98/2/282/4577135" target="_blank">Leer más</a>. `;
            break;
        case waterIntake <= 6:
            healthAssessment += `Beber ${waterIntake} vasos de agua al día es una práctica saludable. Un estudio en el British Journal of Nutrition encontró que este nivel de hidratación puede mejorar el estado de ánimo y la cognición. <a href="https://www.cambridge.org/core/journals/british-journal-of-nutrition/article/effects-of-hydration-status-on-cognitive-performance-and-mood/3388AB36B8DF73E844C9AD19271A75BF" target="_blank">Ver investigación</a>. `;
            break;
        case waterIntake <= 8:
            healthAssessment += `Tu consumo de ${waterIntake} vasos de agua al día es excelente. La revista Frontiers in Nutrition publicó que una hidratación adecuada puede reducir el riesgo de infecciones del tracto urinario. <a href="https://www.frontiersin.org/articles/10.3389/fnut.2020.00054/full" target="_blank">Leer artículo</a>. `;
            break;
        default:
            healthAssessment += `Estás bebiendo más de 8 vasos de agua al día. Mientras que la hidratación es importante, el Journal of Clinical Endocrinology & Metabolism advierte que el exceso de agua puede diluir los electrolitos. Mantén un equilibrio saludable. <a href="https://academic.oup.com/jcem/article/100/9/3330/2836035" target="_blank">Ver estudio</a>. `;
    }

    if (fruitsVeg === 'none') {
        healthAssessment += 'Estudios demuestran que un bajo consumo de frutas y verduras se asocia con un mayor riesgo de enfermedades crónicas. ';
    } else if (fruitsVeg === '1-2') {
        healthAssessment += 'La investigación sugiere que aumentar el consumo de frutas y verduras puede mejorar la salud general. ';
    } else if (fruitsVeg === '5-or-more') {
        healthAssessment += 'Múltiples estudios indican que un alto consumo de frutas y verduras se asocia con una mejor salud cardiovascular y un menor riesgo de cáncer. ';
    }


// Añadimos comentarios específicos para la frecuencia de ejercicio seleccionada
if (exerciseFrequency === 'none') {
    healthAssessment += 'Has indicado que nunca haces ejercicio. La falta de actividad física se asocia con la pérdida de movilidad y de masa muscular, también aumenta el riesgo de enfermedades cardiovasculares como la diabetes tipo 2, hipertensión y cardiopatía isquémica. ' +
    'Se entiende que a veces puede ser difícil encontrar la motivación o el tiempo para hacer ejercicio. Sin embargo, incluso pequeñas actividades pueden tener un gran impacto en tu salud. Aquí tienes algunas ideas para empezar: ' +
    'Caminatas cortas: Intenta caminar durante 10-15 minutos al día. Puedes hacerlo durante tu descanso en el trabajo o después de las comidas. ' +
    'Estiramientos: Dedica unos minutos a estirarte al despertar o antes de dormir. Esto puede mejorar tu flexibilidad y reducir el estrés. ' +
    'Ejercicios en casa: Hay muchos ejercicios sencillos que puedes hacer en casa sin necesidad de equipo, como sentadillas, flexiones y abdominales. ' +
    'Actividades divertidas: Encuentra una actividad que disfrutes, como bailar, nadar o andar en bicicleta. Es más fácil mantener una rutina si te diviertes. ' +
    'Para más información, <a href="https://scielo.isciii.es/scielo.php?script=sci_arttext&pid=S1135-57272011000400001" target="_blank">Ver estudio</a>.';
} else if (exerciseFrequency === 'rarely') {
    healthAssessment += 'Has indicado que rara vez haces ejercicio. Incluso pequeñas cantidades de actividad física pueden tener beneficios para la salud, pero aumentar la frecuencia es altamente recomendable. ' +
    'Para más información, <a href="https://www.bbc.com/mundo/noticias-58823922" target="_blank">Ver estudio</a>.';
} else if (exerciseFrequency === 'sometimes') {
    healthAssessment += 'Has indicado que a veces haces ejercicio. La investigación sugiere que aumentar la consistencia de tus entrenamientos puede mejorar significativamente tu salud cardiovascular y bienestar general. ' +
    'Para más información, <a href="https://dialnet.unirioja.es/descarga/articulo/6369972.pdf" target="_blank">Ver estudio</a>.';
} else if (exerciseFrequency === 'often') {
    healthAssessment += 'Has indicado que frecuentemente haces ejercicio. Esto es excelente, ya que la evidencia científica respalda que el ejercicio regular reduce el riesgo de múltiples enfermedades crónicas y mejora la salud mental. ' +
    'Para más información, <a href="https://scielo.isciii.es/scielo.php?script=sci_arttext&pid=S1139-76322019000300019" target="_blank">Ver estudio</a>.';
} else {
    healthAssessment += 'Has indicado que haces ejercicio diariamente. Esto es excelente para tu salud general. El ejercicio diario está relacionado con una mayor esperanza de vida, mejor función cognitiva y reducción del riesgo de enfermedades crónicas. ' +
    'Para más información, <a href="https://g-se.com/articulo/t/Fitness" target="_blank">Ver estudio</a>.';
}
    healthAssessment += `Tu dieta es calificada como ${dietQuality}. La calidad de la dieta tiene un impacto significativo en la salud a largo plazo, según múltiples estudios. `;

    // Evaluación general y ajuste según género
    if (gender === 'male') {
        if (condition === 'Obesidad' || dietQuality === 'Pobre' || exerciseFrequency === 'none') {
            healthAssessment += 'La investigación sugiere que tu estilo de vida actual podría aumentar el riesgo de problemas de salud. Considera consultar a un profesional de la salud para obtener orientación personalizada.';
        } else {
            healthAssessment += 'Los estudios indican que tu estilo de vida actual se alinea con patrones asociados a una buena salud. Mantén estos hábitos para beneficios a largo plazo.';
        }
    } else if (gender === 'female') {
        if (condition === 'Obesidad' || dietQuality === 'Pobre' || exerciseFrequency === 'none') {
            healthAssessment += 'La evidencia científica sugiere que podrías beneficiarte de cambios en tu estilo de vida para reducir riesgos de salud. Consulta a un profesional para un plan personalizado.';
        } else {
            healthAssessment += 'Las investigaciones respaldan que tu estilo de vida actual está asociado con buenos resultados de salud. Continúa manteniendo estos hábitos saludables.';
        }
    }

    document.getElementById('result-text').innerHTML = healthAssessment;
    document.getElementById('result').style.display = 'block';

    drawChart(imc);
}
function drawChart(imc) {
    const ctx = document.getElementById('imc-chart').getContext('2d');
    
    let barColors = ['#87CEEB', '#4CAF50', '#FFCE56', '#FF6384'];
    let userIMCIndex, userColor;

    if (imc < 18.5) {
        barColors[0] = '#0000FF';
        userIMCIndex = 0;
        userColor = '#0000FF';
    } else if (imc < 24.9) {
        barColors[1] = '#008000';
        userIMCIndex = 1;
        userColor = '#008000';
    } else if (imc < 29.9) {
        barColors[2] = '#FFD700';
        userIMCIndex = 2;
        userColor = '#FFD700';
    } else {
        barColors[3] = '#FF0000';
        userIMCIndex = 3;
        userColor = '#FF0000';
    }

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Bajo peso', 'Normal', 'Sobrepeso', 'Obesidad'],
            datasets: [{
                label: 'IMC',
                data: [18.5, 24.9, 29.9, 34.9],
                backgroundColor: barColors,
                borderRadius: 10,
                barThickness: 30
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
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
                                content: `Tu IMC está aquí: ${imc.toFixed(2)}`,
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
