const dotenv = require('dotenv')
const express = require('express');
const upload = require('express-fileupload')
const cors = require('cors');
const mongoose = require('mongoose');
const { uploadFileToAWS } = require('./utils/helper');
const Upload = require('./models/upload');
const JsonFile = require('./models/json');
const app = express();
dotenv.config();
app.use(cors());
app.use(upload());
app.use(express.json());
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('connected to detabase')
}).catch(console.error);

app.post("/", async function (req, res) {
    try {
        const url = await uploadFileToAWS(req.files);
        if (url?.URL) {
            const updateUrl = await Upload.create({
                link: url?.URL
            })
            if (updateUrl) {
                return res.send(200, req.files);
            }
        }
        res.send(400, {});
    } catch (error) {
        res.send(400, {})
    }
});

app.get("/list", async function (req, res) {
    try {
        const list = await Upload.find();
        res.send(200, list);
    } catch (error) {
        res.json(400, {})
    }
});

app.post("/json", async function (req, res) {
    try {
        const jsonObj = await JsonFile.create({
            jsonData: req.body
        });
        res.send(200, jsonObj);
    } catch (error) {
        res.json(400, {})
    }
});

app.get("/jsonList", async function (req, res) {
    try {
        const list = await JsonFile.find();
        res.send(200, list);
    } catch (error) {
        res.json(400, {})
    }
});

const port = process.env.PORT || 5001;
app.listen(port, () => {
    console.log(`server listening to port: ${port}`)
})