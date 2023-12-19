# AdminClient
## Intro
The front folder contains a React app, using ChakraUI components and Tailwind CSS.  
The back folder contains my first API, made with Express, Sequelize and MySQL.

You can create an account, log in (using JWT), view and administer customer data.


## Setup
```git clone https://github.com/Waziio/AdminClient.git```  

### Front dependencies
```cd AdminClient/front```

```npm install```

### Back dependencies
```cd AdminClient/back```

```npm install```

## Configuration

Check the /back/.env file

## API Routes

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
