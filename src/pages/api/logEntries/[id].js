import dbConnect from '../../../../utils/dbConnect';
import LogEntry from '../../../models/LogEntry';

dbConnect();

export default async (req, res) => {

  const {
    query: { id },
    method
  } = req;

  switch (method) {
    case 'GET':
      try {
        const logEntry = await LogEntry.findById(id);

        if (!logEntry) {
          return res.status(400).json({ success: false });
        }

        res.status(200).json({ success: true, data: logEntry });

      } catch (error) {
        res.status(400).json({ success: false, message: error });
      }
      break;

    case 'PUT':
      try {
        const logEntry = await LogEntry.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true
        });

        if (!logEntry) {
          return res.status(400).json({ success: false });
        }

        res.status(200).json({ success: true, data: logEntry });

      } catch (error) {
        res.status(400).json({ success: false, message: error });
      }
      break;

    case 'DELETE':
      try {
        const deletedLogEntry = await LogEntry.deleteOne({ _id: id });

        if (!deletedLogEntry) {
          return res.status(400).json({ success: false });
        }

        res.status(200).json({ success: true, data: deletedLogEntry });

      } catch (error) {
        res.status(400).json({ success: false, message: error });
      }
      break;

    default:
      res.status(405).json({ success: false, message: 'Method not allowed!' });
      break;
  }
}
