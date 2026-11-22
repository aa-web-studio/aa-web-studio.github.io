/* Базовая защита контента: запрет перетаскивания и контекстного меню на изображениях */

document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll("img").forEach(function (img) {
    img.setAttribute("draggable", "false");
    img.addEventListener("contextmenu", function (e) {
      e.preventDefault();
    });
    img.addEventListener("dragstart", function (e) {
      e.preventDefault();
    });
  });
});
