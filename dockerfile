# Use the official Node.js 16 as a parent image
FROM node:20-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies, including Prisma CLI for database migrations
RUN npm install

# Copy the prisma schema file
COPY prisma ./prisma

# Install Prisma Client
RUN npx prisma generate

# Copy the rest of your application's code
COPY . .

# Build your Next.js application
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

# Command to run your app
CMD ["npm", "start"]
