import AWS, { S3 } from 'aws-sdk';
import fs from 'fs';
import FileType from 'file-type';
import multiparty from 'multiparty';

export default async (req, res) => {

  const { method } = req;

  // configure the keys for accessing AWS
  AWS.config.update({
    accessKeyId: process.env.AWSAccessKeyId,
    secretAccessKey: process.env.AWSSecretKey,
  });

  // create S3 instance
  const s3 = new AWS.S3();

  // abstracts function to upload a file returning a promise
  // NOTE: if you are using TypeScript the typed function signature will be
  // const uploadFile = (buffer: S3.Body, name: string, type: { ext: string; mime: string })
  const uploadFile = (buffer, name, type) => {
    const params = {
      ACL: 'public-read',
      Body: buffer,
      Bucket: process.env.AWSfiles_BucketName,
      ContentType: type.mime,
      Key: `${name}.${type.ext}`,
    };
    return s3.upload(params).promise();
  };

  switch (method) {
    case "GET":
      try {
        res.status(200).json({ success: true, message: "test-upload - GET" });

      } catch (error) {
        res.status(400).json({ success: false, message: error.message });

      }
      break;

    case "POST":
      try {
        // res.status(201).json({ success: true, message: "test-upload - POST" });

        const form = new multiparty.Form();
        console.log("======= POST 0 =======!", req.files);

        form.parse(req, async (error, fields, files) => {
          // if (error) {
          //   console.log("======= POST 1 =======!", { error: error.stack })
          //   return res.status(500).json({ success: false, error });
          // };
          console.log("======= POST 2 =======!")
          try {
            console.log("======= POST 3 =======!")
            const path = files.file[0].path;
            const buffer = fs.readFileSync(path);
            const type = await FileType.fromBuffer(buffer);
            const fileName = `bucketFolder/${Date.now().toString()}`;
            const data = await uploadFile(buffer, fileName, type);
            return res.status(200).send(data);
          } catch (err) {
            console.log("======= POST 4 =======!", err)
            return res.status(500).send({ success: false, err });
          }
        });
        console.log("======= POST 5 =======!")

      } catch (error) {
        console.log("======= POST 6 =======!")
        res.status(400).json({ success: false, message: error.message });

      }
      break;

    default:
      res.status(405).json({ success: false, message: "test-upload - Method not allowed!" });

      break;
  }
}
