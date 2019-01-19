const server = require('./server');

const port = process.env.PORT || 4000;

server.app.listen(`${port}`, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log(`Listening on Port ${port}`);
    }
});