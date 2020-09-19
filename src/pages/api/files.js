import dbConnect from '../../../utils/dbConnect';
// import upload from '../../../utils/fileUpload'
const aws = require("aws-sdk");
const Busboy = require('busboy');

dbConnect();

export default async (req, res) => {

  const { method } = req;

  switch (method) {

    case 'POST':
      try {

        aws.config.update({
          accessKeyId: process.env.AWSAccessKeyId,
          secretAccessKey: process.env.AWSSecretKey
        });

        const s3 = new aws.S3();
        let theFilename = "";

        // app.post("/upload", (req, res) => {
        let chunks = [], fname, ftype, fEncoding;
        let busboy = new Busboy({ headers: req.headers });
        busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
          console.log('File [' + fieldname + ']: filename: ' + filename + ', encoding: ' + encoding + ', mimetype: ' + mimetype);
          fname = filename.replace(/ /g, "_");
          theFilename = filename
          ftype = mimetype;
          fEncoding = encoding;
          file.on('data', function (data) {
            // you will get chunks here will pull all chunk to an array and later concat it.
            console.log(chunks.length);
            chunks.push(data)
          });
          file.on('end', function () {
            console.log('File [' + filename + '] Finished');
          });
        });

        console.log("=============== INFO\n", {
          fname,
          accessKeyId: process.env.AWSAccessKeyId,
          secretAccessKey: process.env.AWSSecretKey,
          bucket: process.env.AWSfilesBucket
        })

        busboy.on('finish', function () {
          // const userId = UUID();
          const params = {
            Bucket: process.env.AWSfilesBucket, // your s3 bucket name
            Key: `${process.env.AWSAccessKeyId}-${process.env.AWSSecretKey}`,
            Body: Buffer.concat(chunks), // concatinating all chunks
            ACL: 'public-read',
            // ContentEncoding: fEncoding, // optional
            ContentType: ftype // required
          }
          // we are sending buffer data to s3.
          s3.upload(params, (err, s3res) => {
            if (err) {
              if (err.statusCode) {
                res.status(err.statusCode).json({ success: false, err })
              } else {
                res.status(400).send({ err, status: 'error' });
              }
            } else {
              res.send({ data: s3res, status: 'success', msg: 'Image successfully uploaded.' });
            }
          });

        });
        req.pipe(busboy);
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
