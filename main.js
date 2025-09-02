(function () {
  const isDesktop = () =>
    window.matchMedia(
      "(min-width: 992px) and (hover: hover) and (pointer: fine)"
    ).matches;

  document
    .querySelectorAll(
      ".dropdown-submenu > a.dropdown-toggle, .dropdown-submenu > a"
    )
    .forEach(function (trigger) {
      trigger.addEventListener("click", function (e) {
        if (!isDesktop()) {
          e.preventDefault();
          e.stopPropagation();
          const submenu = trigger.nextElementSibling;
          if (!submenu || !submenu.classList.contains("dropdown-menu")) return;
          const parentMenu = trigger.closest(".dropdown-menu");
          parentMenu &&
            parentMenu
              .querySelectorAll(
                ":scope > .dropdown-submenu > .dropdown-menu.show"
              )
              .forEach(function (opened) {
                if (opened !== submenu) opened.classList.remove("show");
              });
          submenu.classList.toggle("show");
        }
      });
    });

  document.querySelectorAll(".navbar .dropdown").forEach(function (dd) {
    dd.addEventListener("hide.bs.dropdown", function () {
      this.querySelectorAll(".dropdown-menu.show").forEach(function (menu) {
        menu.classList.remove("show");
      });
    });
  });

  window.addEventListener("resize", function () {
    if (isDesktop()) {
      document
        .querySelectorAll(".navbar .dropdown-menu.show")
        .forEach(function (menu) {
          menu.classList.remove("show");
        });
    }
  });
})();
