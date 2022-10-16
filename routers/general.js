const express = require('express');
const router = express.Router();

const allPosts = [
    {id:2, title:'น่ารัก 222', from :'คนน่ารัก', createdAtText: '14 April 2022', commentsCount: 2},
    {id:1, title:'น่ารัก 111', from :'คนน่ารัก', createdAtText: '10 April 2022', commentsCount: 0}
]

router.get('/', (request, response) => {
    response.render('home',{allPosts})
})

module.exports = router;