var express = require('express');
var router = express.Router();
const ytdl = require('ytdl-core');


router.post('/play',async function(req, res){
    if(req.body.vid) {
        console.log("hi");
        ytdl.getInfo(req.body.vid, (err, info) => {
            if (err) {
                console.log(err);
                return res.status(422).send({code:422, status:"err", err:err});
            }
            console.log("hi2");
            let data = info.formats.map(o=>{return a = {qualityLabel: o.qualityLabel, itag: o.itag, url:o.url, container:o.container, live:o.live}});
            res.json({code:200, status:"success", formats:data});
        });
    } else res.status(400).send({code:400, status:"err", err:"send url pls"});
});

router.get('/',async function(req, res){
    res.json({code:200, status:"success"});
});


module.exports = router;
