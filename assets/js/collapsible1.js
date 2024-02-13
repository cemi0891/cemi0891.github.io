$(document).ready(function() {
  $(".menu-item, .sub-menu-item").click(function(event) {
      event.stopPropagation();

      // 1. Quitar la clase "activado" de cualquier otro elemento
      $(".menu-item, .sub-menu-item").removeClass("active");

      // 2. Agregar la clase "activado" al elemento actual
      $(this).addClass("active");

      var subMenu = $(this).next(".sub-menu");
      if (subMenu.length > 0) {
          // Tu lógica para mostrar/ocultar submenú
          $(this).toggleClass("active");
          subMenu.slideToggle();
      }
  });
});

// var coll = document.getElementsByClassName("collapsible");
// var i;

// for (i = 0; i < coll.length; i++) {
//   coll[i].addEventListener("click", function() {
//     this.classList.toggle("active");
//     var content = this.nextElementSibling;
//     if (content.style.display === "block") {
//       content.style.display = "none";
//     } else {
//       content.style.display = "block";
//     }
//   });
// }