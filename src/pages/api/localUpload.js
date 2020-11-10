export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case "POST":
      try {

        console.log(">>>>>>>>uploadFiles")

        if (!req.files) {
          res.send({
            status: false,
            message: "No files"
          })
        } else {
          const { picture } = req.files

          picture.mv("./uploads/" + picture.name)

          res.send({
            status: true,
            message: "File is uploaded"
          })
        }

      } catch (error) {
        res.status(400).json({ success: false, message: error.message });

      }
      break;

    default:
      res.status(405).json({ success: false, message: "Method not allowed!" });

      break;
  }
}
