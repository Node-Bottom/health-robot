# health-robot

There are two ways to setup. If you want to install all required files together run this: 
```bash
cd web
npm i
npm start
```
Open new terminal:
```bash
cd api
npm i
npm start
```

Open new terminal:
```bash
cd apis
npm i
npm start
```
Open new terminal:
```bash
cd apiPrescription
npm i
npm start
```

Open new terminal:
```bash
cd apiPrescription
npm i
npm start
```

Open new terminal:
```bash
cd 'EmergencyContact Api'
npm i
npm start
```

Open new terminal:
```bash
cd randomGenerator
npm i
npm start
```

Open new terminal:
```bash
cd plotty
npm i
npm start
```

## If you want to follow complete setup.

You need to open different terminals and then install different packages.
## Install Packages

```bash
cd web
npm install express --save
```

## Run Server

```
npm start
```

## Running api

You will have to replace mongo.connect command with your url so that the data can be uploaded to your database
Open a new terminal and switch to api folder

```bash
cd api
npm init
```

Install required packages

```bash
npm install express --save
npm install nodemon --save-dev
npm install mongoose --save
```
Run the api

```bash
npm start
```

Now do same with apis folder

```bash
cd apis
npm init
```

Install required packages

```bash
npm install express --save
npm install nodemon --save-dev
npm install mongoose --save
```

Run the api

```bash
npm start
```

For Presciption api

```bash
cd apiPrescription
npm init
npm install express --save
npm install nodemon --save-dev
npm install mongoose --save
npm start
```

For Emergency Contact api

```bash
cd 'EmergencyContact Api'
npm init
npm install express --save
npm install nodemon --save-dev
npm install mongoose --save
npm start
```

For randomGenerator

```bash
cd randomGenerator
npm init
npm install express --save
npm install nodemon --save-dev
npm install mongoose --save
npm install mqtt
npm install body-parser
npm install axios
npm install random-int
npm start
```

For plotty

```bash
cd plotty
npm init
npm install express --save
npm install nodemon --save-dev
npm install mongoose --save
npm install express plotly
npm start
```
## Running Tests

You need to switch to different folder and then run pacakges

```bash
cd tests 
npm init
npm install jest --save-dev
npm install axios --save-dev
```

Ruuning the tests

```bash
npm run test
```


## Creating Docs

```bash
cd api
npm run doc
```

```bash
cd ../apis
npm run doc
```

## Deployment

Deploy the project to Microsoft Azure, Amazon Cloud and then change the user_url and device_url based upon the public ip address
