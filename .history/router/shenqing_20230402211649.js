const express = require("express")
const router = express()
const db = require("../db")

router.post("/addshenqing", (req, res) => { //添加一个申请 shenqingUserId shenqingGoodId
    const info = req.body
    const sqlstr1 = "select role from user where userId=?"
    db.query(sqlstr1, info.shenqingUserId, (err, result) => {
        console.log(result);
        if (err) {
            return res.send({
                status: 1,
                message: err.message
            })
        }
        if (result.length != 1) {
            return res.send({
                status: 1,
                message: "没这人或有多个同id人"
            })
        }
        if (result[0].role == 3) {
            const sqlstr2 = "select * from good where goodId=?"
            db.query(sqlstr2, info.shenqingGoodId, (err, result) => {
                console.log(result);
                if (err) {
                    return res.send({
                        status: 1,
                        message: err.message
                    })
                }
                if (result.length != 1) {
                    return res.send({
                        status: 1,
                        message: "没这货或有多个同id货"
                    })
                }
                const sqlstr2 = "insert into shenqing set ? "
                // 创建一个Date对象
                var date = new Date();

                // 从Date对象获取年月日
                var year = date.getFullYear();
                var month = ('0' + (date.getMonth() + 1)).slice(-2); // 因为月份是从0开始计数，所以要加1
                var day = ('0' + date.getDate()).slice(-2);

                // 将年月日拼接成字符串
                var dateString = year + '-' + month + '-' + day;

                console.log(dateString);
                db.query(sqlstr2, {
                        shenqingUserId: info.shenqingUserId,
                        shenqingGoodId: info.shenqingGoodId,
                        shenqingStatus: 1,
                        date: dateString
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
            })
        }
    })

})

router.get("/getallshenqing", (req, res) => { //查询所有申请
    const sqlstr = "select * from shenqing"
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


router.get("/deleteshenqing", (req, res) => { //删除
    const info = req.query
    const sqlstr = "delete from shenqing where shenqingId=?"
    db.query(sqlstr, info.shenqingId, (err, result) => {
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

router.get("/getshenqingbyuser", (req, res) => { //根据测评人获得申请
    const info = req.query
    const sqlstr = "select * from shenqing where shenqingUserId=?"
    db.query(sqlstr, info.shenqingUserId, (err, result) => {
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

router.get("/oneshenqinggood", (req, res) => { //根据企业id查他有哪些申请的商品
    const info = req.query //goodProducterId

    const sqlstr1="select * from user where userId=?"//看看有没有这个企业
    db.query(sqlstr1,info.goodProducterId,(err,result)=>{
        if (err) {return res.send({status: 1,message: err.message})}
        if(result.length!=1){return res.send({status: 1,message: "没这个企业"})}

        const sqlstr2 = "select goodId from good where goodProducterId=?" //获取他又有啥货
        db.query(sqlstr2, info.goodProducterId, (err, result) => {
        if (err) {return res.send({status: 1,message: err.message})}
        if(result.length==0){return res.send({status: 1,message: "这企业没货"})}

            let final = []
            const sqlstr3 = "select * from shenqing where shenqingGoodId=?" //获取货对应的申请

            for (let i = 0; i < result.length; i++) { //货有哪些申请
                db.query(sqlstr3, result[i].goodId, (err, result2) => {
                    if (err) {return res.send({status: 1,message: err.message})}
                    
                    final = final.concat(result2)
                    if (i == result.length - 1) {
                         res.send({
                            status: 0,
                            message: "查询成功",
                            data: final
                         })
                    }
                      
        
                })
            }
        
        })
    })

   
})

router.get("/xiugaistatus", (req, res) => { //根据id修改status
    const info = req.body
    const sqlstr = "update shenqing set shenqingStatus=? where shenqingId=?"
    if (info.shenqingStatus == 2 || info.shenqingStatus == 3) {
        db.query(sqlstr, [info.shenqingStatus, info.shenqingId], (err, result) => {
            if (err) {
                return res.send({
                    status: 1,
                    message: err.message
                })
            }
            if (result.affectedRows != 1) {
                return res.send({
                    status: 1,
                    message: "修改失败"
                })
            }
            res.send({
                status: 0,
                message: "修改成功"
            })
        })
    } else {
        res.send({
            status: 1,
            message: "只能改通过或不通过"
        })
    }
})



module.exports = router