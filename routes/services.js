const rout = require( 'express')
const Service = require( '../models/Service.js')

const router = rout.Router() 


// Count services
router.get('/count', async (req, res) => {
    try {
        const serviceCount = await Service.countDocuments();
        res.json({ count: serviceCount });
    } catch (error) {
        console.error('Error fetching project count:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Create Category

router.post('/', async(req, res)=>{
    const newService = new Service(req.body)
    try {
        const savedService= await newService.save()
        res.status(200).json(savedService)
    } catch (err) {
        res.status(500).json(err)
    }
})

// GET CATEGORY
router.get('/:id', async(req, res)=>{
    try {
        const service = await Service.findById(req.params.id)
        res.status(200).json(service);

    } catch (err) {
        res.status(500).json(err);
    }
})

// UPDATE POST

router.put('/:id', async(req, res)=>{
    
        const service = await Service.findById(req.params.id)
            try {
                const updatedService = await Service.findByIdAndUpdate(req.params.id, {
                    $set: req.body
                },{new:true})
                res.status(200).json(updatedService)
            } catch (err) {
                res.status(500).json(err)
            }
   
})
 

// DELETE POST

router.delete('/:id', async(req, res)=>{
    
        const service = await Service.findById(req.params.id)

            try {
                await service.deleteOne();
                res.status(200).json('Service has been deleted.')
            } catch (err) {
                res.status(500).json(err)
            }
      
   
})


// GET Categories

router.get('/', async(req, res)=>{
    try {
        const cats = await Service.find()
        res.status(200).json(cats)
    } catch (err) {
        res.status(500).json(err)
    }
})


module.exports = router