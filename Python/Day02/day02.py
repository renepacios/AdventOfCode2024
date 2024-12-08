
def leer_fichero(archivo):
    """
    Lee un archivo con pares de números separados por espacios y devuelve dos listas
    :param nombre_archivo: Nombre del archivo que contiene los números
    """
    # Listas para almacenar los números de la izquierda y de la derecha
    numeros_izquierda = []
    numeros_derecha = []

    # Leer el archivo línea por línea
    with open(archivo, 'r') as f:  
        lineas = f.readlines()
        # aquí se usa compresión de listas, algo chulo que tiene Python 
        # https://docs.hektorprofe.net/python/funcionalidades-avanzadas/comprension-de-listas/
        return [
            list(map(int, linea.strip().split()))
            for linea in lineas if linea.strip()
        ]       



def es_reporte_seguro(niveles):
    """
    Verifica si un reporte es seguro.
    """
    es_incremental = True
    es_decremental = True

    for i in range(1, len(niveles)):
        diferencia = niveles[i] - niveles[i - 1]

        # Verifica si la diferencia está fuera del rango permitido
        if diferencia < -3 or diferencia > 3:
            return False

        # Verifica si es estrictamente incremental o decremental
        if diferencia < 0:
            es_incremental = False
        elif diferencia > 0:
            es_decremental = False
        else:
            return False  # Si hay un nivel igual al anterior

    return es_incremental or es_decremental


def es_reporte_seguro_con_dampener(niveles):
    """
    Verifica si un reporte es seguro, considerando el "Problem Dampener".
    """
    # Verifica si el reporte ya es seguro
    if es_reporte_seguro(niveles):
        return True

    # Intenta eliminar un nivel y verifica si el reporte se vuelve seguro
    for i in range(len(niveles)):
        niveles_modificados = niveles[:i] + niveles[i + 1:]
        if es_reporte_seguro(niveles_modificados):
            return True

    return False

def analizar_reportes(reportes):
    """
    Analiza los reportes y cuenta cuántos son seguros, considerando el "Problem Dampener".
    """
    reportes_seguros = 0

    for reporte in reportes:
        if es_reporte_seguro(reporte):
            reportes_seguros += 1

    return reportes_seguros


def analizar_reportes_con_dampener(reportes):
    """
    Analiza los reportes y cuenta cuántos son seguros, considerando el "Problem Dampener".
    """
    reportes_seguros = 0

    for reporte in reportes:
        if es_reporte_seguro_con_dampener(reporte):
            reportes_seguros += 1

    return reportes_seguros


# # Ejemplo de datos de entrada
# data = """
# 7 6 4 2 1
# 1 2 7 8 9
# 9 7 6 2 1
# 1 3 2 4 5
# 8 6 4 4 1
# 1 3 6 7 9
# """
nombre_archivo = 'input.txt'
data = leer_fichero(nombre_archivo)
resultado1= analizar_reportes(data)
print(f"Datos del archivo: {resultado1}")

resultado = analizar_reportes_con_dampener(data)
print(f"Cantidad de reportes seguros (con dampener): {resultado}")
