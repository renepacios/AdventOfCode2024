const fs = require('fs');
const archivo = 'input.txt';
const DBG = false;

const leerArchivo = (archivo) => {
    return new Promise((resolve, reject) => {
        // Leer las listas desde el archivo
        fs.readFile(archivo, 'utf8', (err, data) => {
            if (err) {
                console.error('Error al leer el archivo:', err);
                return reject(err);
            }

            DBG && console.log('Data:', data);
            resolve(data);

        });
    });
}



function esReporteSeguro(niveles, tolerancia = 3) {
    // Determina si el reporte es seguro
    let esIncremental = true;
    let esDecremental = true;

    for (let i = 1; i < niveles.length; i++) {
        const diferencia = niveles[i] - niveles[i - 1];

        DBG && console.log('Diferencia:', diferencia, 'Tolerancia:', tolerancia);

        // Verifica la diferencia entre niveles
        if (diferencia < -1 * tolerancia || diferencia > tolerancia) {
            return false; // Si la diferencia está fuera del rango permitido
        }

        // Verifica si es estrictamente incremental o decremental
        if (diferencia < 0) {
            esIncremental = false;
        } else if (diferencia > 0) {
            esDecremental = false;
        } else {
            return false; // Si hay un nivel igual al anterior
        } 
         DBG && console.log('Diferencia:', diferencia, 'Tolerancia:', tolerancia, esIncremental || esDecremental);
    }
  
    // Debe ser completamente incremental o decremental
    return esIncremental || esDecremental;
}

function analizarReportes(data) {
    // Convierte el data en una lista de reportes
    const reportes = data.split('\n').map(linea =>
        linea.trim().split(' ').map(Number)
    );

    DBG && console.log('Reportes:', reportes, data);

    // Cuenta los reportes seguros
    let reportesSeguros = 0;

    for (const reporte of reportes) {
        DBG && console.log('Reporte:', reporte);
        if (esReporteSeguro(reporte)) {
            reportesSeguros++;
        }
    }

    return reportesSeguros;
}

function esReporteSeguroConDampener(niveles) {
    // Primero, verifica si el reporte ya es seguro
    if (esReporteSeguro(niveles)) {
        return true;
    }

    // Intenta eliminar cada nivel y verifica si se vuelve seguro
    for (let i = 0; i < niveles.length; i++) {
        const nivelesModificados = niveles.slice(0, i).concat(niveles.slice(i + 1));
        if (esReporteSeguro(nivelesModificados)) {
            return true;
        }
    }

    return false;
}

function analizarReportesConDampener(data) {
    const reportes = data.split('\n').map(linea => 
        linea.trim().split(' ').map(Number)
    );

    let reportesSeguros = 0;

    for (const reporte of reportes) {
        if (esReporteSeguroConDampener(reporte)) {
            reportesSeguros++;
        }
    }

    return reportesSeguros;
}

// // Ejemplo de datos de entrada
// const data = `
// 7 6 4 2 1
// 1 2 7 8 9
// 9 7 6 2 1
// 1 3 2 4 5
// 8 6 4 4 1
// 1 3 6 7 9
// `;

(async () => {
    const data = await leerArchivo(archivo);

    const resultado = analizarReportes(data);
    console.log(`Cantidad de reportes seguros: ${resultado}`);

    const resultadoDamp = analizarReportesConDampener(data);
    console.log(`Cantidad de reportes seguros (con dampener): ${resultadoDamp}`);   
})();

