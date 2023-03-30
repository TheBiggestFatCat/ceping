const express=require("express")
const router=express()
const db=require("../db")

router.post("/addceping",(req,res)=>{//添加一个测评表 cepingText,cepingerId,cepingGoodId,cepingDate,cepingPicture
    const info=req.body
    const sqlstr1="select role from user where userId=?"
    db.query(sqlstr1,info.cepingerId,(err,result)=>{
       
        if(err){return res.send({status:1,message:err.message})}
        if(result.length!=1){return res.send({status:1,message:"没这人或有多个同id人"})}
        if(result[0].role!=3){return res.send({status:1,message:"没这人或有多个同id人"})}
        if(result[0].role==3){
            const sqlstr2="select * from good where goodId=?"
            db.query(sqlstr2,info.cepingGoodId,(err,result)=>{
                
                if(err){return res.send({status:1,message:err.message})}
                if(result.length!=1){return res.send({status:1,message:"没这货或有多个同id货"})}
                const sqlstr3="select shenqingStatus from shenqing where shenqingUserId=? and shenqingGoodId=?"
                db.query(sqlstr3,[info.cepingerId,info.cepingGoodId],(err,result)=>{
                    if(err){return res.send({status:1,message:err.message})}
                    if(result.pop().shenqingStatus==2){
                        const sqlstr="insert into ceping set ? "
                        db.query(sqlstr,{cepingText:info.cepingText,cepingerId:info.cepingerId,cepingGoodId:info.cepingGoodId,cepingDate:info.cepingDate,cepingPicture:info.cepingPicture},
                        (err,result)=>{
                        if(err){return res.send({status:1,message:err.message})}
                        if(result.affectedRows!=1){return res.send({status:1,message:"添加失败"})}
                        res.send({status:0,message:"添加成功"})
                    })
                    }
                    if(result.pop().shenqingStatus!=2){res.send({status:1,message:"审核未通过"})}
                    
                })
                
                
                //
            })
        }
    })
    
})

router.get("/getallceping",(req,res)=>{//查询所有测评
    const sqlstr="select * from ceping"
    db.query(sqlstr,(err,result)=>{
        if(err){return res.send({status:1,message:err.message})}
        res.send({
            status:0,
            message:"查询成功",
            data:result
        })
    })
})


router.get("/deleteceping",(req,res)=>{//删除
    const info=req.body
    const sqlstr="delete from ceping where cepingId=?"
    db.query(sqlstr,info.cepingId,(err,result)=>{
        if(err){return res.send({status:1,message:err.message})}
        if(result.affectedRows!=1){return res.send({status:1,message:"删除失败"})}
        res.send({status:0,message:"删除成功"})
    })
})

router.post("/xiugaiceping",(req,res)=>{//修改测评 cepingText,cepingDate,cepingPicture
    const info =req.body
  
    const sqlstr="update ceping set ? where cepingId=?"
    db.query(sqlstr,[info,info.cepingId],(err,result)=>{
        if(err){return res.send({status:1,message:err.message})}
        if(result.affectedRows!=1){return res.send({status:1,message:"更新失败"})}
        res.send({status:0,message:"更新成功"})
    })
})

module.exports=router