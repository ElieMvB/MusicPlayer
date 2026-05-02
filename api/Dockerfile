# Use a lightweight Python image
FROM python:3.12-alpine

# Set working directory
WORKDIR /app

# Copy your API file
COPY api.py .

# Install dependencies
RUN pip install --no-cache-dir flask flask-cors

# Expose Flask port
EXPOSE 5000

# Run the app
CMD ["python", "api.py"]