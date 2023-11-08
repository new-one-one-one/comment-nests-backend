const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))

require('dotenv').config()

const logger = require("./helpers/logger");
const {checkMongoDBConnection} = require("./helpers/connections")

const PORT = process.env.PORT || 8000;

checkMongoDBConnection();

app.use('/auth', require('./routes/authRoutes'));
app.use('/post', require('./routes/postRoutes'));
app.use('/comment', require('./routes/commentRoutes'));


app.listen(PORT, (err) => {
    if(err) {
        logger.error(JSON.stringify(err))
        process.exit(0);
    }
    logger.info(`Server is running on port ${PORT}`);
});
