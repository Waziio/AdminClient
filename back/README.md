# node_api_AdminClient
## Intro
My first API, made in NodeJS with express, sequelize and mysql.

You can create an account, log in (a jwt is returned to you), view and administer customer data.

**TODO** : make a ReactJS/VueJS admin panel using this API.
## Setup
```git clone https://github.com/Waziio/node_api_AdminClient.git```  

```cd node_api_AdminClient```

```npm install```

## Configuration

Check the .env file

## Routes

### Authentication
 ```POST /signup```   : Create an account  

**Parameters** : 
- **lastname**
- **firstname**
- **mail** (must be unique)
- **password** (between 8 and 20 characters)

```POST /login``` : Log in (return a jwt)  

**Parameters** : 
- **mail** (must be unique)
- **password** (between 8 and 20 characters)

### Client (With JWT)
```GET /client```   : Get a list of clients

```GET /client/:id``` : Get a specific client

```POST /client```   : Add a new client  

**Parameters** : 
- **lastname**
- **firstname**
- **date**
- **mail**
- **address**
- **postalcode**
- **city**
- **country**
- **profile_picture**

```PUT /client/:id``` : Modify informations of a client  

```DELETE /client/:id``` : Delete client
