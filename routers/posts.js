const express = require('express');
const db = require('../db');

const router = express.Router();


router.get('/new',(request, response) => {
    response.render('postNew')
})

router.post('/new',(request,response) => {
    console.log(request.body)
    const { title } = request.body ?? {};
    response.send(`Submit Form Title=${title}`)
})

router.get('/:postId', async (request, response) => {
    const { postId } = request.params;

    let onePost = null;
    let postComments = [];
    try{
        //Get one post
        const somePosts = await db
            .select('*')
            .from('post')
            .where('id', +postId)
        onePost = somePosts[0];

        //Get post comments
        postComments = db
            .select('*')
            .from('comment')
            .where('postId', +postId)
    }
    catch (error){
        console.log(err)
    }
    const customTitle = !!onePost ? `${onePost.title} | ` : 'ไม่พบเนื้อหา | '
    response.render('postId', { onePost, postComments, customTitle });
})

module.exports = router;