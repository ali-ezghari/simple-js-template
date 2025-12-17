// Global variables
const root = document.documentElement;
let mainColor = "#f7882f";

let settingsMenu = document.querySelector(".settings-menu");
let backgroundBtns = document.querySelectorAll(".menu .background span");
let bulletsBtns = document.querySelectorAll(".menu .bullets span");
let sideDotsEle = document.querySelector(".side-dots");
let colorspans = document.querySelectorAll(".settings-menu .colors ul span");

let skillsSection = document.querySelector(".skills");
let skillsEles = document.querySelectorAll(".skills li .progress span");

let isRunning = 0;

keys = {
  BG_COLOR: "bgColor",
  RAND_BACKGROUND: "randbackGround",
  SHOW_BULLETS: "showBullets",
};

let images = [
  "../imgs/01.jpg",
  "../imgs/02.jpg",
  "../imgs/03.jpg",
  "../imgs/04.jpg",
  "../imgs/05.jpg",
  "../imgs/10.jpg",
];

// Start Local Storage

function initBgColor() {
  const savedColor =
    localStorage.getItem(keys.BG_COLOR) ||
    getComputedStyle(root).getPropertyValue("--main-color");

  localStorage.setItem(keys.BG_COLOR, savedColor);
  root.style.setProperty("--main-color", savedColor);
}

function isRandomBackground() {
  const isRand = localStorage.getItem(keys.RAND_BACKGROUND) || "yes";

  localStorage.setItem(keys.RAND_BACKGROUND, isRand);
  clicked(
    backgroundBtns,
    isRand === "yes" ? backgroundBtns[0] : backgroundBtns[1]
  );
  if (isRand === "yes" && !isRunning) {
    isRunning = 1;
    ranBackground();
  }
}
function initBullets() {
  const show = localStorage.getItem(keys.SHOW_BULLETS) !== "no";

  localStorage.setItem(keys.SHOW_BULLETS, show ? "yes" : "no");
  clicked(bulletsBtns, bulletsBtns[show ? 0 : 1]);
  sideDotsEle.classList.toggle("hide", !show);
}
// End Locale Storage
function clicked(list, clickedItem) {
  list.forEach((ele) => ele.classList.remove("active"));
  clickedItem.classList.add("active");
}
function ranBackground() {
  let landingBackground = document.querySelector(".landing");

  let intervalId = setInterval(() => {
    if (localStorage.getItem(keys.RAND_BACKGROUND) == "no") {
      isRunning = 0;
      clearInterval(intervalId);
    }
    landingBackground.style.backgroundImage = `url(${
      images[Math.floor(Math.random() * images.length)]
    })`;
  }, 4000);
}
function toggleMenuOnMobile() {
  let list = document.querySelector(".landing .container header ul");
  if (list.style.display === "block") {
    list.style.display = "none";
  } else list.style.display = "block";
}
function toggleSettingsMenu() {
  const icon = document.querySelector(".toggle-settings i");

  icon.classList.toggle("fa-spin");
  settingsMenu.classList.toggle("show");
}
document.querySelector(".toggle-menu").onclick = toggleMenuOnMobile;

document.querySelector(".settings-menu .toggle-settings").onclick =
  toggleSettingsMenu;

colorspans.forEach((element) => {
  if (localStorage.bgColor == getComputedStyle(element).backgroundColor) {
    clicked(colorspans, element);
  }
  element.onclick = function () {
    let bgcolor = getComputedStyle(element).backgroundColor;
    clicked(colorspans, element);
    root.style.setProperty("--main-color", bgcolor);
    localStorage.bgColor = bgcolor;
  };
});

backgroundBtns.forEach((btn) => {
  btn.onclick = () => {
    let isRand = btn.innerHTML.toLowerCase();
    clicked(backgroundBtns, btn);

    localStorage.setItem(keys.RAND_BACKGROUND, isRand);
    if (!isRunning) {
      isRunning = 1;
      ranBackground();
    }
  };
});
bulletsBtns.forEach((btn) => {
  btn.onclick = () => {
    let show = btn.innerHTML.toLowerCase();

    clicked(bulletsBtns, btn);

    localStorage.setItem(keys.SHOW_BULLETS, show);
    if (btn.classList.contains("no-btn")) {
      sideDotsEle.classList.add("hide");
    } else sideDotsEle.classList.remove("hide");
  };
});

document.querySelector(".reset-btn").onclick = function () {
  clicked(colorspans, colorspans[0]);
  root.style.setProperty("--main-color", mainColor);

  localStorage.removeItem("bgColor");
  localStorage.removeItem(keys.RAND_BACKGROUND);
  localStorage.removeItem(keys.SHOW_BULLETS);

  initBgColor();
  initBullets();
  isRandomBackground();
};

// loading progress on scroll

window.onscroll = function () {
  if (window.scrollY >= skillsSection.offsetTop - window.pageYOffset * 2) {
    skillsEles.forEach(
      (ele) => (ele.style.width = ele.getAttribute("data-progress"))
    );
  } else {
    skillsEles.forEach((ele) => (ele.style.width = 0));
  }
};

initBgColor();
initBullets();
isRandomBackground();
