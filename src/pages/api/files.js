import { dbConnect } from "../../../utils/dbConnect";
// import upload from "../../../utils/fileUpload"
import AWS from "aws-sdk";
import Busboy from "busboy";
import uuid from "node-uuid";
const multer = require("multer");
const multerS3 = require("multer-s3");
const fs = require("fs");

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
  //   Key: "../../../public/files/old_mediaroom_banner_tab.png"
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

    case "GET":
      try {
        console.log("DOWNLOADING FILE")
        res.status(200).json({ success: true, message: "DOWNLOADING FILE" });


      } catch (error) {
        res.status(400).json({ success: false, message: error.message });

      }
      break;

    case "POST":
      try {


        const s3 = new AWS.S3();
        console.log("UPLOADING FILE")
        const bodyArray = req.body.split(/\r\n/)
        const fileName = bodyArray[1].split("; ")[2].split("=")[1].slice(1, -1);
        const fType = bodyArray[2].split("=")[1]

        console.log("=== FILENAME\n", fileName)
        const fileContent = fs.readFileSync("/home/jdiaz/Downloads/" + fileName);

        s3.createBucket({ Bucket: process.env.AWSfiles_BucketName, region: process.env.AWSfiles_BucketRegion }, function () {
          var params = {
            Bucket: process.env.AWSfiles_BucketName,
            Key: fileName,
            Body: fileContent,
            // Body: req.body.split(/\r\n/)[4],
            ACL: "public-read",
            ContentType: fType
          };
          s3.putObject(params, function (err, data) {
            if (err) {
              console.log(err);
              res.status(403).json({ success: false, message: error.message });
            } else {
              console.log("Successfully uploaded data to " + process.env.AWSfiles_BucketName + "/" + fileName);
              res.status(200).json({ data, fileName, bodyArray, body: req.body });
            }
          });
        });

        //! = START ======================================================================== 
        // app.post("/upload", (req, res) => {
        // let chunks = [], fname, ftype, fEncoding;
        //   console.log("SHIT!", req.body);
        // let busboy = new Busboy({ headers: req.headers });
        // busboy.on("file", function (fieldname, file, filename, encoding, mimetype) {
        //   console.log("File [" + fieldname + "]: filename: " + filename + ", encoding: " + encoding + ", mimetype: " + mimetype);
        //   file.on("data", function (data) {
        //     console.log("File [" + fieldname + "] got " + data.length + " bytes");
        //   });
        //   file.on("end", function () {
        //     console.log("File [" + fieldname + "] Finished");
        //   });
        // });
        
        //   busboy.on("file", function (fieldname, file, filename, encoding, mimetype) {
        //     console.log("File [" + fieldname + "]: filename: " + filename + ", encoding: " + encoding + ", mimetype: " + mimetype);
        //     fname = filename.replace(/ /g, "_");
        //     ftype = mimetype;
        //     fEncoding = encoding;
        //     file.on("data", function (data) {
        //       // you will get chunks here will pull all chunk to an array and later concat it.
        //       console.log(chunks.length);
        //       chunks.push(data)
        //     });
        //     file.on("end", function () {
        //       console.log("File [" + filename + "] Finished");
        //     });
        //   });

        //   busboy.on("finish", function () {
        //     const userId = uuid.v4();
        //     const params = {
        //       Bucket: process.env.AWSBucketName_files, // your s3 bucket name
        //       Key: `${userId}-${fname}`,
        //       Body: Buffer.concat(chunks), // concatinating all chunks
        //       ACL: "public-read",
        //       ContentEncoding: fEncoding, // optional
        //       ContentType: ftype // required
        //     }
        //     // we are sending buffer data to s3.
        //     s3.upload(params, (err, s3res) => {
        //       if (err) {
        //         if (err.statusCode) {
        //           res.status(err.statusCode).json({ success: false, err })
        //         } else {
        //           res.status(400).send({ err, status: "error" });
        //         }
        //       } else {
        //         res.send({ data: s3res, status: "success", msg: "Image successfully uploaded." });
        //       }
        //     });

        //   });
        //   req.pipe(busboy);
        // // });
        //! = END ======================================================================== 

      } catch (error) {
        console.log("ERROR!\n", error)
        res.status(401).json({ success: false, message: error.message });

      }
      break;

    default:
      res.status(405).json({ success: false, message: "Method not allowed!" });

      break;
  }
}
