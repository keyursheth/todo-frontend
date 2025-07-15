# Stage 1: Build the React application
FROM node:20-alpine AS build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock) first
# to leverage Docker's caching. If these files don't change,
# the subsequent npm/yarn install won't re-run.
COPY package.json ./
# If you are using yarn, uncomment the line below and comment out package-lock.json
# COPY yarn.lock ./

# Install dependencies
RUN npm install
# If you are using yarn, uncomment the line below and comment out npm install
# RUN yarn install

# Copy the rest of the application code
COPY . .

# Build the React application for production
# Ensure your package.json has a "build" script, e.g., "react-scripts build"
RUN npm run build
# If you are using yarn, uncomment the line below
# RUN yarn build

# Stage 2: Serve the React application with Nginx
FROM nginx:alpine AS production

# Copy the built React app from the 'build' stage to Nginx's HTML directory
# The 'build' folder name depends on your create-react-app configuration.
# Typically it's 'build', but it could be 'dist' or 'out' for other setups.
COPY --from=build /app/build /usr/share/nginx/html

# Remove the default Nginx configuration file
RUN rm /etc/nginx/conf.d/default.conf

# Copy your custom Nginx configuration (create this file yourself)
# This is crucial for handling client-side routing (e.g., React Router)
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80, the default HTTP port for Nginx
EXPOSE 80

# Command to run Nginx when the container starts
CMD ["nginx", "-g", "daemon off;"]