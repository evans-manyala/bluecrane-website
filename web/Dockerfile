# -------- Build frontend --------
FROM node:20-alpine AS build
WORKDIR /app
COPY web/frontend/package.json ./
COPY web/frontend/package-lock.json ./
RUN npm ci || npm install
COPY web/frontend/ ./
RUN npm run build

# -------- Serve with NGINX --------
FROM nginx:alpine
COPY web/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
