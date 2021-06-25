const router= require('express').Router()
const alien = require('../models/alien')
const bcrypt = require('bcrypt')


router.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')

router.get('/home', async (req, res) => {
    const aliens = await alien.find()
    console.log(aliens, 'hey aliens')
    res.json({"message":"this is homepage"})
})

    router.get('/sign', (req, res) => {
        res.sendFile(__dirname + '/singin.html')
    })
})


router.get('/log', async (req, res) => {
    res.sendFile(__dirname + '/login.html')

})

router.post('/sign', async (req, res) => {
    try{
    var securepassword = await bcrypt.hash(req.body.password, 10)

    const us = {email : req.body.email, password : req.body.password}

        const all = new alien({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            contact: req.body.contact,
            Username: req.body.Username,
            password: securepassword
        })
        all.save((err, data) => {
            if (err) { res.json({ "error": err }) };
            res.json({ "message": "created successfully", "data": data });
            console.log(data);
        })
            }

    catch (error) {
        res.send(error)
        console.log(error);
    }
})



router.post('/log', async (req, res) => {

    try {
        const user = await alien.find({
            Username: req.body.logname
        })

        if (user[0].Username != req.body.logname) {
            console.log('Username not found');
            res.redirect('/alien/log');
        }
        else {
            bcrypt.compare(req.body.pass, user[0].password, (err, result) => {
             
                if (result == true) {
                    res.json({"message":"login successfully"});
                    console.log('login suucessfully');
                } else {
                    res.redirect('/log');
                    console.log('Incorrect password');
                }
            });
        }}
    catch (error) {
        console.log(error);
    }})


router.put('/:id', async (req, res) => {
    try {
        securepassword = await bcrypt.hash(req.body.password, 10)

        await alien.updateMany({
            _id: req.params.id
        }, {
            $set: {
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                contact: req.body.contact,
                Username: req.body.Username,
                password: req.body.securepassword
            }
        })
            .exec((err, data) => {
                if (err) {
                    res.send(err)
                    console.log(err)
                }
                else {
                    res.json({ "message": "User Updated Successfully" })
                    console.log(data)
                }
            })
    }
    catch (error) {
        console.log(error);

    }

})

router.delete('/:id', async (req, res) => {
    try {
        await alien.deleteOne({
            _id: req.params.id
        })
            .exec((err, data) => {
                if (err) {
                    res.send(err)
                    console.log(err)
                }
                else {
                    res.json({ "message": "User Deleled Successfully" })
                    console.log(data)
                }
            })
    }
    catch (error) {
        console.log(error);

    }

})
module.exports = router

