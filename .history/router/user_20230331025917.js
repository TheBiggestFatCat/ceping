const express=require("express")
const router=express()
const db=require("../db")

router.post('/adduser',(req,res)=>{//添加一个人传入username,password,picture,role
   const userInfo=req.body
  

    const sqlstr="insert into user set ?"
    db.query(sqlstr,{username:userInfo.username,password:userInfo.password,picture:userInfo.picture,role:userInfo.role},(err,result)=>{
        if(err){return res.send({status:1,message:err.message})}
        
        if(result.affectedRows!=1){return res.send({status:1,message:"添加失败"})}
        
        res.send({status:0,message:"添加成功"})
    })
})

router.get("/getalluser",(req,res)=>{//查询所有用户
    const sqlstr="select * from user"
    db.query(sqlstr,(err,result)=>{
        if(err){return res.send({status:1,message:err.message})}
        res.send({
            status:0,
            message:"查询成功",
            data:result
        })
    })
})

router.get("/deleteuser",(req,res)=>{//删除一个人
    const info=req.query
    const sqlstr="delete from user where userId=?"
    db.query(sqlstr,info.userId,(err,result)=>{
        if(err){return res.send({status:1,message:err.message})}
        if(result.affectedRows!=1){return res.send({status:1,message:"删除失败"})}
        res.send({status:0,message:"删除成功"})
    })
})

router.get("/selectuser",(req,res)=>{//查询一个人
    const info=req.query
    const sqlstr="select * from user where userId=?"
    db.query(sqlstr,info.userId,(err,result)=>{
        if(err){return res.send({status:1,message:err.message})}
        res.send({status:0,message:'查询成功',data:result})
    })
})

router.post("/xiugaiuser",(req,res)=>{//修改人 username,password,picture
    const info =req.body
  
    const sqlstr="update user set ? where userId=?"
    db.query(sqlstr,[info,info.userId],(err,result)=>{
        if(err){return res.send({status:1,message:err.message})}
        if(result.affectedRows!=1){return res.send({status:1,message:"更新失败"})}
        res.send({status:0,message:"更新成功"})
    })
})

router.post("/yanzhen",(req,res)=>{//根据名字密码和role查是否有这人
    const info =req.body
   console.log(info);
    const sqlstr="select * from user where username=? and password=? and role=? "
    db.query(sqlstr,[info.username,info.password,info.role],(err,result)=>{
        if(err){return res.send({status:1,message:err.message})}
        if(result.length!=1){return res.send({status:1,message:"没这个人"})}
        res.send({status:0,message:"验证成功",data:result[0].userId})
    })
})

router.get("/oneshenqinggood",(req,res)=>{//根据id查他有哪些申请的商品
    const info=req.query//goodProducterId
    const sqlstr1="select goodId from good where goodProducterId=?"//获取他又有啥货
    db.query(sqlstr1,info.goodProducterId,(err,result)=>{
        if(err){return res.send({status:1,message:err.message})}
      
        let final=[]
        const sqlstr2="select * from shenqing where shenqingGoodId=?"//获取货对应的申请
        for(let i =0;i< result.length;i++){//货有哪些申请
            db.query(sqlstr2,result[i].goodId,(err,result2)=>{
                if(err){return res.send({status:1,message:err.message})}
                final=final.concat(result2)
                if(i==result.length-1){res.send({status:0,message:"查询成功",data:final})}
            })  
        }
        // res.send({status:0,message:"查询成功",data:final})
    })
})
module.exports=router