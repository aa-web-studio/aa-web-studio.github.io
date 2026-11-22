/* Рендер сетки портфолио из SITE_PROJECTS (projects-data.js) + фильтры */

document.addEventListener("DOMContentLoaded", function () {
  var grid = document.getElementById("projects-grid");
  if (!grid || typeof SITE_PROJECTS === "undefined") return;

  var filtersBox = document.getElementById("filters");
  var CATEGORY_LABELS = {
    all: "Все",
    landing: "Лендинги",
    multi: "Многостраничные",
    shop: "Магазины"
  };

  function esc(str) {
    var div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }

  function cardHTML(project) {
    var tags = (project.tags || [])
      .map(function (tag) {
        return '<span class="tag">' + esc(tag) + "</span>";
      })
      .join("");

    return (
      '<article class="card work-card reveal" data-category="' +
      esc(project.category) +
      '">' +
      '<div class="work-preview"><span>' +
      esc(project.icon || "🌐") +
      "</span></div>" +
      '<div class="work-body">' +
      '<h3 class="work-title">' +
      esc(project.title) +
      "</h3>" +
      '<p class="work-desc">' +
      esc(project.desc) +
      "</p>" +
      '<div class="tags">' +
      tags +
      "</div>" +
      '<div class="work-actions">' +
      '<a class="btn btn-primary btn-sm" href="' +
      esc(project.url || "#") +
      '" target="_blank" rel="noopener">Посмотреть сайт вживую</a>' +
      '<a class="btn btn-ghost btn-sm" href="contact.html?type=' +
      encodeURIComponent(project.category) +
      '&project=' +
      encodeURIComponent(project.id) +
      '">Заказать такой же</a>' +
      "</div></div></article>"
    );
  }

  function render(category) {
    var list =
      category === "all"
        ? SITE_PROJECTS
        : SITE_PROJECTS.filter(function (p) {
            return p.category === category;
          });

    grid.innerHTML = list.length
      ? list.map(cardHTML).join("")
      : '<p style="color: var(--text-dim)">В этой категории пока нет проектов.</p>';

    grid.querySelectorAll(".reveal").forEach(function (el) {
      el.classList.add("visible");
    });
  }

  if (filtersBox) {
    var buttons = filtersBox.querySelectorAll(".filter-btn");
    buttons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        buttons.forEach(function (b) {
          b.classList.remove("active");
        });
        btn.classList.add("active");
        render(btn.dataset.category);
      });
    });
  }

  render("all");
});
