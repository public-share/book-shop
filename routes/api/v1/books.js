var express = require('express')
var router = express.Router()
var BookDal = require('../../../common/book').BookDal
var bookDal = new BookDal()

router.get('/get_data',(req,res)=>{
	bookDal.getData({type:"jingji"},books=>{
		res.json({
			status:'y',
			msg:'请求成功',
			data:books
		})
	})

	// setTimeout(function(){
	// 	res.json({
	// 		status:'y',
	// 		msg:'请求成功',
	// 		data:[]
	// 	})
	// },5000)
})

//无条件返回数据
router.get('/',(req,res)=>{
	var filter = {}
	if(req.query.type){
		filter = {type:req.query.type}
	}
	var page = 1
    if (req.query.page) {
        page = req.query.page
    }
    bookDal.getDataByPage(page,filter, data => {
		console.log(data)
        res.json(data.res)
    })

	// bookDal.getData(filter,data=>{
	// 	// res.json({status:'y',msg:"获取数据成功",data:data})
	// 	res.json(data)
	// })
})

router.get('/get_page_count',(req,res)=>{
	var page = 1
    if (req.query.page) {
        page = req.query.page
    }
    bookDal.getDataByPage(page,{type:req.query.type}, data => {
        res.json(data)
    })
})

// 根据id获取单条记录
// /api/v1/books/...
router.get('/:id',(req,res)=>{
	bookDal.findByID(req.params.id,data=>{
		// res.json({status:'y',msg:'获取数据成功',data:data})
		res.json(data)
	})
})

//根据id更新一条记录
router.put('/:id',(req,res)=>{
	console.log(req.body)
	delete req.body._id //删除不需要修改的数据
	delete req.body.__v //删除不需要修改的数据
	bookDal.updateByID(req.params.id,req.body,isOk=>{
		if(isOk){
			// res.json({status:'y',msg:'修改数据成功成功',data:req.body})
			res.json(req.body)
		}
		else{
			// res.json({status:'n',msg:'修改数据失败'})
			res.json(req.body)
		}
	})	
})

//新增记录
router.post('/',(req,res)=>{
	if(!req.body.type){
		req.body.type = "qita"
	}
	bookDal.save(req.body,(isOk,data)=>{
		//判断当前传递过来的数据是否有type属性,如果没有为其添加一个type为qita
		
		if(isOk){
			// res.json({status:'y',msg:'新增数据成功',data:data})
			res.json(data)
		}
		else{
			// res.json({status:'n',msg:'新增数据失败',data:req.body})
			res.json(req.body)
		}
	})
})

router.delete('/:id',(req,res)=>{
	bookDal.del(req.params.id,isOk=>{
		// res.json({status:'y',msg:'删除数据成功',data:{}})
		res.json({})
	})
})
module.exports = router