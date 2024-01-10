# Utiliza una imagen de Node.js LTS como base
FROM node:14

# Establece el directorio de trabajo en /usr/src/app
WORKDIR /usr/src/app

# Copia los archivos de configuración del proyecto
COPY package*.json ./

# Instala las dependencias y TypeScript
RUN npm install --omit=dev

# Copia el resto de los archivos del proyecto
COPY /dist/src ./

# Expone el puerto en el que la aplicación se ejecutará
EXPOSE 8000

# Comando para ejecutar la aplicación
CMD ["npm", "run", "start"]
