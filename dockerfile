FROM cypress/included:15.20.1

WORKDIR /e2e

COPY package*.json ./

RUN npm ci

COPY . .

CMD ["npx", "cypress", "run", "--browser", "chrome"]