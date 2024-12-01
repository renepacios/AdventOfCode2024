const fs = require('fs');
const archivo = 'input.txt';
const DBG = true;

const leerArchivo = (archivo) => {
    return new Promise((resolve, reject) => {
        // Leer las listas desde el archivo
        fs.readFile(archivo, 'utf8', (err, data) => {
            if (err) {
                console.error('Error al leer el archivo:', err);
                return reject(err);
            }

            // Procesar las líneas del archivo
            const lineas = data.split('\n').map(linea => linea.trim());
            const listaDerecha = [];
            const listaIzquierda = [];

            //DBG && console.log('Líneas:', lineas);

            for (const linea of lineas) {
                if (!linea) {
                    console.error('El archivo contiene una línea vacía.');
                    continue;
                }

                [izq, der] = linea.split('   ').map(Number);

              //  DBG && console.log('izq, der:', izq, der);

                listaIzquierda.push(izq);
                listaDerecha.push(der);

                // DBG && console.log('Lista izquierda:', listaIzquierda);
                // DBG && console.log('Lista derecha:', listaDerecha);
            }
            resolve({ listaIzquierda, listaDerecha });

        });
    });
}


const calcularDistancia = (listaIzquierda, listaDerecha) => {
    let distancia = 0;
    const sortedIzquierda = listaIzquierda.sort((a, b) => a - b);
    const sortedDerecha = listaDerecha.sort((a, b) => a - b);

    for (let i = 0; i < sortedIzquierda.length; i++) {
        distancia += Math.abs(sortedIzquierda[i] - sortedDerecha[i]);
    }
    return distancia;
}

const calcularPuntuacionSimilitud=(listaIzquierda, listaDerecha) => {
    // Crear un objeto para contar las ocurrencias en la lista derecha
    const conteoDerecha = listaDerecha.reduce((contador, numero) => {
        contador[numero] = (contador[numero] || 0) + 1;
        return contador;
    }, {});

    // Calcular la puntuación de similitud
    let puntuacionTotal = 0;
    for (const numero of listaIzquierda) {
        puntuacionTotal += numero * (conteoDerecha[numero] || 0);
    }

    return puntuacionTotal;
}


(async () => {
    const { listaIzquierda, listaDerecha } = await leerArchivo(archivo);

    // DBG && console.log('Lista izquierda:', listaIzquierda);
    // DBG && console.log('Lista derecha:', listaDerecha);

    const distancia = calcularDistancia(listaIzquierda, listaDerecha);
    console.log('Distancia:', distancia);

    const puntuacion = calcularPuntuacionSimilitud(listaIzquierda, listaDerecha);
    console.log('Puntuación de similitud:', puntuacion);
})();

