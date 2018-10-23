var db = require('./db_base')
var DBBase = db.DBBase
var mongoose = db.mongoose
var Schema = mongoose.Schema

//创建商品信息数据结构
var FoodSchema = new Schema({
    name: String,
    img: String,
    type: String,
    price: {
        type: Number,
        default: 0
    },
    description: String
})

var Food = mongoose.model('food',FoodSchema)

// FoodSchema.virtual('food_type',{
//     ref:"food_type",
//     localField:"type",
//     foreignField:"name"
// })

class FoodDal extends DBBase{
    constructor(){
        super(Food)
    }
}

module.exports = {
    Food:Food,
    FoodDal:FoodDal
}