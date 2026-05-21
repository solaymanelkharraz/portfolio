# Use the official PHP 8.3 Apache image
FROM php:8.4-apache

# 1. Install system dependencies required by Laravel
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    libzip-dev \
    zip \
    unzip

# 2. Clear cache to keep the image light
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# 3. Install PHP extensions (pdo_mysql is crucial for your database)
RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd zip

# 4. Enable Apache mod_rewrite for Laravel's routing
RUN a2enmod rewrite

# 5. Change Apache DocumentRoot to point to Laravel's /public folder
ENV APACHE_DOCUMENT_ROOT /var/www/html/public
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf
RUN sed -ri -e 's!/var/www/!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf

# 6. Configure Apache to listen on Render's dynamic $PORT
RUN sed -i 's/80/${PORT:-80}/g' /etc/apache2/sites-available/000-default.conf /etc/apache2/ports.conf

# 7. Grab the latest Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# 8. Set the working directory inside the container
WORKDIR /var/www/html

# 9. Copy your application code into the container
COPY . .

# 10. Install PHP dependencies (optimized for production)
RUN composer install --no-interaction --optimize-autoloader --no-dev

# 11. Set the correct folder permissions for Laravel
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache
RUN chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache

# 12. Run Apache in the foreground
CMD ["apache2-foreground"]