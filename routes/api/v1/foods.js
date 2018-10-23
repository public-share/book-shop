var express = require('express')
var router = express.Router()
var FoodDal = require('../../../common/food').FoodDal
var foodDal = new FoodDal()

router.get('/',(req,res)=>{
    var page = 1 // 分页页码
    if(req.query.page){
        page = Number(req.query.page)
    }
    var filter = {}
    if(req.query.type){
        filter.type = req.query.type
    }
    // console.log(filter)
    foodDal.getDataByPage(page,filter,data=>{
        res.json({status:'y',msg:"获取分页数据成功",data:data})
    })
})
// router.get('/type',(req,res)=>{
//     console.log(req.query.type)
//     foodDal.getData({type:req.query.type},data=>{
//         res.json({status:'y',msg:"获取数据成功",data:data})
//     })
// })
//查找一条数据
router.get('/:id',(req,res)=>{
    foodDal.findByID(req.params.id,data=>{
        res.json({status:'y',msg:'获取数据成功',data:data})
    })
})

//新增一条记录
router.post('/create',(req,res)=>{
    console.log(req.body)
    foodDal.save(req.body,isOK=>{
        if(isOK){
            res.json({status:'y',msg:'新增记录成功'})
        }
        else{
            res.json({status:'n',msg:'新增记录失败,未知错误'})
        }
    })
})

//更新一条记录
router.post('/update/:id',(req,res)=>[
    foodDal.updateByID(req.params.id,req.body,isOK=>{
        if(isOK){
            res.json({status:'y',msg:'修改记录成功'})
        }
        else{
            res.json({status:'n',msg:'记录修改失败,未知错误'})
        }
    })
])

//删除一条记录
router.post('/delete/:id',(req,res)=>{
    foodDal.del(req.params.id,isOK=>{
        if(isOK){
            res.json({status:'y',msg:'删除数据成功'})
        }
        else{
            res.json({status:'n',msg:"删除记录失败,未知错误"})
        }
    })
})

module.exports = router