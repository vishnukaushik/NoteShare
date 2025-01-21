# Stage 1: Build the frontend (Vite)
FROM node:22.1 AS frontend-build

WORKDIR /app/frontend

# Copy package files and install dependencies
COPY frontend/package*.json ./
RUN npm install

# Copy frontend source code and build
COPY frontend/ .
RUN npm run build

# Stage 2: Build the backend (Node.js)
FROM node:22.1 AS backend-build

WORKDIR /app/backend

# Copy package files and install dependencies
COPY backend/package*.json ./
RUN npm install

# Copy backend source code
COPY backend/ .

# Stage 3: Final production image
FROM node:22.1

WORKDIR /app

# Install PM2 globally
RUN npm install -g pm2 serve

# Copy built frontend and backend from the respective stages
COPY --from=frontend-build /app/frontend/dist /app/frontend/dist
COPY --from=backend-build /app/backend /app/backend

# Copy PM2 process configuration file
COPY ecosystem.config.js /app/ecosystem.config.js

# Install production dependencies for backend
RUN cd /app/backend && npm install --production

# Expose ports for frontend and backend
EXPOSE 8000 3000

# Start both frontend and backend using PM2
CMD ["pm2-runtime", "ecosystem.config.js"]
