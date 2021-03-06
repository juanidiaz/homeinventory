import { dbConnect } from "../../../../utils/dbConnect";
import Room from "../../../models/Room";

dbConnect();

export default async (req, res) => {

  const {
    query: { id },
    method
  } = req;

  switch (method) {
    case "GET":
      try {
        const room = await Room.findById(id);

        if (!room) {
          return res.status(400).json({ success: false });
        }

        res.status(200).json({ success: true, data: room });

      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;

    case "PUT":
      try {
        const room = await Room.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true
        });

        if (!room) {
          return res.status(400).json({ success: false });
        }

        res.status(200).json({ success: true, data: room });

      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;

    case "DELETE":
      try {
        const deletedRoom = await Room.deleteOne({ _id: id });

        if (!deletedRoom) {
          return res.status(400).json({ success: false });
        }

        res.status(200).json({ success: true, data: deletedRoom });

      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;

    default:
      res.status(405).json({ success: false, message: "Method not allowed!" });
      break;
  }
}
