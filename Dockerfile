FROM nginx:alpine
COPY nginx.conf /etc/nginx/
COPY dist /usr/share/nginx/html
EXPOSE 8000 