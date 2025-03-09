# Use the official MySQL image
FROM mysql:8.0

# Set environment variables (these can also be set in docker-compose)
ENV MYSQL_ROOT_PASSWORD=rootpassword
ENV MYSQL_DATABASE=weather_db
ENV MYSQL_USER=flaskuser
ENV MYSQL_PASSWORD=flaskpassword

# Copy a custom MySQL configuration file (optional)
COPY my.cnf /etc/mysql/my.cnf

# Expose MySQL port
EXPOSE 3306