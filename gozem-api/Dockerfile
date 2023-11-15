FROM node:18.18.0
WORKDIR /app
COPY package.json .
RUN npm install
COPY . ./
ENV PORT 8000
EXPOSE $PORT
LABEL authors="tony"
CMD ["npm", "run", "dev"]
