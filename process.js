const fs = require('fs');
const path = require('path');

const baseDir = 'd:/Proyectos/final/git/cemi0891.github.io/documentacion';
const templatePath = path.join(baseDir, 'chiapas/actas_chiapas.html');
const templateStr = fs.readFileSync(templatePath, 'utf8');

const filesToProcess = [
    {file: 'chiapas/informes_chiapas.html', state: 'Chiapas', abbr: 'chi'},
    {file: 'chiapas/minuta_chiapas.html', state: 'Chiapas', abbr: 'chi'},
    {file: 'chiapas/peeg_chiapas.html', state: 'Chiapas', abbr: 'chi'},
    {file: 'chiapas/programa_anual_chiapas.html', state: 'Chiapas', abbr: 'chi'},
    
    {file: 'oaxaca/actas_oaxaca.html', state: 'Oaxaca', abbr: 'oax'},
    {file: 'oaxaca/informes_oaxaca.html', state: 'Oaxaca', abbr: 'oax'},
    {file: 'oaxaca/minuta_oaxaca.html', state: 'Oaxaca', abbr: 'oax'},
    {file: 'oaxaca/peeg1_oaxaca.html', state: 'Oaxaca', abbr: 'oax'},
    {file: 'oaxaca/programa_anual_oaxaca.html', state: 'Oaxaca', abbr: 'oax'},
    
    {file: 'tabasco/actas_tabasco.html', state: 'Tabasco', abbr: 'tab'},
    {file: 'tabasco/informes_tabasco.html', state: 'Tabasco', abbr: 'tab'},
    {file: 'tabasco/pat_tabasco.html', state: 'Tabasco', abbr: 'tab'},
    {file: 'tabasco/peeg_tabasco.html', state: 'Tabasco', abbr: 'tab'},
    {file: 'tabasco/minutas_tabasco.html', state: 'Tabasco', abbr: 'tab'}
];

const footers = {
    'Chiapas': `
                <div class="footer-column">
                    <h4>Departamento de Comité Estatal</h4>
                    <p>Jefe de Departamento:</p>
                    <p>María Luisa Mora Vicencio</p>
                    <p style="margin-top: 10px;">Tel: 961 618 7260, Ext: 6618</p>
                    <p><a href="mailto:luisa.mora@inegi.org.mx"
                            style="color: #9ca3af; text-decoration: none;">luisa.mora@inegi.org.mx</a></p>
                </div>

                <div class="footer-column">
                    <h4>Ubicación</h4>
                    <p>Coordinación Estatal Chiapas</p>
                    <p>Libramiento Norte Poniente 3850</p>
                    <p>Plan de Ayala, Planta Baja</p>
                    <p>Tuxtla Gutiérrez, Chiapas.</p>
                </div>
`,
    'Oaxaca': `
                <div class="footer-column">
                    <h4>Departamento de Comité Estatal</h4>
                    <p>Jefe de Departamento:</p>
                    <p>Daniel Sánchez Gutiérrez</p>
                    <p style="margin-top: 10px;">Tel: 951 512 4800, Ext: 2674</p>
                    <p><a href="mailto:daniel.sanchez@inegi.org.mx"
                            style="color: #9ca3af; text-decoration: none;">daniel.sanchez@inegi.org.mx</a></p>
                </div>

                <div class="footer-column">
                    <h4>Ubicación</h4>
                    <p>Coordinación Estatal Oaxaca</p>
                    <p>Emiliano Zapata 316, Col. Reforma Planta Baja</p>
                    <p>Oaxaca de Juárez, Oax.</p>
                </div>
`,
    'Tabasco': `
                <div class="footer-column">
                    <h4>Departamento de Comité Estatal</h4>
                    <p>Jefe de Departamento:</p>
                    <p>Armando Sierra Camacho</p>
                    <p style="margin-top: 10px;">Tel: 993 187 9553, Ext: 2755</p>
                    <p><a href="mailto:armando.sierra@inegi.org.mx"
                            style="color: #9ca3af; text-decoration: none;">armando.sierra@inegi.org.mx</a></p>
                </div>

                <div class="footer-column">
                    <h4>Ubicación</h4>
                    <p>Coordinación Estatal Tabasco</p>
                    <p>Av. Paseo Tabasco 813, Ala A</p>
                    <p>Col. Jesús García, Planta Baja</p>
                    <p>Villahermosa, Tabasco.</p>
                </div>
`
};

