const Product = require("../models/product");

module.exports = class ProductsController {
    static getAllProductsStatic = async (req, res) => {
        const search = "aaa"

        // const product = await Product.find({}).sort({name: -1})
        // const product = await Product.find({}).sort('-name price')
        // const product = await Product.find({}).select('name price')
        const product = await Product.find({price: {$gt: 30}}).sort('price').select('name price')
        
        res.status(200).json({msg: product, nbHits: product.length})
        throw new Error('testing async errors')
    }

    static getAllProducts = async (req, res) => {
        const {featured, company, name, sort, fields, numericFilters} = req.query;
        const queryObject = {}

        //featured
        if(featured){
            queryObject.featured === "true"? true : false
        }

        //name
        if(name){
            queryObject.name = {$regex: name, $options: 'i'}
        }

        //numericFilters
        if(numericFilters){
            const operatorMap = {
                '>': "$gt",
                '>=': "$gte",
                '=': "$eq",
                '<': "$lt",
                '<=': "$lte",
            }
            const regEx = /\b(<|>|>=|<=|=)\b/g
            let filters = numericFilters.replace(
                regEx, 
                (match) => `-${operatorMap[match]}-`
            )
            const options = ['price', 'rating'];
            filters = filters.split(',').forEach(item => {
                const [field, operator, vslue] = item.split('-')
                if(options.includes(field)){
                    queryObject[field] = {[operator]: Number(value)}
                }
            });
            console.log(numericFilters);
        }

        //company
        if (company) {
            queryObject.company = company
        }        

        let result = Product.find(queryObject)

        //sort
        if (sort) {
            const sortList = sort.split(',').join(' ')
            result = result.sort(sortList)
            // products = products.sort()
        }else{
            result = result.sort(createAt)
        }

        //fields
        if (fields) {
            const fieldList = fields.split(',').join(' ')
            result = result.select(fieldList)
        }
        const page = Number(req.query.page) || 1
        const limit = Number(req.query.limit) || 10
        const skip = (page -1)*limit        

        result = result.skip(skip).limit(limit)
        const products = await result
        // console.log(queryObject)


        // const products = await Product.find(queryObject)
        res.status(200).json({products, nbHits: products.length})
    }
}