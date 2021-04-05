FROM mongo:bionic

RUN rm -f /etc/localtime \
 && ln -s /usr/share/zoneinfo/Europe/Paris /etc/localtime

RUN apt update && apt upgrade -y
RUN apt install -y vim git curl wget tar

RUN curl -sL https://deb.nodesource.com/setup_14.x | bash -
RUN apt install -y nodejs

WORKDIR /var/www/boilerplate
RUN npm install -g nodemon
