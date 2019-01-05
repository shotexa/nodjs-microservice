FROM nodesource/trusty:5.1 

WORKDIR /app

ADD . /app

RUN npm install

EXPOSE 8080

RUN chmod +x /app/run.sh

CMD ["npm", "start"]

