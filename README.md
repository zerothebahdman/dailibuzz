# Backend for BuzzGest

BuzzGest is a one stop web application that pragamatically collects and organize data from news outlets that have undocumented API and serve's it to user's based on what they like the most.

## How to use

_Requirements_

- LTS of Node Installed on your machine.
- npm installed.
- API testers, you could go with the popular ones:
  - Curl
  - Insomnia
  - Postman

_Begin_

- clone the project
- `cd` into the repo
- Checkout to the `development` branch with `git checkout development`.
- Run `npm install` to install all existing dependencies
- Duplicate the file named ".env.example", rename the new copy to ".env".
- Perform migrations with `sequelize-cli db:migrate`
- To start the server, run `npm start`
- You can start making requests via your API Tester by visiting http://localhost:8080

_Note:_
To install packages, use `npm i <package name>`.
