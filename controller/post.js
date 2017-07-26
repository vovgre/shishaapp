var Post = require('../models/post');
var config = require('../config/settings'),
    cloudinary = require('cloudinary');
var multipart = require('connect-multiparty')();

cloudinary.config({
     'cloud_name': 'dri4jrgkf',
    'api_key': '144571544352698',
    'api_secret': 'F7TmkfVmtK77zGwRPK_-WBqOMFI'
});


module.exports = {

    upload: function (req, res, next) {
        
        cloudinary.uploader.upload(req.files.file.path, function (resp) {

            var newPost = new Post({
                title: req.body.title,
                image_url: resp.url,
                description: req.body.description
            }).save(function (err, response) {
                if (err) return next(err);
                res.json({
                    error: false,
                    result: response
                });
            })

        });

    },
    get: function (req, res, next) {
        Post.find({}, function (err, result) {
            if(err) return next(err);
            res.json({posts:result});
        });
    }

}
