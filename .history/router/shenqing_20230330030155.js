const express=require("express")
const router=express()
const db=require("../db")

router.post("/addshenqing",(req,res)=>{//添加一个申请 shenqingUserId shenqingGoodId
    const info=req.body
    const sqlstr1="select role from user where userId=?"
    db.query(sqlstr1,info.shenqingUserId,(err,result)=>{
        console.log(result);
        if(err){return res.send({status:1,message:err.message})}
        if(result.length!=1){return res.send({status:1,message:"没这人或有多个同id人"})}
        if(result[0].role==3){
            const sqlstr2="select * from good where goodId=?"
            db.query(sqlstr2,info.shenqingGoodId,(err,result)=>{
                console.log(result);
                if(err){return res.send({status:1,message:err.message})}
                if(result.length!=1){return res.send({status:1,message:"没这货或有多个同id货"})}
                    const sqlstr2="insert into shenqing set ? "
                    db.query(sqlstr2,{shenqingUserId:info.shenqingUserId,shenqingGoodId:info.shenqingGoodId,shenqingStatus:1},
                    (err,result)=>{ 
                    if(err){return res.send({status:1,message:err.message})}
                    if(result.affectedRows!=1){return res.send({status:1,message:"添加失败"})}
                    res.send({status:0,message:"添加成功"})
                    })
            })
        }
    })
       
})

router.get("/getallshenqing",(req,res)=>{//查询所有申请
    const sqlstr="select * from shenqing"
    db.query(sqlstr,(err,result)=>{
        if(err){return res.send({status:1,message:err.message})}
        res.send({
            status:0,
            message:"查询成功",
            data:result
        })
    })
})

router.get("/getallshenqing",(req,res)=>{//根据企业id查询所有申请
    const sqlstr="select * from good where goodProducterId=" + req.query.id
    db.query(sqlstr,(err,result)=>{
        if(err){return res.send({status:1,message:err.message})}
        res.send({
            status:0,
            message:"查询成功",
            data:result
        })
    })
})


router.get("/deleteshenqing",(req,res)=>{//删除
    const info=req.body
    const sqlstr="delete from shenqing where shenqingId=?"
    db.query(sqlstr,info.shenqingId,(err,result)=>{
        if(err){return res.send({status:1,message:err.message})}
        if(result.affectedRows!=1){return res.send({status:1,message:"删除失败"})}
        res.send({status:0,message:"删除成功"})
    })
})

router.get("/xiugaistatus",(req,res)=>{//根据id修改status
    const info=req.body
    const sqlstr="update shenqing set shenqingStatus=? where shenqingId=?"
    if(info.shenqingStatus==2||info.shenqingStatus==3){
         db.query(sqlstr,[info.shenqingStatus,info.shenqingId],(err,result)=>{
        if(err){return res.send({status:1,message:err.message})}
        if(result.affectedRows!=1){return res.send({status:1,message:"修改失败"})}
        res.send({status:0,message:"修改成功"})
    })
    }
   else{  res.send({status:1,message:"只能改通过或不通过"})}
})



module.exports=router