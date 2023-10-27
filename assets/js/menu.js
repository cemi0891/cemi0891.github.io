function itemMenu(config) {
  var ulMenu = document.getElementById("menu");
  
  for (var i = 0; i < config.length; i++) {
    // Crear un nuevo elemento <div> y establecer su contenido HTML
    var divElement = document.createElement("div");
    divElement.className = "poblacion__opciones poblacion__opciones--1";
    var periodo = `
        <input type="checkbox" name="acordeon" id="btn-acordeon1" class="btn-acordeon">
        <label for="btn-acordeon1" class="header--opciones"><span class="icon-books dropdown__icon"></span>${config[i].periodo}<span class="icon-circle-down dropdown__arrow"></span></label>
    `;
    
    var anios = "";
    for (const subitem of config[i].anios) {
        var anio = `
            <div class="contenido__opciones">
                <ul class="dropdown__sub">
                    <div class="poblacion__opciones--submenu">
                        <input type="radio" name="acordeon" id="btn-acordeon2" class="btn-acordeon">
                        <label for="btn-acordeon2" class="header--opciones--submenu"><span class="icon-folder dropdown__icon" style="margin-right: 5px;"></span> ${subitem.anio} <span class="icon-circle-down dropdown__arrow"></span></label>
                                    
        `;

        for (const lastlevel of subitem.documentos) {
            if(lastlevel.titulo != "") {
                var documento = `
                    <div class="contenido__opciones">
                        <ul class="dropdown__sub">
                            <li class="dropdown__li mayor" style="margin-left: 0;">
                                <a class="amarillo" id="selected" onclick="showPDF('${lastlevel.url}');"><span class="icon-file-text" style="margin: 5px;"></span>${lastlevel.titulo}</a>
                            </li>
                        </ul>
                    </div>
                `;
                anio = anio.concat(documento);        
            }
        }
        
        anio = anio.concat(`
                    </div>
                </ul>
            </div>
        `);

        anios = anios.concat(anio);
    }
    periodo = periodo.concat(anios);
    divElement.innerHTML = periodo;
  
    ulMenu.appendChild(divElement);
  }
}