const regions = [
    "Bretagne",
    "Normandie",
    "Île-de-France",
    "Nouvelle-Aquitaine"
];

let current = 0;
let score = 0;

const question = document.getElementById("question");
const scoreDisplay = document.getElementById("score");

question.textContent = "Cliquez sur : " + regions[current];

document.querySelectorAll("path").forEach(region => {
    region.addEventListener("click", function() {
        if (this.id === regions[current]) {
            this.style.fill = "green";
            score++;
        } else {
            this.style.fill = "red";
        }

        current++;

        if (current < regions.length) {
            question.textContent = "Cliquez sur : " + regions[current];
        } else {
            question.textContent = "Quiz terminé !";
        }

        scoreDisplay.textContent = "Score : " + score;
    });
});
