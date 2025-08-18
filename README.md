# Slot-Machine
slot-machine game jQuery + php

# Server Prerequisites
> 1. Install php on your machine. Try this link: [https://www.php.net/downloads.php](https://www.php.net/downloads.php)
>
> 2. Make sure its installation path is set as the operating system's environment variables
> 
> 3. Try  by running this command from your terminal: ```php -v```<br>
> You should see a reponse similar to this:<br>
> `PHP 8.4.11 (cli) (built: Jul 29 2025 18:02:29) (NTS Visual C++ 2022 x64)
Copyright (c) The PHP Group
Zend Engine v4.4.11, Copyright (c) Zend Technologies`

# Run
## Server - Development
from [ROOT]/server, run:
`composer install`

From [ROOT] folder, run:
(no need to cd into /server folder)
- `php -S localhost:8000 -t server/public`
- Use this .env file configuration:
>APP_ENV=development
>APP_DEBUG=true
>APP_URL=http://localhost:5500

>SESSION_NAME=PHPSESSID
>SESSION_LIFETIME=1440

## Client
From `[ROOT]/client` folder, run:

### Development
  - `npm install`
  - `npm run dev`

### Production
  - `npm run build`
  - `npm run start`

*The application will open automatically in your default browser*

# Development Journey
> *I don't know php*, but:

My comfortable backend development technology usually is Node.js/Next.js. In this project I got out of my comfort zone and chose the server to be PHP, so I can have a chance to learn this technology and to show my abilities to learn new language in a short-time period.
## Issues with the server development
- Session handling - It took me some time to understand the session cycle and how to handle it, especially when you use `$_SESSION` variables alongside `session_[]()` functions (reset, unset, start) while importing files from other paths than index.php's path.

## Client- JS + Jquery
- The client side was much easier as I am front-end oriented developer. I have'nt developed in jQuery for a long long time, but I think I managed quite well.
- I put some additional effort in styling the visibility of the client view, for example: using emojis instead of letters representing the fruit types, or applying animation while the cells are rolling one-by-one.

# REFERENCES
- I selected the fruit emojis from: https://emojipedia.org/en
- For developing the server, I used:
  - [https://www.php.net/](https://www.php.net/)
  - [php sessions](https://www.php.net/manual/en/book.session.php)
  - [php-tutorial-for-beginners](https://code.tutsplus.com/php-tutorial-for-beginners-free-7-hour-course--ytc-16c)
  - StackOverflow
