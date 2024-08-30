# on choisis une image Docker pour notre backend. Notre app est en nodejs donc on choisis “node:lts-alpine” pourquoi cette version ? car c’est une version légère de NodeJS qui suffit pour la plupart des app
FROM node:lts-alpine

# Le RUN c’est pour executer des commandes lors de la construction d’une image, ensuite mkdir /backend c’est pour créer le dossier backend
RUN mkdir /backend

# le WORKDIR c’est pour se mettre sur le dossier avant d’y faire des choses, normalement le mkdir le fait automatiquement mais on retrouve souvent le workdir au cas ou
WORKDIR /backend

# COPY <chemin_du_dossier> <destination>, c’est simplement pour copier un dossier ou un ficher dans l’image docker, ici on copie le package.json
COPY package.json ./

# On retrouve la commande RUN mais la c’est pour installer les dépendances avec npm. /!\ Il faut d’abord installer les dépendances avant de copier le projet car je crois que faire l’inverse peut parfois provoquer des bugs
RUN npm i

# On installe le package curl dans notre image backend, c’est pour pouvoir faire une sorte de GET avec curl et savoir quand notre backend est lancé (ça sera utile pour lancer nos services les uns après les autres dans le docker compose)
RUN apk --update --no-cache add curl

COPY src src

# La on copie le projet entier dans l’image docker en l’occurrence notre dossier source et notre tsconfig
COPY tsconfig.json ./

# Le CMD définit la commande par défaut qui sera exécutée lors du lancement d'un conteneur qui possède l’image ici on parle de l’image que nous sommes entrain de créer donc notre backend
CMD npm run start
