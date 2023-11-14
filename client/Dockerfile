FROM node
RUN apt-get update

WORKDIR /app
COPY package.json package.json
COPY package-lock.json package-lock.json
RUN npm install

COPY tailwind.config.js tailwind.config.js
COPY . .
# PORT 8000
ENTRYPOINT ["npm","start"]
