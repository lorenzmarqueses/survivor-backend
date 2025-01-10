# Use Node.js image
FROM node:18

# Set the working directory
WORKDIR /app

# Copy package files first
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the Prisma directory
COPY prisma ./prisma

# Copy the rest of the application code
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Build the application
RUN npm run build

# Expose the application port
EXPOSE 3000

# Run the application
CMD [ "npm", "run", "start:dev" ]
