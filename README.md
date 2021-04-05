# Boilerplate
## setup
Setup avec Docker :
créer le container
```
docker build -t boilerplate .
pwd
docker run -dit --name boilerplate -v pwd -p 3000:3000 boilerplate
```
créer le fichier .env
```
# Serveur
PORT=3000
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
docker exec -it boilerplate npm install
docker exec -it boilerplate npm install -g nodemon
```
lancer le serveur
```
docker exec -it boilerplate npm start
```
