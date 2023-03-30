const mysql=require("mysql")
const db=mysql.createPool({
    host:"127.0.0.1",
    user:"root",
    password:"Zqy12345",
    database:"ceping"
})
module.exports =db
// CREATE TABLE `shenqing`(
// 	shenqingId INT(2) PRIMARY KEY AUTO_INCREMENT,
//  shenqingUserId INT(2) NOT NULL,
// 	shenqingGoodId INT(2) NOT NULL,
// 	shenqingStatus INT(2) NOT NULL/*1申请中，2通过，3不通过*/
// )

// 接收一个sql语句 以及所需的values
// 这里接收第二参数values的原因是可以使用mysql的占位符 '?'
// 比如 query(`select * from my_database where id = ?`, [1])

// CREATE TABLE `ceping`(
// 	cepingId INT(2) PRIMARY KEY AUTO_INCREMENT,
// 	cepingText TEXT ,
// 	cepingerId INT(2) NOT NULL,
// 	cepingGoodId INT(2) NOT NULL,
// 	cepingDate DATE NOT NULL,
// 	cepingPicture VARCHAR(255) 
// )


// CREATE TABLE `good`(
// 	goodId INT(2) PRIMARY KEY AUTO_INCREMENT,/*商品id 自增长*/
// 	goodName VARCHAR(20) NOT NULL,/*商品名字*/
// 	goodProducterId INT(2) NOT NULL,/*商品生产商*/
// 	goodPicture VARCHAR(200),/*商品图片存放位置*/
//  	goodDate DATE NOT NULL,
//  	goodPrice INT(20) NOT NULL,
//  	goodText TEXT NOT NULL
// )



// CREATE TABLE `user`(
// 	userId INT(2) PRIMARY KEY AUTO_INCREMENT,/*用户id 自增长*/
// 	username VARCHAR(20) UNIQUE NOT NULL,/*用户名*/
// 	`password` VARCHAR(20) NOT NULL, 
// 	picture VARCHAR(200),/*头像存放位置*/
//  	`role` INT(2) NOT NULL /*1：管理ya// 2：企业b  //3：测评//*/
// )