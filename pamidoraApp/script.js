const timer = document.querySelector(".timer");
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const resetBtn = document.getElementById("resetBtn");

const CLOCK = function(startingMinutes, element) {
  let time = startingMinutes * 60;
  let interval;

  function startClock() {
    interval = setInterval(updateCountdown, 1000);
  }

  function stopClock(){
      clearInterval(interval);
  }

  function restartClock(){
      stopClock();
      time = startingMinutes * 60;
      startClock();
  }

  function updateCountdown() {
    console.log("mrs")

    const minutes = Math.floor(time / 60);
    let seconds = time % 60;
    element.innerText = `${minutes}:${seconds}`;
    console.log(element.innerText)
    time--;
    time = time < 0 ? 0 : time; 
  }

  return {
      start: startClock,
      stop: stopClock,
      restart: restartClock
  }
};

let mainClock = CLOCK(25,timer);

startBtn.addEventListener("click",function(){
    mainClock.start();
});

stopBtn.addEventListener("click",function(){
    mainClock.stop();
})

resetBtn.addEventListener("click",function(){
    mainClock.restart();
})







