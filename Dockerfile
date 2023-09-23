# Base image
FROM node:lts AS development

# Set working directory
WORKDIR /app
RUN npm install -g @angular/cli@16.0.0

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
# COPY . /app

# # Expose port 4200
# EXPOSE 4200

# # Run the app
# # CMD ["ng", "serve", "--host", "0.0.0.0", "--disable-host-check", "--poll", "1"]
# CMD bash -c "npm install && npm install -g @angular/cli@16.0.0 && ng serve --host 0.0.0.0 --disable-host-check --poll 1"
