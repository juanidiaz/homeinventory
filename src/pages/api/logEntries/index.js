import dbConnect from '../../../../utils/dbConnect';
import LogEntry from '../../../models/LogEntry';

dbConnect();

export default async (req, res) => {

  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const logEntries = await LogEntry.find({});
        res.status(200).json({ success: true, data: logEntries });

      } catch (error) {
        res.status(400).json({ success: false, message: error });

      }
      break;

    case 'POST':
      try {
        const logEntry = await LogEntry.create(req.body);
        res.status(201).json({ success: true, data: logEntry });

      } catch (error) {
        res.status(400).json({ success: false, message: error });

      }
      break;

    default:
      res.status(405).json({ success: false, message: 'Method not allowed!' });

      break;
  }
}
