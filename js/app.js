// navigation //
const nav = document.querySelector(".nav");
window.addEventListener("scroll", () => {
  const rect = window.pageYOffset;
  if (rect > 20) {
    nav.classList.add("active");
  } else {
    nav.classList.remove("active");
  }
});

// mobile navigation
const nav_menu = document.querySelector(".nav__menu");
const nav_btn = document.querySelector(".menu_btn");
const body = document.querySelector("body");

nav_btn.addEventListener("click", () => {
  body.classList.toggle("active");
  nav_btn.classList.toggle("active");
  nav_menu.classList.toggle("active");
});

// menu link active
const lok = document.querySelectorAll(".lok");
const link = document.querySelectorAll(".nav__menu_links");
// console.log(lok)
window.addEventListener("scroll", () => {
  lok.forEach((e) => {
    const scroll = window.scrollY;
    const rect = e.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    if (rect.top + 500 < windowHeight && rect.bottom > 0) {
      link.forEach((e2) => {
        e2.classList.remove("active");
        const eData = e.dataset.lok;
        const e2Data = e2.dataset.lok;
        eData == e2Data
          ? e2.classList.add("active")
          : e2.classList.remove("active");
      });
    }
    if (scroll < 1000) {
      link.forEach((e2) => {
        e2.classList.remove("active");
      });
    }
  });
});

// scroll navar
const scrollBox = document.querySelector(".scroll");
const rangeScroll = document.querySelector(".scroll__box_range");
const designCon = document.querySelector(".design");

window.addEventListener("scroll", () => {
  const rect = designCon.getBoundingClientRect();
  const windowHeight = window.innerHeight;
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrolled = (scrollTop / docHeight) * 100;
  rangeScroll.style.width = `${scrolled}%`;
  if (scrollTop > 0) {
    scrollBox.style.opacity = 1;
  } else {
    scrollBox.style.opacity = 0;
  }
  if (rect.top + 330 < windowHeight && rect.bottom - 250 > 0) {
    scrollBox.style.color = "#fff";
  } else {
    scrollBox.style.color = "#000";
  }
});

// motion efect

const tracker = document.querySelectorAll(".tracker");
document.addEventListener("mousemove", (e) => {
  const x = (e.clientX / window.innerWidth - 0.5) * -80; // بین -20 تا +20
  tracker.forEach((e) => {
    e.style.transform = `translateX(${x}px)`;
  });
});

if (
  typeof DeviceOrientationEvent !== "undefined" &&
  typeof DeviceOrientationEvent.requestPermission === "function"
) {
  DeviceOrientationEvent.requestPermission()
    .then((permissionState) => {
      if (permissionState === "granted") {
        window.addEventListener("deviceorientation", handleOrientation);
      }
    })
    .catch(console.error);
} else {
  window.addEventListener("deviceorientation", handleOrientation);
}

function handleOrientation(event) {
  const x = event.gamma; // چرخش گوشی به چپ/راست
  const y = event.beta; // خم شدن گوشی به جلو/عقب
  tracker.forEach((e) => {
    e.style.transform = `translate(${x * 1}px, ${y * 1}px)`;
  });
}

// num scale
const title_num = document.querySelector(".features_title_num");
window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const windowHeight = window.innerHeight;
  const rect = title_num.getBoundingClientRect();
  if (2100 < scrollTop < 2200) {
    const scrollPercent = rect.top / windowHeight; // بین 0 تا 1
    const scale = 1 + scrollPercent * 0.3;
    title_num.style.transform = `scale(${scale})`;
  } else {
    title_num.style.transform = `scale(1)`;
  }
});

// rotate headphone

const feature = document.querySelector(".features_middle");
const headphone = document.querySelector(".features_middle_left_img");
const text_trans = document.querySelector(".translate_text");

