
# Step 1: Build the React app with Vite
FROM node:20-alpine AS build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Step 2: Serve with nginx
FROM nginx:alpine

# Copy build output to nginx public folder
COPY --from=build /app/dist /usr/share/nginx/html

# Optional: Custom nginx config for SPA
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
