> 通过express框架实现在线图书商城,数据存储在mongodb数据库中

项目目录介绍  
```
./spider 用于抓取书籍数据存储在本地数据库中
```

#### 需要实现以下功能
1. 前台用户注册
2. 管理后台中可以查看已经注册的用户的信息

```
用户注册需要填写的个人信息如下
1. 手机号,作为登录账号使用(mobile)
2. 密码(pwd)
3. 邮箱(email)
4. 姓名(name)
5. 收件地址(address)
6. 注册时间(reg_time,需要你设计数据结构的时候填写默认值)
用户信息的数据集合为 users
用户管理后台的访问地址为:
	列表	/admin/users/list/1
	新增	/admin/users/add
	修改	/admin/users/edit
用户前台注册页面的访问地址为:
	/reg
前台页面要求使用weui实现手机页面效果
```
#### 
1. 前台部分用户登录判断
2. 用户对书籍信息进行购买的时候需要登录
3. 登录的用户显示个人中心
4. 没有登录的用户显示登录页面,在登录页面可以跳转到注册页面

#### mongodb数据库

1. 安装
	```
	下载安装包,设置安装路径在 c:\MongoDB 文件夹
    在c盘下面,创建目录mongo
        创建文件夹 db log
        创建文件 mongod.cfg,书写内容
            logpath=c:\mongo\log\mongod.log
            dbpath=c:\mongo\db
    进入mongodb的bin目录运行以下命令将其安装为系统服务
    以下为git bash中的写法
         ./mongod --config c:/mongo/mongod.cfg --install
	```
	2.  mongodb基础命令
	``` 
	#进入xx/bin 文件夹 运行 mongo 链接数据库
	db #查看当前数据库
	show dbs #查看所有的数据库
	// db.books.find()
	// upsert:true 如果存在就更新,不存在就新增
	// db.books.update(
	//     { title: '红楼梦1' }, 
	//     { $set: 
	//         { 'publisher': '北京文艺出版社' } 
	//     }, 
	//     { upsert: true }
	// )
	// db.students.find()
	// db.students.update({name:"Jerry"},{$set:{address:''}})
	// multi:true 更新查询到的所有记录,默认值为false 只更新第一条记录
	// db.students.update({},{$set:{address:'厦门'}},{multi:true})

	// db.books.remove({title:'红楼梦1'})
	// db.books.find({title:'红楼梦',author:'曹雪芹'})
	//: 等于
	// db.students.find({age:{$lte:18},name:'Tom'})
	db.students.find({$or:[{age:{$lt:18}},{name:"Jerry"}]})
	```
	3. 常见问题
   ```
	 以上操作无误，就是连接不上。
	 计算机属性 服务 mongondb启动一下
	 ```