import { connectToDatabase } from '../../../lib/db';

async function handler(req, res) {

  const doGet = async () => {
    try {
      const client = await connectToDatabase();
      const companiesCollection = client.db().collection('companies');
      const companies = await companiesCollection.find().toArray();
      client.close();

      res.status(200).json({ success: true, data: companies });

    } catch (error) {
      // console.log("ERROR: ", error);
      res.status(500).json({ success: false, error });

    }
  };

  switch (req.method) {
    case 'GET':
      doGet();
      break;

    default:
      res.status(405).json({ message: 'WRONG!' });
      return;
  }


}

export default handler;