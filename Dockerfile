# Use an official Python runtime based on Alpine Linux
FROM python:3.11-alpine

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Create working directory
WORKDIR /app

# Copy only the required files
COPY ./requirements.txt /app/         
COPY ./app.py /app/                   
COPY ./templates /app/templates/      
COPY ./static /app/static/            

# Install dependencies
RUN pip install -r requirements.txt

# configure the container to run in an executed manner
ENTRYPOINT ["python" ]

# Command to run the Flask app
CMD ["app.py"]
