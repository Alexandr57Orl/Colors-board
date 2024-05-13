// функция изменения значка открыт на закрыт

export function handleClick(evt) {
  const type = evt.target.dataset.type;

  if (type === "lock") {
    const node =
      evt.target.tagName.toLowerCase() === "i" ? evt.target : evt.childer[0];
    node.classList.toggle("fa-unlock-alt");
    node.classList.toggle("fa-lock");
  } else if (type === "copy") {
    copyTextColor(evt.target.textContent);
  }
}

// ф-ция копирования цвета

export function copyTextColor(text) {
  return navigator.clipboard.writeText(text);
}

export function saveLocationHash(colors = []) {
  document.location.hash = colors
    .map((col) => col.toString().substring(1))
    .join("-");
}

export function getColorsFromHash() {
  if (document.location.hash.length > 1) {
    return document.location.hash
      .substring(1)
      .split("-")
      .map((color) => "#" + color);
  }
  return [];
}
