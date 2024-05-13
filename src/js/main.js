import "../scss/style.scss";
import chroma from "chroma-js";
import { handleClick, saveLocationHash, getColorsFromHash } from "./function";

const main = document.querySelector(".main");
const collumnItems = main.querySelectorAll(".collumn-section__item");

// Ручная генерация разных цветов

// function generateRandomColor() {
//   const hexCodes = "0123456789ABCDEF";
//   let color = ``;

//   for (let i = 0; i < 6; i++) {
//     color += hexCodes[Math.floor(Math.random() * hexCodes.length)];
//   }

//   return "#" + color;
// }

function setRenderColors(isInitial) {
  const colors = isInitial ? getColorsFromHash() : [];
  collumnItems.forEach((col, index) => {
    const iconLock = col.querySelector("i");

    // благодаря методу forEach проверяем каждую кнопку и title в артиклях
    const title = col.querySelector(".collumn__title");
    const btnLock = col.querySelector(".collumn__btn");

    const isLocked = iconLock.classList.contains("fa-lock");

    if (isLocked) {
      colors.push(title.textContent);
      return;
    }

    const color = isInitial
      ? colors[index]
        ? colors[index]
        : chroma.random()
      : chroma.random();

    if (!isInitial) {
      colors.push(color);
    }

    title.textContent = color;
    col.style.background = color;

    setTextColor(title, color);
    setTextColor(btnLock, color);

    saveLocationHash(colors);
  });
}

function setTextColor(text, color) {
  const luminance = chroma(color).luminance();
  text.style.color = luminance > 0.5 ? "black" : "white";
}

setRenderColors(true);
// ф-ция изменения цвета на пробел

document.addEventListener("keydown", clickSpace);

function clickSpace(evt) {
  evt.preventDefault();
  if (evt.code.toLowerCase() == "space") {
    setRenderColors();
  }
}

// функция изменения значка открыт на закрыт и копирования цвета

document.addEventListener("click", handleClick);
