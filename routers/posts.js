const express = require('express');
const dayjs = require('dayjs');
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
        onePost.createdAtText = dayjs(onePost.createdAt).format('D MMM YYYY - HH:mm');

        //Get post comments
        postComments = await db
            .select('*')
            .from('comment')
            .where('postId', +postId)
        postComments = postComments.map(comment => {
            const createdAtText = dayjs(comment.createdAt).format('D MMM YYYY - HH:mm');
            return {...comment, createdAtText}
        })
    }
    catch (error){
        console.log(err)
    }
    const customTitle = !!onePost ? `${onePost.title} | ` : 'ไม่พบเนื้อหา | '
    response.render('postId', { onePost, postComments, customTitle });
})

module.exports = router;