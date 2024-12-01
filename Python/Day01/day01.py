def calcular_distancia_total(lista_izquierda, lista_derecha):
    # Ordenar ambas listas
    lista_izquierda_ordenada = sorted(lista_izquierda)
    lista_derecha_ordenada = sorted(lista_derecha)
    
    # Calcular la suma de las diferencias absolutas
    distancia_total = sum(abs(a - b) for a, b in zip(lista_izquierda_ordenada, lista_derecha_ordenada))
    
    return distancia_total



def leer_fichero(archivo):
    """
    Lee un archivo con pares de números separados por espacios y devuelve dos listas
    :param nombre_archivo: Nombre del archivo que contiene los números
    :return: Una tupla de dos listas (numeros_izquierda, numeros_derecha)
    """
    # Listas para almacenar los números de la izquierda y de la derecha
    numeros_izquierda = []
    numeros_derecha = []

    # Leer el archivo línea por línea
    with open(archivo, 'r') as f:
        for linea in f:
            # Separar los números en cada línea
            if linea.strip():  # Ignorar líneas vacías
                num_izquierda, num_derecha = map(int, linea.split())
               
                numeros_izquierda.append(num_izquierda)
                numeros_derecha.append(num_derecha)

    return numeros_izquierda, numeros_derecha


# # Ejemplo de uso
# lista_izquierda = [3, 4, 2, 1, 3, 3]
# lista_derecha = [4, 3, 5, 3, 9, 3]

archivo = "input.txt"

lista_izquierda, lista_derecha = leer_fichero(archivo)

distancia = calcular_distancia_total(lista_izquierda, lista_derecha)

print(f"La distancia total mínima es: {distancia}")