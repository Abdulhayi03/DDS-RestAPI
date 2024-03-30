const multer = require("multer");
const multerS3 = require("multer-s3");
const AWS = require("aws-sdk");
const { v4: uuidv4 } = require('uuid'); // Import uuid library

const s3 = new AWS.S3({
  // Configure AWS credentials and region
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "dreamdesignstudiobucket",
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      // Generate a unique key using uuidv4()
      const photoKey = uuidv4();
      // Use the generated key in the file name
      cb(null, photoKey + '-' + file.originalname);
  }
  })
});

module.exports = upload;
