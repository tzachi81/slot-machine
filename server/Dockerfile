# Use the official PHP image
FROM php:8.0-apache

# Install necessary PHP extensions
RUN apt-get update && apt-get install -y \
    libzip-dev \
    && docker-php-ext-install zip

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set the working directory to the server folder
WORKDIR /slot-machine/server

# Copy application files into the container
COPY ./server/ .

# Install PHP dependencies
RUN composer install

# Optional: If you need to expose a specific port, you can do so
EXPOSE 80
