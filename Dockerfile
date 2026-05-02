# =========================================
# Stage: Development (Vite React.js App)
# =========================================

FROM node:24-alpine

# Set working directory
WORKDIR /app

# Copy dependency manifests first (better caching)
COPY --chown=node:node package*.json ./

# Install dependencies
RUN npm ci

# Copy application source
COPY . .

# Give node all rights on the app
RUN chown -R node:node /app

# Switch to non-root user
USER node

# Expose Vite dev server port
EXPOSE 5173

# Run Vite dev server
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]