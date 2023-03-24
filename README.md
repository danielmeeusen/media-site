## Next.js Media Site

  - This site is meant to test the functionality and scalability of using Next.js for a social/media site. 

[Veiw demo on render](https://media-site-dev.onrender.com/)

## Features:
  - Hybrid Server Side and Client Side Rendering for optimum SEO and user privacy.
  - Minimal overhead for scaling.
  - Self managed authentication and session managment.
  - Client IP and User Agent finger printing for better device tracking to increase account security. 

## Dependencies:
- `react`, `react-dom` - v16.8 or higher required
- `next` - v9.3 or above required for API Routes and data fetching.
- `next-connect` - recommended if you want to use Express/Connect middleware and easier routing method.
- `@material-ui` - rapid component templating.
- `passport`, `passport-local` - authenticaiton.
- `bcryptjs` - password hashing.
- `next-session` - user session provider.
- `connect-mongo`, `express-session` - session functionality.
- `swr` - state managment.
- `mongodb` - database thorugh Atlas DB.
- `mysql`, `serverless-mysql` - optional MySQL database support either in tandum or in place of MongoDB. 
- `nodemailer` - email verification and password recovery. 
- `validator` - email validation.
- `ajv` - validating request bodies.
- `cloudinary` - image upload.
- `multer` -  may be replaced with any middleware that handles multipart/form-data
- `geoip-lite`, `next-useragent`, `request-ip` - device and location tracking, used to protect account logins.
- `isomorphic-unfetch` - single instance 3rd party data fetching.

## Enviroment Variables

- `WEB_URI` The URL of your web app.
- `MONGODB_URI`- The MongoDB Connection String (with credentials and database name)
- `NODEMAILER_CONFIG` JSON stringified nodemailer config. 
- `EMAIL` address email will be sent from.
- `CLOUDINARY_URL` Cloudinary environment variable for configuration.

## Development
Install by running `npm install` and run local develoment server with `npm run dev` after creating `.env.local` file.

## Deployment
Currently configured for deployment on [Render](https://render.com/). 
`npm run test` to run production build locally. 