for (const item of filesToProcess) {
    const fullPath = path.join(baseDir, item.file);
    if(!fs.existsSync(fullPath)) {
        console.log("Not found:", item.file);
        continue;
    }
    const orig = fs.readFileSync(fullPath, 'utf8');

    // extract <title>
    const titleMatch = orig.match(/<title>(.*?)<\/title>/is);
    let title = titleMatch ? titleMatch[1].trim() : "document";

    // extract h2 title before it matches span icon-file-pdf
    const h2Match = orig.match(/<h2 class="menu__archivos--titulo"[^>]*>(.*?)<span/is) || 
                    orig.match(/<h2 class="menu__archivos--titulo">(.*?)<span/is);
    let viewerMenuTitle = "Documento";
    if (h2Match) {
         viewerMenuTitle = h2Match[1].trim();
    } else {
         const fallbackH2Match = orig.match(/<h2[^>]*>(.*?)<\/h2>/is);
         if(fallbackH2Match) viewerMenuTitle = fallbackH2Match[1].replace(/<[^>]+>/g, '').trim();
         console.log("Warning: No h2 match in", item.file, "fallback is", viewerMenuTitle);
    }

    // Determine if it uses collapsible1.js
    const usesCollapsible1 = orig.includes("collapsible1.js");

    // extract config variable
    let configStr = "";
    const configMatch = orig.match(/(var\s+config\s*=\s*(?:\[|\{)[\s\S]*?(?:\]|\})\s*;)\s*itemMenu/);
    if(configMatch) {
        configStr = configMatch[1];
    } else {
        const altConfigMatch = orig.match(/(var\s+config\s*=\s*\[[\s\S]*?\]\s*;)\s*itemMenu/);
        if(altConfigMatch) configStr = altConfigMatch[1];
        else {
           console.log("Could not find config in", item.file);
        }
    }

    // Replace fields in template
    let newHtml = templateStr;

    // 1. replace title
    newHtml = newHtml.replace(/<title>.*?<\/title>/, \`<title>\${title}</title>\`);

    // 2. config
    newHtml = newHtml.replace(/var\s+config\s*=\s*\[[\s\S]*?\]\s*;/is, configStr);

    // 3. title in viewer menu:
    newHtml = newHtml.replace(/Actas del CEIEG Chiapas <span class="icon-file-pdf/, viewerMenuTitle + ' <span class="icon-file-pdf');

    // 4. state replacements
    const lowerState = item.state.toLowerCase();
    
    // a. nav link returns
    newHtml = newHtml.replace(/href="\.\.\/\.\.\/chiapas\.html"/g, \`href="../../\${lowerState}.html"\`);
    newHtml = newHtml.replace(/href="\.\.\/\.\.\/chiapas\.html#snieg"/g, \`href="../../\${lowerState}.html#snieg"\`);
    newHtml = newHtml.replace(/href="\.\.\/\.\.\/chiapas\.html#documentacion"/g, \`href="../../\${lowerState}.html#documentacion"\`);
    newHtml = newHtml.replace(/href="\.\.\/\.\.\/chiapas\.html#contacto"/g, \`href="../../\${lowerState}.html#contacto"\`);
    
    // session link
    newHtml = newHtml.replace(/href="\.\.\/\.\.\/Sesiones\/1_sesion_chi_26\.html"/g, \`href="../../Sesiones/1_sesion_\${item.abbr}_26.html"\`);
    
    // b. text span in logo
    newHtml = newHtml.replace(/<span>Chiapas<\/span>/g, \`<span>\${item.state}</span>\`);

    // c. Footer text: Dirección Regional Sur - Chiapas
    newHtml = newHtml.replace(/Dirección Regional Sur - Chiapas/g, \`Dirección Regional Sur - \${item.state}\`);

    // d. replace Footer info
    const reFooterInfo = /<div class="footer-column">\s*<h4>Departamento de Comité Estatal<\/h4>[\s\S]*?Tuxtla Gutiérrez, Chiapas\.<\/p>\s*<\/div>/;
    newHtml = newHtml.replace(reFooterInfo, footers[item.state].trim());

    // Fix a href missing mailto: in the original template
    newHtml = newHtml.replace(/href="luisa\.mora@inegi\.org\.mx"/g, 'href="mailto:luisa.mora@inegi.org.mx"');

    // Replace collapsible if needed
    if (usesCollapsible1) {
        newHtml = newHtml.replace(/collapsible\.js"/g, 'collapsible1.js"');
    }

    fs.writeFileSync(fullPath, newHtml, 'utf8');
    console.log("Processed:", item.file);
}
