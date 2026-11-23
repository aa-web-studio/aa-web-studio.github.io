/* Форма заявки на contact.html: подстановка типа сайта из ссылки и сохранение заявки */

document.addEventListener("DOMContentLoaded", function () {
  var form = document.getElementById("order-form");
  if (!form) return;

  var success = document.getElementById("form-success");
  var typeSelect = document.getElementById("field-type");
  var paymentSelect = document.getElementById("field-payment");
  var openedAt = Date.now();

  var params = new URLSearchParams(window.location.search);
  var type = params.get("type");
  var projectId = params.get("project");

  if (type && typeSelect) {
    typeSelect.value = type;
  }

  var commentField = document.getElementById("field-comment");
  if (projectId && commentField && !commentField.value) {
    var project = (typeof SITE_PROJECTS !== "undefined" ? SITE_PROJECTS : []).find(function (p) {
      return p.id === projectId;
    });
    if (project) {
      commentField.value = "Здравствуйте! Хочу заказать сайт как «" + project.title + "».";
    }
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    var name = document.getElementById("field-name").value.trim();
    var contact = document.getElementById("field-contact").value.trim();
    if (!name || !contact) return;

    var honeypot = document.getElementById("field-company").value.trim();
    var elapsed = Date.now() - openedAt;
    var looksLikeBot = honeypot !== "" || elapsed < 2000;

    if (!looksLikeBot) {
      var orders = [];
      try {
        orders = JSON.parse(localStorage.getItem("site_orders") || "[]");
      } catch (err) {
        orders = [];
      }

      orders.push({
        date: new Date().toISOString(),
        name: name,
        contact: contact,
        type: typeSelect ? typeSelect.value : "",
        payment: paymentSelect ? paymentSelect.value : "",
        comment: commentField ? commentField.value.trim() : ""
      });
      localStorage.setItem("site_orders", JSON.stringify(orders));
    }

    form.style.display = "none";
    if (success) success.classList.add("show");

    var typeLabels = {
      landing: "Лендинг",
      multi: "Многостраничный сайт",
      shop: "Интернет-магазин",
      other: "Другое"
    };
    var paymentLabels = {
      usdt: "Крипта (USDT TRC20)",
      card: "Банковская карта",
      agreed: "По договорённости"
    };
    if (!looksLikeBot) {
      var message =
        "Здравствуйте, Andrey! Хочу заказать сайт.\n\n" +
        "Имя: " + name + "\n" +
        "Контакт: " + contact + "\n" +
        "Тип сайта: " + (typeLabels[typeSelect ? typeSelect.value : ""] || "Не указан") + "\n" +
        "Оплата: " + (paymentLabels[paymentSelect ? paymentSelect.value : ""] || "Не указан") + "\n";
      var comment = commentField ? commentField.value.trim() : "";
      if (comment) message += "Комментарий: " + comment;

      var tg = document.getElementById("success-tg-link");
      if (tg) {
        tg.href = "https://t.me/Andrey_AlexandrovichAA?text=" + encodeURIComponent(message);
      }
      window.open(tg ? tg.href : "https://t.me/Andrey_AlexandrovichAA", "_blank");
    }
  });
});
