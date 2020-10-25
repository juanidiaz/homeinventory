import { dbConnect } from "../../../../utils/dbConnect";
import Condition from "../../../models/Condition";

dbConnect();

export default async (req, res) => {

  const {
    query: { id },
    method
  } = req;

  switch (method) {
    case "GET":
      try {
        const condition = await Condition.findById(id);

        if (!condition) {
          return res.status(400).json({ success: false });
        }

        res.status(200).json({ success: true, data: condition });

      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;

    case "PUT":
      try {
        const condition = await Condition.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true
        });

        if (!condition) {
          return res.status(400).json({ success: false });
        }

        res.status(200).json({ success: true, data: condition });

      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;

    case "DELETE":
      try {
        const deletedCondition = await Condition.deleteOne({ _id: id });

        if (!deletedCondition) {
          return res.status(400).json({ success: false });
        }

        res.status(200).json({ success: true, data: deletedCondition });

      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;

    default:
      res.status(405).json({ success: false, message: "Method not allowed!" });
      break;
  }
}
