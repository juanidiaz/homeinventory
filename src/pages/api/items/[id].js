import { dbConnect } from "../../../../utils/dbConnect";
import Item from "../../../models/Item";
import Room from "../../../models/Room";
import Location from "../../../models/Location";
import Category from "../../../models/Category";
import Contract from "../../../models/Contract";
import Company from "../../../models/Company";

dbConnect();

export default async (req, res) => {

  const {
    query: { id },
    method
  } = req;

  switch (method) {
    case "GET":
      try {
        const item = await Item.findById(id)
          .populate("room")
          .populate("location")
          .populate("category")
          .populate("condition")
          .populate("purchaseInfo.company")
          .populate("purchaseInfo.contract")
          ;

        if (!item) {
          return res.status(400).json({ success: false });
        }

        res.status(200).json({ success: true, data: item });

      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;

    case "PUT":
      try {
        const item = await Item.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true
        });

        if (!item) {
          return res.status(400).json({ success: false });
        }

        res.status(200).json({ success: true, data: item });

      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;

    case "DELETE":
      try {
        const deletedItem = await Item.deleteOne({ _id: id });

        if (!deletedItem) {
          return res.status(400).json({ success: false });
        }

        res.status(200).json({ success: true, data: deletedItem });

      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;

    default:
      res.status(405).json({ success: false, message: "Method not allowed!" });
      break;
  }
}
