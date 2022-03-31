# Backend of DailiBuzz

DailiBuzz is a one stop web application that pragamatically collects and organize data from news outlets that have undocumented API and serve's it to user's based on what they like the most.

## How to use

---

### Requirements

- LTS of Node Installed on your machine.
- MySQL.
- npm installed.
- API testers, you could go with the popular ones:
  - Curl
  - Insomnia
  - Postman

## Begin

---

### Project Installation

- clone the project
- `cd` into the repo
- Checkout to the `development` branch with `git checkout development`.
- Run `npm install` to install all existing dependencies

### Project Setup

- Run `npm install @prisma/client` to install prisma client
  - Whenever you make changes to your Prisma schema in the future, you manually need to invoke prisma generate using `npx prisma generate` in order to accommodate the changes in your Prisma Client API.
- Duplicate the file named ".env.example", rename the new copy to ".env".
- Create a database on your local machine.
- Note inside the .env file there's an enviroment variable called DATABASE_URL i.e `DATABASE_URL="mysql://johndoe:randompassword@localhost:3306/{the name of the database you just created}?schema=public"`
- After connecting your application to your database, you can perform migrations with `npx prisma migrate dev --name init --schhema=./src/database/prisma/schema.prisma`
  - This command does two things:
    1. It creates a new SQL migration file for this migration
    2. It runs the SQL migration file against the database
- Create a folder called certs `mkdir certs` cd into `certs`. Generate a `PUBLIC`, `PRIVATE` key pair using the following command

```bash
// Private Key
>> openssl genrsa -out private_key.pem 4096

// Public Key
>> openssl rsa -pubout -in private_key.pem 4096-out public_key.pem
```

- To start the server, run `npm start`
- You can start making requests via your API Tester by visiting <http://localhost:8080/api/v1/>

_Note:_
To install packages, use `npm i <package name>`.

**Note**
If you have discovered a bug or have a feature suggestion, feel free to create an issue on [Github](https://github.com/codewithdiv/dailibuzz/issues).

## Making contributions

[Checkout the contributions guidelines](https://github.com/codewithdiv/dailibuzz/blob/main/CONTRIBUTION.md)

Dont forget to star or fork this if you like it

### License

[![license](https://img.shields.io/badge/license-GPL-4dc71f.svg)](https://github.com/codewithdiv/dailibuzz/blob/main/LICENCE)

This project is licensed under the terms of the [GPL license](/LICENSE)
