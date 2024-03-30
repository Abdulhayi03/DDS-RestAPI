const rout = require( 'express')
const Category = require( '../models/Category.js')

const router = rout.Router() 


// Count projects
router.get('/count', async (req, res) => {
    try {
        const categoryCount = await Category.countDocuments();
        res.json({ count: categoryCount });
    } catch (error) {
        console.error('Error fetching project count:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Create Category

router.post('/', async(req, res)=>{
    const newCat = new Category(req.body)
    try {
        const savedCat = await newCat.save()
        res.status(200).json(savedCat)
    } catch (err) {
        res.status(500).json(err)
    }
})

// GET CATEGORY
router.get('/:id', async(req, res)=>{
    try {
        const category = await Category.findById(req.params.id)
        res.status(200).json(category);

    } catch (err) {
        res.status(500).json(err);
    }
})

// UPDATE POST

router.put('/:id', async(req, res)=>{
    
        const category = await Category.findById(req.params.id)
            try {
                const updatedCategory = await Category.findByIdAndUpdate(req.params.id, {
                    $set: req.body
                },{new:true})
                res.status(200).json(updatedCategory)
            } catch (err) {
                res.status(500).json(err)
            }
   
})
 

// DELETE POST

router.delete('/:id', async(req, res)=>{
    
        const category = await Category.findById(req.params.id)

            try {
                await category.deleteOne();
                res.status(200).json('Category has been deleted.')
            } catch (err) {
                res.status(500).json(err)
            }
      
   
})


// GET Categories

router.get('/', async(req, res)=>{
    try {
        const cats = await Category.find()
        res.status(200).json(cats)
    } catch (err) {
        res.status(500).json(err)
    }
})


module.exports = router