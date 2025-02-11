const API_KEY = "7egJwh3UTcQtQA0Y5hsKA7FfaBVCJChmWZWkz3a6";  // Replace with your USDA API key

function calculateBMI() {
    let user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
        alert("🚫 Please sign up or log in to use the BMI calculator!");
        return;
    }

    let age = document.getElementById("age").value;
    let height = document.getElementById("height").value / 100; // Convert cm to meters
    let weight = document.getElementById("weight").value;
    let bmi = (weight / (height * height)).toFixed(2);

    let category = "";
    let tips = "";
    let query = "";

    if (bmi < 18.5) {
        category = "Underweight 😔";
        tips = "Increase protein intake, eat more frequently, and strength train.";
        query = "high protein foods";
    } else if (bmi >= 18.5 && bmi < 24.9) {
        category = "Healthy ✅";
        tips = "Maintain a balanced diet and stay active.";
        query = "balanced diet foods";
    } else if (bmi >= 25 && bmi < 29.9) {
        category = "Overweight ⚠️";
        tips = "Exercise regularly, avoid junk food, and stay hydrated.";
        query = "low calorie foods";
    } else {
        category = "Obese 🚨";
        tips = "Consult a doctor, focus on low-calorie diet and daily exercise.";
        query = "low fat foods";
    }

    document.getElementById("bmiValue").textContent = bmi;
    document.getElementById("bmiCategory").textContent = category;
    document.getElementById("healthTips").textContent = tips;

    // Animate result section
    let resultContainer = document.querySelector(".result-container");
    resultContainer.style.opacity = "1";
    resultContainer.style.transform = "translateY(0)";

    fetchNutritionData(query);
}
// Dark Mode Toggle
document.getElementById("darkModeToggle").addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");
    let isDarkMode = document.body.classList.contains("dark-mode");
    localStorage.setItem("darkMode", isDarkMode);
    this.textContent = isDarkMode ? "☀️ Light Mode" : "🌙 Dark Mode";
});

// Keep dark mode active if previously enabled
window.onload = function () {
    if (localStorage.getItem("darkMode") === "true") {
        document.body.classList.add("dark-mode");
        document.getElementById("darkModeToggle").textContent = "☀️ Light Mode";
    }
};

// Voice Assistant (Text-to-Speech)
document.getElementById("speakBtn").addEventListener("click", function () {
    let text = `Your BMI is ${document.getElementById("bmiValue").textContent}. 
                Category: ${document.getElementById("bmiCategory").textContent}. 
                Health Tip: ${document.getElementById("healthTips").textContent}`;
    
    let speech = new SpeechSynthesisUtterance(text);
    speech.rate = 1; // Normal speaking speed
    speech.pitch = 1;
    speech.volume = 1;
    
    window.speechSynthesis.speak(speech);
});

// Fetch USDA Nutrition Data
function fetchNutritionData(query) {
    const API_KEY = "YOUR_USDA_API_KEY";  // Replace with your USDA API key
    const url = `https://api.nal.usda.gov/fdc/v1/foods/search?query=${query}&pageSize=5&api_key=${API_KEY}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayFoodData(data.foods);
        })
        .catch(error => console.error("Error fetching food data:", error));
}

// Display Nutrition Data
function displayFoodData(foods) {
    let foodList = "<h3>Recommended Foods</h3><ul>";
    foods.forEach(food => {
        foodList += `<li>${food.description} - <strong>${food.foodNutrients[0]?.nutrientName}: ${food.foodNutrients[0]?.value} ${food.foodNutrients[0]?.unitName}</strong></li>`;
    });
    foodList += "</ul>";
    
    let foodData = document.getElementById("foodData");
    foodData.innerHTML = foodList;

    // Animate food recommendation section
    foodData.style.opacity = "1";
    foodData.style.transform = "translateX(0)";
}
// Function to generate a random color
function getRandomColor() {
    return `hsl(${Math.floor(Math.random() * 360)}, 100%, 70%)`; // Random Hue, Full Saturation, Lightness 70%
}

// Change background color every 0.3s for 8,000 unique colors
let colorCount = 0;
const maxColors = 8000;
function changeBackgroundColor() {
    if (colorCount < maxColors) {
        document.body.style.background = getRandomColor();
        colorCount++;
        setTimeout(changeBackgroundColor, 300);
    }
}

// Start the background color animation on page load
window.onload = changeBackgroundColor;

