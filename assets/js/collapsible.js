$(document).ready(function(){
  $(".menu-item, .sub-menu-item").click(function(event){
  event.stopPropagation(); // Prevent the click event from propagating to the parent menu item

  var subMenu = $(this).next(".sub-menu");
  
  if (subMenu.length > 0) {
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