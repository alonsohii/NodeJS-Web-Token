# Node Token Authentication Rank

This repo uses JSON Web Tokens and the [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) package to implement token based authentication on a simple Node.js API.

This is a starting point to demonstrate the method of authentication by verifying a token using Express route middleware.

## Requirements

- node and npm

## Usage

1. Install dependencies: `npm install`
2. Change SECRET in `config.js`
3. Add your own MongoDB database to `config.js`
4. Start the server: `node server.js`


Once everything is set up, we can begin to use our app by creating and verifying tokens.

### Getting a Token

Send a `POST` request to `http://localhost:8080/api/authenticate` with test user parameters as `x-www-form-urlencoded`. 

```
  {
    name: 'Demo',
    password: 'demo'
  }
```

### Verifying a Token and Listing Users

Send a `GET` request to `http://localhost:8080/api/users` with a header parameter of `x-access-token` and the token.

You can also send the token as a URL parameter: `http://localhost:8080/api/users?token=YOUR_TOKEN_HERE`

Or you can send the token as a POST parameter of `token`.
