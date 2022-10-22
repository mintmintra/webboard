const express = require('express');
const dayjs = require('dayjs');
const db = require('../db');

const router = express.Router();


router.get('/new',(request, response) => {
    response.render('postNew')
})

router.post('/new', async (request,response) => {
    const { title, content, from, accepted } = request.body ??  {};
    try {
        //Validation
        if(!title || !content || !from){
            throw new Error('no text');
        }
        else if(accepted != 'on'){
            throw new Error('no accepted')
        }
        // Create post
        await db.insert({ title, content, from }).into('post')
    }
    catch(error){
        console.log(error);
        response.redirect('/p/new/done')
        let errorMessage = 'พบข้อผิดพลาด';
        if(error.message === 'no text'){
            errorMessage = 'กรุณาใส่ข้อมูลให้ครบ'
        }
        else if(error.message === 'no accepted'){
            errorMessage = 'กรุณาติ๊กถูกยอมรับ'
        }
        response.render('postNew', { errorMessage, values: {title, content, from}})
        }
})

router.get('/new/done', (request, response) => {
    response.render('postNewDone');
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