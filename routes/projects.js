const rout = require( 'express')
const Project = require( '../models/Project.js')
const upload = require('../middlewares/upload.js')
const AWS = require('aws-sdk');

// Initialize AWS S3 client
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});

const router = rout.Router();

// Get the most recent project
router.get('/recent', async (req, res) => {
    try {
      const recentProject = await Project.findOne().sort({ createdAt: -1 }).exec();
      res.json(recentProject);
    } catch (error) {
      console.error('Error fetching recent project:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

// Count projects
router.get('/count', async (req, res) => {
    try {
        const projectCount = await Project.countDocuments();
        res.json({ count: projectCount });
    } catch (error) {
        console.error('Error fetching project count:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// CREATE PROJECT

router.post('/', upload.array('photos', 5), async (req, res) => {
    try {
        const photoMetadata = req.files.map(file => ({
            key: file.key,
            // Add other metadata fields as needed
        }));

        const newProjectData = {
            title: req.body.title,
            category: req.body.category,
            desc: req.body.desc,
            thumb: req.body.thumb,
            photos: photoMetadata,
            video: req.body.video,
            modLink: req.body.ModLink
        };

        const newProject = new Project(newProjectData);
        const savedProject = await newProject.save();

        res.status(201).json(savedProject);
    } catch (error) {
        console.error('Error creating project:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Export the router
module.exports = router;

// UPDATE PROJECT

router.put('/:id', async(req, res)=>{
    
    try {
        const project = await Project.findById(req.params.id);

        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        // Update project fields except photos
        const { photos, ...updatedFields } = req.body;
        const updatedProject = await Project.findByIdAndUpdate(req.params.id, updatedFields, { new: true });

        res.status(200).json(updatedProject);
    } catch (error) {
        console.error('Error updating project:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
})

// DELETE PROJECT

router.delete('/:id', async (req, res) => {
  try {
      const project = await Project.findById(req.params.id);

      if (!project) {
          return res.status(404).json({ message: 'Project not found' });
      }

      // Delete images from S3
      for (const photo of project.photos) {
          if (!photo.key) {
              console.error('Missing key for photo:', photo);
              continue; // Skip deletion if key is missing
          }

          const params = {
              Bucket: 'dreamdesignstudiobucket',
              Key: photo.key
          };

          await s3.deleteObject(params).promise();
      }

      // Delete project from database
      await project.deleteOne();

      res.status(200).json('Project and associated images have been deleted.');
  } catch (error) {
      console.error('Error deleting project:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
});


router.get('/:id', async(req, res)=>{
    try {
        const project = await Project.findById(req.params.id)
        res.status(200).json(project);

    } catch (err) {
        res.status(500).json(err);
    }
})

// GET ALL PROJECTS

router.get('/', async(req, res)=>{
    const catName = req.query.cat;
    try {
        let projects;
        if(catName){
            projects = await Project.find({category:{$in: [catName]}})
        }else{
            projects = await Project.find()
        }
        res.status(200).json(projects);

    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router