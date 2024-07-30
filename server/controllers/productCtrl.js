const Products = require("../models/productModel");

class APIfeatures{

    constructor(query,queryString){
        this.query = query;
        this.queryString = queryString;
    }

    filtering(){

        const queryObj = {...this.queryString};

        const excludedFields = ['page','sort','limit'];

        excludedFields.forEach(el=>delete(queryObj[el]));

        let queryStr = JSON.stringify(queryObj)
        queryStr = queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g, match => '$' + match)

        this.query.find(JSON.parse(queryStr))

        return this

    }

    sorting(){
        if(this.queryString.sort){
            const sortBy = this.queryString.sort.split(',').join('')

            this.query = this.query.sort(sortBy)

            console.log(sortBy)
        }else{
            this.query = this.query.sort('-createdAt')
        }

        return this
    }

    pagination(){
        const page = this.queryString.page * 1 || 1;

        const limit =  this.queryString.limit * 1 || 9;

        const skip = (page-1) * limit;

        this.query = this.query.skip(skip).limit(limit);

        return this;
    }
}



const productCtrl = {
    getProducts:async(req,res)=>{
        try {

            const features = new APIfeatures(Products.findOne(),req.query).filtering().sorting().pagination();
            const products = await features.query

            res.json(products);
        } catch (error) {
            return res.status(500).json({msg:error.message});
        }
    },
    createProducts:async(req,res)=>{
        try {
            const{product_id,title,price,description,content,imageUrl,category} = req.body;

            if(!imageUrl) return res.status(400).json({msg:"no image uploaded"});

            const product = await Products.findOne({product_id});

            if(product) return res.status(400).json({msg:"product already exists"});

            const newProduct = new Products({product_id,title:title.toLowerCase(),price,description,content,imageUrl,category})

            await newProduct.save();

            res.json({msg:"created a product"})
        } catch (error) {
            return res.status(500).json({msg:error.message});
        }
    },
    deleteProduct:async(req,res)=>{
        try {
            await Products.findByIdAndDelete(req.params.id)
            res.json({msg:"deleted a product"})
        } catch (error) {
            return res.status(500).json({msg:error.message});
        }
    },
    updateProduct:async(req,res)=>{
        try {
            const {title,price,description,content,imageUrl,category} = req.body;

            if(!imageUrl) return res.status(400).json({msg:"No Image upload"});

            await Products.findByIdAndUpdate({_id:req.params.id,title:title.toLowerCase(),price,description,content,imageUrl,category})

            res.json({msg:"updated a product"});
        } catch (error) {
            return res.status(500).json({msg:error.message});
        }
    }
}


module.exports = productCtrl