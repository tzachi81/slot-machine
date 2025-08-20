# Use the official PHP image
FROM php:8.0-cli

# Install any necessary dependencies
COPY . /app
WORKDIR /app

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Install PHP dependencies
RUN composer install

# Start the PHP built-in server
CMD ["php", "-S", "0.0.0.0:10000", "-t", "."]
