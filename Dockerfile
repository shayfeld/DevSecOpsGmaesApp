# Use an official Python runtime based on Alpine Linux
FROM python:3.11-alpine

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Create working directory
WORKDIR /app

# Copy only the required files
COPY requirements.txt /app/         # Copy the requirements.txt file
COPY app.py /app/                   # Copy the app.py file
COPY templates /app/templates/      # Copy the templates folder
COPY static /app/static/            # Copy the static folder

# Install dependencies
RUN pip install --upgrade pip && \
    pip install -r requirements.txt

# Expose the port Flask runs on
EXPOSE 5000

# Command to run the Flask app
CMD ["python", "app.py"]
