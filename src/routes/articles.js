const router = require('express').Router();
const Article = require('../models/Article');
const { isAuthenticated } = require('../helpers/auth');

router.post('/articles/new', isAuthenticated, async (req,res) => {
    
    const {
        title,
        content
    } = req.body;

    const errors = [];

    if (!title){
        errors.push({text: 'Please Write a Title'});
    }

    if(!description){
        errors.push({text: 'Please Write a Content'});
    }

    if(errors.length > 0){

        res.render({"Errors": errors});

    } else {

        const newArticle = new Article({
            title,
            content
        });

        newArticle.user = req.user.id;
        await newArticle.save();
        res.json({'success_msg': 'Article Added Succesfully'});
    }
});

router.get('/articles', isAuthenticated, async (req,res) => {
    const articles = await Article.find({user: req.user.id}).sort({ date: 'desc'});
    res.jsom({"Articles": articles });
});

router.put('/articles/edit/:id', isAuthenticated, async (req, res) =>{
    const {
        title,
        content
    } = req.body;

    await Article.findByIdAndUpdate(req.params.id, {title, content, user});
    res.json({'success_msg': 'Article Updated Successfully'});
});

router.delete('/articles/delete/:id', isAuthenticated,async (req, res) => {
    await Article.findByIdAndDelete(req.params.id);
    res.json({'success_msg': 'Article Deleted Successfully'});
});

module.exports = router;