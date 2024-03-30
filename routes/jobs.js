const rout = require( 'express')
const Job = require( '../models/Job.js')

const router = rout.Router() 


// Count jobs
router.get('/count', async (req, res) => {
    try {
        const jobCount = await Job.countDocuments();
        res.json({ count: jobCount });
    } catch (error) {
        console.error('Error fetching project count:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Create job

router.post('/', async(req, res)=>{
    const newJob = new Job(req.body)
    try {
        const savedJob = await newJob.save()
        res.status(200).json(savedJob)
    } catch (err) {
        res.status(500).json(err)
    }
})

// GET job
router.get('/:id', async(req, res)=>{
    try {
        const job = await Job.findById(req.params.id)
        res.status(200).json(job);

    } catch (err) {
        res.status(500).json(err);
    }
})

// UPDATE job

router.put('/:id', async(req, res)=>{
    
        const job = await Job.findById(req.params.id)
            try {
                const updatedJob = await Job.findByIdAndUpdate(req.params.id, {
                    $set: req.body
                },{new:true})
                res.status(200).json(updatedJob)
            } catch (err) {
                res.status(500).json(err)
            }
   
})
 

// DELETE job

router.delete('/:id', async(req, res)=>{
    
        const job = await Job.findById(req.params.id)

            try {
                await job.deleteOne();
                res.status(200).json('Job has been deleted.')
            } catch (err) {
                res.status(500).json(err)
            }
      
   
})


// GET jobs

router.get('/', async(req, res)=>{
    try {
        const jobs = await Job.find()
        res.status(200).json(jobs)
    } catch (err) {
        res.status(500).json(err)
    }
})


module.exports = router