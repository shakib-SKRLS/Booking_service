const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const apiRoutes = require('./routes/index');
const db = require('./models/index');

const {PORT} = require('./config/serverConfig');

const setupAndStartServer = async () => {
    try {
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true }));

        app.use('/api', apiRoutes);
        app.listen(PORT, () => {

            if(process.env.DB_SYNC === 'true') {
                db.sequelize.sync({ alter: true });
            }
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Error starting the server:', error);
    }
};

setupAndStartServer();