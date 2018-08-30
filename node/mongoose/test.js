var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/test");

mongoose.connection.once("open",function(){
    console.log("open");

});

mongoose.connection.once("close",function(){
    console.log("close");
})

var Schema = mongoose.Schema;
var mySchema = new Schema({
    name:String,
    sex:{
        type:String,
        default:"female"
    },
    age:Number
});

var ManModel = mongoose.model("man",mySchema);
ManModel.create([
    {
        name:"白骨精",
        age:16
    },
    {
        name:"红孩儿",
        age:8
    },{
        name:"孙悟空",
        age:16
    },{
        name:"唐僧",
        age:16
    },{
        name:"猪八戒",
        age:16
    }
    ,{
        name:"沙和尚",
        age:16
    }
],function(err){
    console.log("插入成功!".toString());
})