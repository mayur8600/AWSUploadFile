# uploadfile
Its is complete project for upload file to AWS.
Client is the Based on React Please run Below CMD
1. npm i
2. npm run start (to run React App)

Server is the Based on Backend Please run Below CMD
1. npm i
2. npm run dev (to run Backend Server)

please add the value in .env File.
client environment file key with value
### REACT_APP_BASE_URL = 'http://localhost:3001'

server environment file key with value
#### PORT = 3001
#### MONGO_DB_URL= '' //please enter Your db URl
#### AWS_ACCESS_KEY = '' // please enter aws access key
#### AWS_SECRET_KEY = '' // Please Enter AWS secret Key
#### AWS_REGION = 'ap-south-1' // Region as selected for s3
#### AWS_BUCKET = 'globaluser' // Bucket name used while creation of S3 bucket

## Request URL
- POST
#### http://localhost:3001/ {To upload file}
#### http://localhost:3001/json {To send JSON file}

- GET
#### http://localhost:3001/list {Get list of uploaded video url}
#### http://localhost:3001/jsonList {Get Json Object list}
