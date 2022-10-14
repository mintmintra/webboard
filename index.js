const express = require('express');
const app = express();

app.get('/', (request, response) => {
    console.log(request.query);
    const { q, sortBy} = request.query;
    response.send(`สวัสดีหน้าแรก Express !! q=${q}, sortBy=${sortBy}`)
})

app.get('/p/new',(request, response) => {
    response.send('ฟอร์มสร้างโพสต์ใหม่')
})

app.post('/p/new',(request,response) => {
    console.log(request.body)
    response.send('Submit Form')
})

app.get('/p/:postId', (request, response) => {
    console.log(request.params);
    const { postId } = request.params;
    response.send(`หน้าโพสเดี่ยวๆ ID=${postId}`)
})

app.listen(9753, () => {
    console.log('Server started on port 9753')
})