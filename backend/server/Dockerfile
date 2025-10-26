# Usa Node.js LTS come immagine base
FROM node:20

# Imposta la working directory nel container
WORKDIR /usr/src/app

# Copia package.json e package-lock.json
COPY package*.json ./

# Installa le dipendenze
RUN npm install

# Copia tutto il resto del codice
COPY . .

# Esponi la porta che userà Express
EXPOSE 3000

# Comando per avviare il server
CMD ["node", "index.js"]
