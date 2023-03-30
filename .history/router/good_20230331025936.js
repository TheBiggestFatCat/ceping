const express = require("express")
const router = express()
const db = require("../db")

router.post("/addgood", (req, res) => { //添加一个商品 goodName,goodProducterId,goodPicture,goodDate,goodPrice,goodtext
    const info = req.body
    const sqlstr1 = "select role from user where userId=?"
    db.query(sqlstr1, info.goodProducterId, (err, result) => {
        console.log(result);
        if (err) {
            return res.send({
                status: 1,
                message: err.message
            })
        }
        if (result.length != 1 || result[0].role != 2) {
            return res.send({
                status: 1,
                message: "没这公司或有多个同id公司"
            })
        }
        if (result[0].role == 2) {
            const sqlstr2 = "insert into good set ? "
            db.query(sqlstr2, {
                    goodName: info.goodName,
                    goodProducterId: info.goodProducterId,
                    goodPicture: info.goodPicture,
                    goodDate: info.goodDate,
                    goodPrice: info.goodPrice,
                    goodText: info.goodText
                },
                (err, result) => {
                    if (err) {
                        return res.send({
                            status: 1,
                            message: err.message
                        })
                    }
                    if (result.affectedRows != 1) {
                        return res.send({
                            status: 1,
                            message: "添加失败"
                        })
                    }
                    res.send({
                        status: 0,
                        message: "添加成功"
                    })
                })
        }

    })

})

router.get("/getallgood", (req, res) => { //查询所有物品
    const sqlstr = "select * from good"
    db.query(sqlstr, (err, result) => {
        if (err) {
            return res.send({
                status: 1,
                message: err.message
            })
        }
        res.send({
            status: 0,
            message: "查询成功",
            data: result
        })
    })
})

router.get("/getrandgood", (req, res) => { //查询所有物品
    const sqlstr = "select * from good Order By rand() Limit 4"
    db.query(sqlstr, (err, result) => {
        if (err) {
            return res.send({
                status: 1,
                message: err.message
            })
        }
        res.send({
            status: 0,
            message: "查询成功",
            data: result
        })
    })
})

router.post("/searchgood", (req, res) => { //模糊查找所有good
    const info = req.body
    const like = "%" + info.search + "%"
    sqlstr = "select * from good where goodName like ? "
    db.query(sqlstr, like, (err, result) => {
        if (err) {
            return res.send({
                status: 1,
                massage: err.message
            })
        }

        res.send({
            status: 0,
            message: "cahxun成功",
            data: result
        })
    })
})

router.get("/getgoodbyid", (req, res) => { //查询所有测评byuserid
    const info = req.query

    const sqlstr = "select * from good where goodProducterId=?"
    db.query(sqlstr, info.goodProducterId, (err, result) => {
        if (err) {
            return res.send({
                status: 1,
                message: err.message
            })
        }
        res.send({
            status: 0,
            message: "查询成功",
            data: result
        })
    })
})


router.get("/deletegood", (req, res) => { //删除
    const info = req.query
    const sqlstr = "delete from good where goodId=?"
    db.query(sqlstr, info.goodId, (err, result) => {
        if (err) {
            return res.send({
                status: 1,
                message: err.message
            })
        }
        if (result.affectedRows != 1) {
            return res.send({
                status: 1,
                message: "删除失败"
            })
        }
        res.send({
            status: 0,
            message: "删除成功"
        })
    })
})

router.post("/xiugaigood", (req, res) => { //修改商品 goodName,goodPicture,goodDate ，goodPrice,goodText
    const info = req.body

    const sqlstr = "update good set ? where goodId=?"
    db.query(sqlstr, [info, info.goodId], (err, result) => {
        if (err) {
            return res.send({
                status: 1,
                message: err.message
            })
        }
        if (result.affectedRows != 1) {
            return res.send({
                status: 1,
                message: "更新失败"
            })
        }
        res.send({
            status: 0,
            message: "更新成功"
        })
    })
})


module.exports = router