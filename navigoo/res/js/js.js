let [mobileNavMenuBtn, mobileNavMenu, main, footer] = [
  document.getElementById("mobile-nav-menu-btn"),
  document.getElementById("mobile-nav-menu"),
  document.getElementsByTagName("main")[0],
  document.getElementsByTagName("footer")[0],
];

document
  .querySelectorAll("#mobile-nav-menu-btn, #mobile-nav-menu li")
  .forEach((element) => {
    element.addEventListener("click", function toggleMobileNavMenu() {
      mobileNavMenuBtn.classList.toggle("active");
      mobileNavMenu.classList.toggle("active");
      main.classList.toggle("blurred");
      footer.classList.toggle("blurred");
    });
  });

/* JS Validated 2022-09-22 */
