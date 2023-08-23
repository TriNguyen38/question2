import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
id:{
    type: Number,
    required: true
},
sku: {
    type: String,
    required: true
},
description:{
    type: String,
    required: true
},
instock:{
    type: Number,
    required: true
}

},{
    versionKey: false,timestamps: true
})

export default mongoose.model('Product', productSchema)