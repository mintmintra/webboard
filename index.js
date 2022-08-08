const express = require('express');
const app = express();

app.get('/', (request, response) => {
    console.log(request.query);
    const { q, sortBy} = request.query;
    response.send(`สวัสดีหน้าแรก Express !! q=${q}, sortBy=${sortBy}`)
})

app.get('/p/:postId', (request, response) => {
    console.log(request.params);
    response.send(`หน้าโพสเดี่ยวๆ`)
})

app.listen(9753, () => {
    console.log('Server started on port 9753')
})