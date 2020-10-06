import dbConnect from "../../../../utils/dbConnect";
import Contact from "../../../models/Contact";
import { hash } from "bcrypt";

dbConnect();

export default async (req, res) => {

  const {
    query: { id },
    method
  } = req;

  switch (method) {
    case "GET":
      try {
        const contact = await Contact.findById(id);

        if (!contact) {
          return res.status(404).json({ success: false });
        }

        res.status(200).json({ success: true, data: contact });

      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;

    case "PUT":
      try {
        const newUserInfo = { ...req.body };

        hash(req.body.password, 10, async function (err, hash) {
          newUserInfo.password = hash;
          await Contact.findByIdAndUpdate(id, newUserInfo, {
            new: true,
            runValidators: true
          }, function (err, model) {
            res.status(201).json({ success: true, data: model });
          });
        });


      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;

    case "DELETE":
      try {
        const deletedContact = await Contact.deleteOne({ _id: id });

        if (!deletedContact) {
          return res.status(400).json({ success: false });
        }

        res.status(200).json({ success: true, data: deletedContact });

      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;

    default:
      res.status(405).json({ success: false, message: "Method not allowed!" });
      break;
  }
}
