// Verkrijg het canvas element en zijn context
const canvas = document.getElementById('starfield');
const ctx = canvas.getContext('2d');

// Stel de canvas afmetingen in op het schermformaat
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Aantal sterren
const numStars = 4000;
const stars = [];

// Ster-objecten maken
for (let i = 0; i < numStars; i++) {
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    z: Math.random() * canvas.width // Diepte van de ster
  });
}

var ss=0;



// Functie om de sterren te tekenen
function drawStars() {
  ss+=.001;

  ctx.clearRect(0, 0, canvas.width, canvas.height); // Maak het canvas schoon bij elke frame
  

  stars.forEach(star => {
    const x = (Math.sin(ss)*300)+(star.x - canvas.width / 2) * (canvas.width / star.z);
    const y =  (Math.cos(ss)*300)+(star.y - canvas.height / 2) * (canvas.width / star.z);

    
    const size = (1 - star.z / canvas.width) * 3;
    ctx.beginPath();
    const fsw=Math.floor(size);
    switch(fsw){
        case 0:ctx.fillStyle = 'blue';
        break;
        case 1:ctx.fillStyle = 'purple';
        break;
        case 2:ctx.fillStyle = 'orange';
        break;
    }

    
    ctx.moveTo(x + canvas.width / 2, y + canvas.height / 2);
    ctx.arc(x + canvas.width / 2, y + canvas.height / 2, size, 0, Math.PI * 2);
    ctx.fill();
  });

  
}

// Functie om de sterren te laten bewegen (aanzienlijke snelheid afhankelijk van hun diepte)
function updateStars() {
  stars.forEach(star => {
    star.z -= 0.5; // Beweging van de ster naar de camera toe
    if (star.z <= 0) {
      star.z = canvas.width; // Zet de ster terug naar de achtergrond als hij buiten het scherm valt
    }
  });
}

// De hoofdfunctie voor de animatie
function animate() {
  updateStars();
  drawStars();
  requestAnimationFrame(animate); // Herhaal de animatie met requestAnimationFrame
}

// Start de animatie
animate();