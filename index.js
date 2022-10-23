const express = require('express');
const hbs = require('hbs');
const generalRouter = require('./routers/general');
const postsRouter = require('./routers/posts')
const app = express();
app.use(express.urlencoded({extended: true}))
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');
app.use('/static', express.static('static'));

app.use('/', generalRouter)
app.use('/p', postsRouter)

app.get('/p/new',(request, response) => {
    response.render('postNew')
})

app.post('/p/new',(request,response) => {
    console.log(request.body)
    const { title } = request.body ?? {};
    response.send(`Submit Form Title=${title}`)
})

app.get('/p/:postId', (request, response) => {
    console.log(request.params);
    const { postId } = request.params;
    const onePost = allPosts.find(post => post.id === +postId);
    const customTitle = !!onePost ? `${onePost.title} | ` : 'ไม่พบเนื้อหา | '
    response.render('postId', { onePost, customTitle });
})

app.listen(9753, () => {
    console.log('Server started on port 9753')
})