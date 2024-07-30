const category = require('../models/categoryModel');



const categoryCtrl = {

    getCategories: async (req, res) => {
        try {
            const categories = await category.find();
            res.json(categories);
        } catch (error) {
            return res.status(500).json({ msg: "category failed" });
        }
    },
    createCategory: async (req, res) => {
        try {
            const { name } = req.body;

            const categories = await category.findOne({ name });

            if (categories) return res.status(400).json({ msg: "category already exists" });


            const newcategory = new category({ name });
            await newcategory.save();
            res.json('category added')
        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },
    deleteCategory: async (req, res) => {
        try {
            await category.findByIdAndDelete(req.params.id)
            res.json({ msg: "deleted a category" })
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },
    updateCategory: async (req, res) => {

        try {
            const { name } = req.body;
            await category.findByIdAndUpdate({ _id: req.params.id }, { name });
            res.json({ msg: "updated" });
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    }
}


module.exports = categoryCtrl;