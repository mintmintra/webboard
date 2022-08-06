const express = require('express');
const app = express();

app.get('/', (request, response) => {
    response.send('สวัสดีหน้าแรก Express !!')
})

app.listen(9753, () => {
    console.log('Server started on port 9753')
})