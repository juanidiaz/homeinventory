import dbConnect from "../../../../utils/dbConnect";
import Policy from "../../../models/Policy";

dbConnect();

export default async (req, res) => {

  const {
    query: { id },
    method
  } = req;

  switch (method) {
    case "GET":
      try {
        const policy = await Policy.findById(id);

        if (!policy) {
          return res.status(400).json({ success: false });
        }

        res.status(200).json({ success: true, data: policy });

      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;

    case "PUT":
      try {
        const policy = await Policy.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true
        });

        if (!policy) {
          return res.status(400).json({ success: false });
        }

        res.status(200).json({ success: true, data: policy });

      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;

    case "DELETE":
      try {
        const deletedPolicy = await Policy.deleteOne({ _id: id });

        if (!deletedPolicy) {
          return res.status(400).json({ success: false });
        }

        res.status(200).json({ success: true, data: deletedPolicy });

      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;

    default:
      res.status(405).json({ success: false, message: "Method not allowed!" });
      break;
  }
}
