# Backend of DailiBuzz

DailiBuzz is a one stop web application that pragamatically collects and organize data from news outlets that have undocumented API and serve's it to user's based on what they like the most.

## How to use

### Requirements

- LTS of Node Installed on your machine.
- npm installed.
- API testers, you could go with the popular ones:
  - Curl
  - Insomnia
  - Postman

### Begin

- clone the project
- `cd` into the repo
- Checkout to the `development` branch with `git checkout development`.
- Run `npm install` to install all existing dependencies
- Duplicate the file named ".env.example", rename the new copy to ".env".
- Perform migrations with `sequelize-cli db:migrate`
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