window.addEventListener("scroll", () => {
  const rect = feature.getBoundingClientRect();
  const containerHeight = feature.offsetHeight;
  const windowHeight = window.innerHeight;
  // let scrollY = window.scrollY;
  if (rect.top < windowHeight && rect.bottom > 0) {
    const scrollInContainer = Math.min(
      containerHeight,
      windowHeight - rect.top
    );
    const percentScrolled = scrollInContainer / containerHeight;

    const rotation = percentScrolled * 30; // 0 تا 360 درجه
    headphone.style.transform = `rotate(-${rotation}deg) translateX(${
      -150 + rotation
    }px)`;
    text_trans.style.left = `${-50 - rotation * 10}px`;
  }
});

// num scale
const title_text = document.getElementById("title_text");
window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const windowHeight = window.innerHeight;
  const rect = title_text.getBoundingClientRect();
  if (4800 < scrollTop < 5200) {
    const scrollPercent = rect.top / windowHeight; // بین 0 تا 1
    const scale = 1 + scrollPercent * 0.25;
    const opacity = 1 - scrollPercent;
    title_text.style.transform = `scale(${scale})`;
    title_text.style.opacity = `${opacity}`;
  } else {
    title_text.style.opacity = `1`;
    title_text.style.transform = `scale(1)`;
  }
});

//
const slider = document.getElementById("slider");
const slides = document.querySelector(".slides");

// ⭐ فقط کلیک چپ برای درگ
let isDown = false;
let startX;
let scrollLeft;

slider.addEventListener("mousedown", (e) => {
  if (e.button !== 0) return; // فقط کلیک چپ
  isDown = true;
  slider.classList.add("active");
  startX = e.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
});

slider.addEventListener("mouseleave", () => {
  isDown = false;
  slider.classList.remove("active");
});

slider.addEventListener("mouseup", () => {
  isDown = false;
  slider.classList.remove("active");
});

slider.addEventListener("mousemove", (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - slider.offsetLeft;
  const walk = (x - startX) * 1.5; // سرعت حرکت
  slider.scrollLeft = scrollLeft - walk;
});

// ⭐ اسکرول خودکار
const scrollStep = slides.clientWidth + 80;
const interval = 3000; // هر چند میلی‌ثانیه حرکت کنه

setInterval(() => {
  if (slider.scrollLeft + slider.clientWidth >= slider.scrollWidth - 1) {
    slider.scrollTo({ left: 0, behavior: "smooth" });
  } else {
    slider.scrollBy({ left: scrollStep, behavior: "smooth" });
  }
}, interval);

const customCursor = document.getElementById("custom-cursor");

// وقتی موس وارد اسلایدر شد، نشانگر سفارشی رو نشون بده
slider.addEventListener("mouseenter", () => {
  customCursor.style.opacity = "1";
});

// وقتی موس از اسلایدر خارج شد، نشانگر مخفی بشه
slider.addEventListener("mouseleave", () => {
  customCursor.style.opacity = "0";
});

// موس حرکت کرد، نشانگر حرکت کنه دقیقاً دنبال موس
window.addEventListener("mousemove", (e) => {
  customCursor.style.top = e.clientY + "px";
  customCursor.style.left = e.clientX + "px";
});

// testomonials
const comment = document.querySelectorAll(".user_Comment");
const totalSlides = comment.length;
let index = 0;

setInterval(() => {
  index++;
  comment.forEach((e) => {
    e.classList.remove("active");
  });
  if (index >= totalSlides) {
    index = 0;
  }
  comment[index].classList.add("active");
}, 4000); // هر ۴ ثانیه

// fade
const fade_up = document.querySelectorAll(".fade");
const fade_right = document.querySelectorAll(".fade_r");
const fade_left = document.querySelectorAll(".fade_l");
const fade_s = document.querySelectorAll(".fade_s");
const fade_o = document.querySelectorAll(".fade_o");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.delay || "0s";
        entry.target.style.transitionDelay = delay;
        entry.target.classList.add("show");
      }
    });
  },
  {
    threshold: 0.4,
  }
);

fade_up.forEach((el) => observer.observe(el));
fade_left.forEach((el) => observer.observe(el));
fade_right.forEach((el) => observer.observe(el));
fade_s.forEach((el) => observer.observe(el));
fade_o.forEach((el) => observer.observe(el));
