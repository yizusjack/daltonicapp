FROM php:8.2-fpm

# Copy composer.lock and composer.json
#COPY ./app/composer.lock ./app/composer.json /var/www/

# Set working directory
WORKDIR /var/www

RUN apt-get update && apt-get install -y libzip-dev
RUN apt-get update && apt-get install -y libpng-dev
RUN apt-get update && apt-get install -y libjpeg62-turbo-dev
RUN apt-get update && apt-get install -y libfreetype6-dev

# Install dependencies
RUN apt-get update && apt-get install -y nano
RUN apt-get update && apt-get install -y build-essential 
RUN apt-get update && apt-get install -y poppler-utils
RUN apt-get update && apt-get install -y npm
RUN apt-get update && apt-get install -y default-mysql-client
RUN apt-get update && apt-get install -y locales
RUN apt-get update && apt-get install -y zip
RUN apt-get update && apt-get install -y curl
RUN apt-get update && apt-get install -y jpegoptim optipng pngquant gifsicle
RUN apt-get update && apt-get install -y vim
RUN apt-get update && apt-get install -y unzip
RUN apt-get update && apt-get install -y git
RUN apt-get update && apt-get install -y libxml2-dev
RUN apt-get update && apt-get install -y libxslt-dev
RUN apt-get update && apt-get install -y python-dev-is-python3
RUN apt-get update && apt-get install -y libonig-dev
ENV LANG=C.UTF-8

RUN npm install n -g && \
    n latest
# Clear cache
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Install extensions
RUN docker-php-ext-install soap xsl sockets
RUN docker-php-ext-install pdo_mysql mbstring zip exif pcntl bcmath
RUN docker-php-ext-configure gd --with-freetype=/usr/include/ --with-jpeg=/usr/include/
RUN docker-php-ext-install gd

# Install composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer


# Add user for laravel application
ARG WWW_USER_ID
ARG WWW_GROUP_ID


RUN groupadd -g ${WWW_GROUP_ID} www
RUN useradd -u ${WWW_USER_ID} -ms /bin/bash -g www www

# Copy existing application directory contents
#COPY ./app/ /var/www

# Copy existing application directory permissions
COPY --chown=www:www ./app/ /var/www

# Change current user to www
USER www

# Expose port 9000 and start php-fpm server
EXPOSE 9000
CMD ["php-fpm"]
