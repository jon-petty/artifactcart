FROM nginx:1.17

RUN apt-get update && apt-get install -y \
    nodejs \
    npm \
    curl \
    vim \
    inotify-tools \
    && rm -rf /var/lib/apt/lists/*

###########################
# Setup Nodejs for the UI #
###########################

COPY artifactcart /usr/src/app/artifactcart

WORKDIR /usr/src/app/artifactcart

RUN npm install \
    && npm run build \
    && cp -r dist/* /usr/share/nginx/html/. \
    && cp src/html/artifactcart.html /usr/share/nginx/html/.

EXPOSE 80
