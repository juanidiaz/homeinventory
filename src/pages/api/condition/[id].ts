import { NextApiRequest, NextApiResponse } from "next"

export default function conditionById(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      res.status(200).json({ message: "GET", method: req.method, id: req.query.id })
      break;

    case 'POST':
      res.status(200).json({ message: "POST", method: req.method, id: req.query.id })
      break;

    case 'DELETE':
      res.status(200).json({ message: "DELETE", method: req.method, id: req.query.id })
      break;

    default:
      res.status(201).json({ message: "ANY", method: req.method, id: req.query.id })
      break;
  }
}
