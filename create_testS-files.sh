#!/bin/bash

# Directorio de origen (src) y directorio de destino (tests)
SRC_DIR="src"
TESTS_DIR="tests"

# Crear directorio de pruebas si no existe
if [ ! -d "$TESTS_DIR" ]; then
  mkdir "$TESTS_DIR"
  echo "Directorio de pruebas creado: $TESTS_DIR"
fi

# Recorrer los archivos y directorios en el directorio de origen
find "$SRC_DIR" -type d -print0 | while IFS= read -r -d '' dir; do
  # Crear la ruta de la carpeta de pruebas correspondiente
  test_dir="${dir/$SRC_DIR/$TESTS_DIR}"
  
  # Crear la carpeta de pruebas si no existe
  if [ ! -d "$test_dir" ]; then
    mkdir "$test_dir"
    echo "Directorio de pruebas creado: $test_dir"
  fi
done

# Recorrer los archivos en el directorio de origen
find "$SRC_DIR" -type f -print0 | while IFS= read -r -d '' file; do
  # Obtener la ruta y el nombre del archivo
  filepath="${file/$SRC_DIR/$TESTS_DIR}"
  filename=$(basename "$file")
  
  # Verificar si el archivo es un archivo JavaScript o TypeScript
  if [[ "$filename" == *".js" || "$filename" == *".ts" ]]; then
    # Crear el archivo de prueba en la carpeta de destino
    test_file="${filepath%.*}.test.${filename##*.}"
    touch "$test_file"
    echo "Archivo de prueba creado: $test_file"
  fi
done
