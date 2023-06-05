# Use an official Node.js runtime as the base image
FROM node:19-alpine AS base

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install production dependencies
RUN npm install
COPY --chown=node:node prisma ./prisma/
RUN npx prisma generate

ARG PORT
ENV PORT=${PORT}
RUN PORT=${PORT}

# Copy the built dependencies to a new image
FROM node:19-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the production dependencies from the base image
COPY --from=base /app/node_modules ./node_modules

# Copy the rest of the application code to the container
COPY . .

# Expose the port on which the Express app will run
EXPOSE ${PORT}

# Start the Express application
CMD ["npm", "start"]
