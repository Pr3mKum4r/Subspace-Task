const app = require('./app');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const PORT = process.env.PORT || 8000;

const server = app.listen(PORT, () => {
    console.log(`Server Running on PORT ${PORT}`)
})

process.on('unhandledRejection', err =>{
    console.log(err.name, err.message, err.stack);
    console.log('Shutting Down ....');
    server.close(()=>{
        process.exit(1);
    })
})