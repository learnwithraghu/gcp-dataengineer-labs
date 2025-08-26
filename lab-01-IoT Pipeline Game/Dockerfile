# Simple nginx container for IoT Pipeline Game
FROM nginx:alpine

# Copy the game files to nginx serve directory
COPY . /usr/share/nginx/html/

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
