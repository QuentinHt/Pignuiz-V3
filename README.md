# Boilerplate
## setup
Setup avec Docker :
créer le container
```
docker build -t <nom> .
pwd
docker run -dit --name <nom> -v <pwd>:/var/www/boilerplate -p <port>:<port> -p 3001:3001 <nom>

Exemple :
docker run -dit --name boilerplate -v <pwd>:/var/www/boilerplate -p 3000:3000 -p 3001:3001 boilerplate

```
créer le fichier .env
```
# Serveur
PORT=<port>
MONGO_URL=mongodb://127.0.0.1:27017/boilerplate
BCRYPT=

# COOKIE
COOKIE_SECRET=thisismycookiesecret
COOKIE_NAME=thisismycookiename

# JWT
JWT_SECRET=thisismyjwtsecret

# HEADERS
ALLOWED_ORIGINS=*
```

installer les dépendances
```
docker exec -it <nom> npm install
docker exec -it <nom> npm install -g nodemon
```
lancer le serveur
```
docker exec -it <nom> npm start
```