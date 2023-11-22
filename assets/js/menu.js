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
          showPDF(lastlevel.url);
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

//   var ulMenu = document.getElementById("menu");
//     for (var i = 0; i < config.length; i++) {
//         var divElement = document.createElement("div");
//         divElement.className = "menu-item";
//         divElement.textContent = `${config[i].periodo}`;
        
//         // divElement.innerHTML = `   
//         //     <div class="menu-item">Menu Item 1</div>
//         //     <div class="sub-menu">
//         //     <div class="sub-menu-item">Sub-Menu Item 1.1</div>


//         //     <div class="sub-menu">
//         //         <div class="sub-menu-item">Sub-Menu Item 1.1.1</div>
//         //         <div class="sub-menu-item">Sub-Menu Item 1.1.2</div>
//         //     </div>
//         //     <div class="sub-menu-item">Sub-Menu Item 1.2</div>
//         //     </div>
            
//         //     <div class="menu-item">Menu Item 2</div>
//         //     <div class="sub-menu">
//         //     <div class="sub-menu-item">Sub-Menu Item 2.1</div>
//         //     <div class="sub-menu-item">Sub-Menu Item 2.2</div>
//         //     </div>
//         // `;

//         for (const subitem of config[i].anios) {
//             var subElement = document.createElement("div");
//             subElement.className = "sub-menu";
//             subElement.textContent = `${subitem.anio}`;


//             var subElementItem = document.createElement("div");
//             subElementItem.className = "sub-menu-item";
//             subElementItem.textContent = `${subitem.anio}`;

//             subElement.appendChild(subElementItem);
//             divElement.appendChild(subElement);
//         }


//         ulMenu.appendChild(divElement);
//     } 
  
//   for (var i = 0; i < config.length; i++) {
//     // Crear un nuevo elemento <div> y establecer su contenido HTML
//     var divElement = document.createElement("div");
//     divElement.className = "poblacion__opciones poblacion__opciones--1";
//     var periodo = `
//         <input type="checkbox" name="acordeon" id="btn-acordeon1" class="btn-acordeon">
//         <label for="btn-acordeon1" class="header--opciones"><span class="icon-books dropdown__icon"></span>${config[i].periodo}<span class="icon-circle-down dropdown__arrow"></span></label>
//     `;
    
//     var anios = "";
//     for (const subitem of config[i].anios) {
//         var anio = `
//             <div class="contenido__opciones">
//                 <ul class="dropdown__sub">
//                     <div class="poblacion__opciones--submenu">
//                         <input type="radio" name="acordeon" id="btn-acordeon2" class="btn-acordeon">
//                         <label for="btn-acordeon2" class="header--opciones--submenu"><span class="icon-folder dropdown__icon" style="margin-right: 5px;"></span> ${subitem.anio} <span class="icon-circle-down dropdown__arrow"></span></label>
                                    
//         `;

//         for (const lastlevel of subitem.documentos) {
//             if(lastlevel.titulo != "") {
//                 var documento = `
//                     <div class="contenido__opciones">
//                         <ul class="dropdown__sub">
//                             <li class="dropdown__li mayor" style="margin-left: 0;">
//                                 <a class="amarillo" id="selected" onclick="showPDF('${lastlevel.url}');"><span class="icon-file-text" style="margin: 5px;"></span>${lastlevel.titulo}</a>
//                             </li>
//                         </ul>
//                     </div>
//                 `;
//                 anio = anio.concat(documento);        
//             }
//         }
        
//         anio = anio.concat(`
//                     </div>
//                 </ul>
//             </div>
//         `);

//         anios = anios.concat(anio);
//     }
//     periodo = periodo.concat(anios);
//     divElement.innerHTML = periodo;
  
    // ulMenu.appendChild(divElement);
//   }
}