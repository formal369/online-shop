const express = require('express');
const router = express.Router();
const multer = require('multer');

const { Product } = require('../models/Product');
const { auth } = require("../middleware/auth");


var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`)
    },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        if (ext !== '.jpg' || ext !== '.png' || ext !== '.webp') {
            return cb(res.status(400).end('only jpg, png, webp are allowed'), false);
        }
        cb(null, true)
    }
})

var upload = multer({ storage: storage }).single("file")

//=================================
//             Product
//=================================

router.post("/uploadImage", auth, (req, res) => {

    upload(req, res, err => {
        console.log('서버디버그', err)
       if(err) { return res.json({ success: false, err }) } 
       return res.json({ success: true, image: res.req.file.path, fileName: res.req.file.filename})
    })

});

router.post("/uploadProduct", auth, (req, res) => {

    // client로부터 가져온 데이터를 데이터베이스에 저장한다.
    const product = new Product(req.body)

    product.save((err) => {
        if(err) return res.status(400).json({ success: false, err })
        return res.status(200).json({ success: true })
    })
    
});

router.post("/getProducts", auth, (req, res) => {

    let order = req.body.order ? req.body.order : "desc";
    let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
    let limit = req.body.limit ? parseInt(req.body.limit) : 100;
    let skip = parseInt(req.body.skip);

    Product.find()
        .populate("writer")
        .sort([[sortBy, order]])
        .skip(skip)
        .limit(limit)
        .exec((err, products) => {
            if(err) return res.status(400).json({ success: false, err })
            return res.status(200).json({ success: true, products })
        })
    

});

module.exports = router;