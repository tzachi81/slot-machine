# Slot-Machine
slot-machine game jQuery + php


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

## Server - Production

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

My comfortable backend development technology usually Node.js/Next.js. In this project I got out of my comfort zone and chose my server to be php so I can have a chance to learn this technology and to show my abilities to learn new language in a short-time period.
## Issues with the server development
- session handling - It took me some time to understand the session cycle and how to handle it, especially when you use `$_SESSION` variables alongside `session_[]()` functions (reset, unset,start) while importing files from other paths than index.php's path.

## Client- JS + Jquery
- Same here, the client side was much easier as I am front-end oriented developer. I have'nt developed in jQuery for a long long time, but I think I managed quite well.
- I put some additional effort in styling the visibility of the client view, for example: using emojis instead of letters representing the fruit types, or applying animation while the cells are rolling one-by-one.
