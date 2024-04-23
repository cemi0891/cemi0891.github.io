function itemMenu(config) {
    var ulMenu = document.getElementById("menu");
  var openSubMenu = null; // Almacena el submenú abierto actualmente

  for (var i = 0; i < config.length; i++) {
    var divElement = document.createElement("div");
    divElement.className = "menu-item";
    divElement.textContent = `${config[i].periodo}`;

    var subMenu = document.createElement("div");
    subMenu.className = "sub-menu";

    for (const subitem of config[i].anios) {
      var subElement = document.createElement("div");
      subElement.className = "sub-menu-item";
      subElement.textContent = `${subitem.anio}`;

      var subSubMenu = document.createElement("div");
      subSubMenu.className = "sub-menu";

      for (const lastlevel of subitem.documentos) {
        var subSubElement = document.createElement("div");
        subSubElement.className = "sub-menu-item";
        subSubElement.textContent = `${lastlevel.titulo}`;
        subSubElement.onclick = () => {
          showPDF(lastlevel.url,lastlevel.url2);
          let i = document.getElementById('previsual');
          window.scrollTo({
            top: 0,
            behavior: 'smooth'
          });
        } 
        subSubMenu.appendChild(subSubElement);
      }  

      subMenu.appendChild(subElement);
      subMenu.appendChild(subSubMenu);
    }

    divElement.appendChild(subMenu);

    // Agrega lógica para manejar el colapso y expansión
    divElement.addEventListener("click", function() {
      var clickedSubMenu = this.querySelector(".sub-menu");

      // Cierra el submenú abierto actualmente
      if (openSubMenu && openSubMenu !== clickedSubMenu) {
        openSubMenu.classList.remove("active");
      }

      // Alterna la visibilidad del submenú clicado
      if (clickedSubMenu) {
        clickedSubMenu.classList.toggle("active");
        openSubMenu = clickedSubMenu.classList.contains("active") ? clickedSubMenu : null;
      }
    });

    ulMenu.appendChild(divElement);
  }
}