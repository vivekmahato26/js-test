const root = document.getElementById("root");

// let numCircles = prompt("input no of circles min 3");
let numCircles = 8;

for (let index = 0; index < parseInt(numCircles); index++) {
  const circle = document.createElement("div");
  root.appendChild(circle);
  circle.style.transform = `rotate(0deg) translate(0px) scale(0.2)`;
  const interval = setInterval(() =>animate(), 3500);
  
  const animate = () => {
      setTimeout(()=>{
              let rotation = ((index) * 360) / numCircles;
              circle.style.transform = `rotate(-${rotation}deg) translate(30px) scale(1)`;
      },1500)
      circle.style.transform = `rotate(0deg) translate(0px) scale(0.2)`;
  };
}
