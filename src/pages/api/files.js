import dbConnect from '../../../utils/dbConnect';
// import upload from '../../../utils/fileUpload'
import AWS from "aws-sdk";
import Busboy from 'busboy';
import uuid from 'node-uuid';
const multer = require('multer');
const multerS3 = require('multer-s3');

dbConnect();

export default async (req, res) => {

  const { method } = req;

  // const s3 = new AWS.S3({
  //   accessKeyId: process.env.AWSAccessKeyId,
  //   secretAccessKey: process.env.AWSSecretKey,
  //   Bucket: process.env.AWSBucketName_files
  // });

  // const params = {
  //   Bucket: process.env.AWSBucketName_files,
  //   Key: '../../../public/files/old_mediaroom_banner_tab.png'
  // };

  // This function for upload file to s3 bucket
  const s3upload = function (params) {
    return new Promise((resolve, reject) => {
      s3.createBucket({
        Bucket: process.env.AWSBucketName_files
      }, function () {
        s3.putObject(params, function (err, data) {
          if (err) {
            console.log("ERROR!", err);
            reject(err)
          } else {
            console.log("Successfully uploaded data to bucket");
            // console.log(data);
            resolve(data);
            res.status(200).json({ success: true, message: "Successfully uploaded data to bucket" });

          }
        });
      });
    });
  }

  switch (method) {

    case 'GET':
      try {
        console.log("DOWNLOADING FILE")
        res.status(200).json({ success: true, message: "DOWNLOADING FILE" });


      } catch (error) {
        res.status(400).json({ success: false, message: error.message });

      }
      break;

    case 'POST':
      try {

        // console.log("UPLOADING FILE")
        // s3upload(params);
        // res.status(200).json({ success: true, message: "UPLOADING FILE" });

        AWS.config.update({
          accessKeyId: process.env.AWSAccessKeyId,
          secretAccessKey: process.env.AWSSecretKey,
          region: 'ca-central-1'
        });

        const s3 = new AWS.S3();

        const fileFilter = (req, file, cb) => {
          if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            cb(null, true);
          } else {
            cb(new Error('Invalid file type, only JPEG and PNG is allowed!'), false);
          }
        }

        const upload = multer({
          fileFilter,
          storage: multerS3({
            acl: 'public-read',
            s3,
            bucket: 'bwm-ng-dev',
            metadata: function (req, file, cb) {
              cb(null, { fieldName: 'TESTING_METADATA' });
            },
            key: function (req, file, cb) {
              cb(null, Date.now().toString())
            }
          })
        });

        const singleUpload = upload.single('image');

        singleUpload(req, res, function (err) {
          if (err) {
            return res.status(422).send({ errors: [{ title: 'Image Upload Error', detail: err.message }] });
          }

          return res.json({ 'imageUrl': req.file.location });
        });


        // const s3 = new AWS.S3();

        // // app.post("/upload", (req, res) => {
        // let chunks = [], fname, ftype, fEncoding;
        // let busboy = new Busboy({ headers: req.headers });
        // busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
        //   console.log('File [' + fieldname + ']: filename: ' + filename + ', encoding: ' + encoding + ', mimetype: ' + mimetype);
        //   fname = filename.replace(/ /g, "_");
        //   ftype = mimetype;
        //   fEncoding = encoding;
        //   file.on('data', function (data) {
        //     // you will get chunks here will pull all chunk to an array and later concat it.
        //     console.log(chunks.length);
        //     chunks.push(data)
        //   });
        //   file.on('end', function () {
        //     console.log('File [' + filename + '] Finished');
        //   });
        // });

        // busboy.on('finish', function () {
        //   const userId = uuid.v4();
        //   const params = {
        //     Bucket: process.env.AWSBucketName_files, // your s3 bucket name
        //     Key: `${userId}-${fname}`,
        //     Body: Buffer.concat(chunks), // concatinating all chunks
        //     ACL: 'public-read',
        //     ContentEncoding: fEncoding, // optional
        //     ContentType: ftype // required
        //   }
        //   // we are sending buffer data to s3.
        //   s3.upload(params, (err, s3res) => {
        //     if (err) {
        //       if (err.statusCode) {
        //         res.status(err.statusCode).json({ success: false, err })
        //       } else {
        //         res.status(400).send({ err, status: 'error' });
        //       }
        //     } else {
        //       res.send({ data: s3res, status: 'success', msg: 'Image successfully uploaded.' });
        //     }
        //   });

        // });
        // req.pipe(busboy);
        // });

      } catch (error) {
        res.status(400).json({ success: false, message: error.message });

      }
      break;

    default:
      res.status(405).json({ success: false, message: 'Method not allowed!' });

      break;
  }
}
