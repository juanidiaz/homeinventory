import { connectToDatabase } from '../../../lib/db';

async function handler(req, res) {

  const doGet = async () => {
    try {
      const client = await connectToDatabase();
      const contractsCollection = client.db().collection('contracts');
      const contracts = await contractsCollection.find().toArray();
      client.close();

      res.status(200).json({ success: true, data: contracts });

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
