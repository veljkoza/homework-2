'use strict'
const timer = document.querySelector(".timer");
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const resetBtn = document.getElementById("resetBtn");

const pomodoro = document.querySelector("#pomodoro");
const shortBreak = document.querySelector("#shortBreak");
const longBreak = document.querySelector("#longBreak");

const audio = document.getElementById("#audio")

let currentTab;

let mainClock;

const CLOCK = function(element) {
  let startingMinutes = 25;
  let time = startingMinutes * 60;
  let interval;

  function startClock() {
    stopClock();
    interval = setInterval(updateCountdown, 1000);
  }

  function stopClock() {
    clearInterval(interval);
  }

  function restartClock(){
      stopClock();
      time = startingMinutes * 60;
      startClock();
  }

  function setClock(minutes){
    setTime(minutes);
    time = startingMinutes * 60;
  }


  function setTime(minutes) {
    startingMinutes = minutes;
    console.log(startingMinutes)

  }

  function updateCountdown() {
    console.log("mrs");

    const minutes = Math.floor(time / 60);
    let seconds = time % 60;
    element.innerText = `${minutes}:${seconds}`;
    console.log(element.innerText);
    time--;
    if(time === 0){
      audio.play()
    }
    time = time < 0 ? 0 : time;
    document.title = `${minutes}:${seconds}` + currentTab;
  }

  return {
    start: startClock,
    stop: stopClock,
    setClock: setClock,
    setTime: setTime,
    restart: restartClock,
    startingMinutes: startingMinutes,
  };
};

mainClock = CLOCK(timer);


pomodoro.addEventListener("click", function() {
  mainClock.stop();
  console.log("!")
  timer.innerHTML = "25:00"
  mainClock.setClock(25);
  startBtn.disabled = false;
  currentTab = "(pomodoro)";
});

longBreak.addEventListener("click", function() {
  mainClock.stop();
  console.log("2!")
  timer.innerHTML = "10:00"
  mainClock.setClock(10);
  startBtn.disabled = false;
  currentTab = "(long break)";
});

shortBreak.addEventListener("click", function() {
  mainClock.stop();
  console.log("3!")
  timer.innerHTML = "05:00"
  mainClock.setClock(5);
  startBtn.disabled = false;
  currentTab = "(short break)";
});

startBtn.addEventListener("click", function() {
  startBtn.disabled = true;
  mainClock.start();
});

stopBtn.addEventListener("click", function() {
  startBtn.disabled = false;
  mainClock.stop();
});

resetBtn.addEventListener("click", function() {
  console.log(mainClock.current)
  // switch(mainClock.current){
  //   case 25:
  //     mainClock.setClock(25);
  //     console.log("aaa");
  //     break;
  //     case 5:
  //     mainClock.setClock(5);
  //     console.log("ava");
  //     break;
  //     case 10:
  //     mainClock.setClock(10);
  //     console.log("aca");

  //     break;
  // }
  mainClock.restart();
});
