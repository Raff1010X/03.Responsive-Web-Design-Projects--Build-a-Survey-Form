const projectName = 'survey-form';
var day = new Date();
var hour = day.getHours();
var min = day.getMinutes();
var mark = ":";
if (min <= 9) mark = ":0";
if (hour <= 9) hour = "0" + hour;
time = hour + mark + min;

document.getElementById("date-picker").valueAsDate = day;
document.getElementById("time-picker").value = time;

let lastKnownScrollPosition = 0;
let ticking = false;

document.getElementById("header").style.height = window.innerHeight + 'px';
document.getElementById("footer").style.height = window.innerHeight + 'px';

function doSomething(scrollPos) {
  if (scrollPos === 0) {
    document.getElementById("title").classList.remove("h1-end");
  }

  if (scrollPos > 0) {
    document.getElementById("title").classList.add("h1-end");
  }
  if (scrollPos > window.innerHeight - 10) {
    document.getElementById("title").classList.add("h1-up");
  }
  if (scrollPos <= window.innerHeight - 10) {
    document.getElementById("title").classList.remove("h1-up");
  }
  
  if (scrollPos < window.innerHeight / 3) {
    document.getElementById("description").classList.remove("p-end");
    document.getElementById("report-button").classList.remove("p-end");
    //document.getElementById("header").style.height = '100vh';
  }

  if (scrollPos >= window.innerHeight / 3) {
    document.getElementById("description").classList.add("p-end");
    document.getElementById("report-button").classList.add("p-end");
    //document.getElementById("header").style.height = 0;
  }
}

document.addEventListener("scroll", function (e) {
  lastKnownScrollPosition = window.scrollY;

  if (!ticking) {
    window.requestAnimationFrame(function () {
      doSomething(lastKnownScrollPosition);
      ticking = false;
    });

    ticking = true;
  }
});

document
  .getElementById("report-button")
  .addEventListener("click", function (e) {
    document.getElementById("description").classList.add("p-end");
    document.getElementById("report-button").classList.add("p-end");
    document.getElementById("survey-form").scrollIntoView();
  });
document.getElementById("submit").addEventListener("click", function (e) {
  document.getElementById("footer").scrollIntoView();
});

var checkbox = document.querySelectorAll("input[name=concern]");
checkbox.forEach( x=> x.addEventListener('change', function (e) { checkboxChange() }));
  function checkboxChange() {
    if (checkboxCheck())
      checkbox.forEach( x=> x.removeAttribute("required"));
    else
      checkbox.forEach( x=> x.setAttribute("required", "true"));
  }

function checkboxCheck() {
  for (let i = 0; i < checkbox.length; i++) 
    if (checkbox[i].checked) return true;
  return false;
}