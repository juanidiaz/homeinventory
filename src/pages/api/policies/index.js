import { dbConnect } from "../../../../utils/dbConnect";
import Policy from "../../../models/Policy";

dbConnect();

export default async (req, res) => {

  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const policies = await Policy.find({});
        res.status(200).json({ success: true, data: policies });

      } catch (error) {
        res.status(400).json({ success: false, message: error.message });

      }
      break;

    case "POST":
      try {
        const policy = await Policy.create(req.body);
        res.status(201).json({ success: true, data: policy });

      } catch (error) {
        res.status(400).json({ success: false, message: error.message });

      }
      break;

    default:
      res.status(405).json({ success: false, message: "Method not allowed!" });

      break;
  }
}
