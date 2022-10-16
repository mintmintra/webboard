const express = require('express');
const router = express.Router();

const allPosts = [
    {id:2, title:'น่ารัก 222', from :'คนน่ารัก', createdAtText: '14 April 2022', commentsCount: 2},
    {id:1, title:'น่ารัก 111', from :'คนน่ารัก', createdAtText: '10 April 2022', commentsCount: 0}
]

router.get('/new',(request, response) => {
    response.render('postNew')
})

router.post('/new',(request,response) => {
    console.log(request.body)
    const { title } = request.body ?? {};
    response.send(`Submit Form Title=${title}`)
})

router.get('/:postId', (request, response) => {
    console.log(request.params);
    const { postId } = request.params;
    const onePost = allPosts.find(post => post.id === +postId);
    const customTitle = !!onePost ? `${onePost.title} | ` : 'ไม่พบเนื้อหา | '
    response.render('postId', { onePost, customTitle });
})

module.exports = router;