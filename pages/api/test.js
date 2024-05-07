import { connectDB } from '@/util/database';

const handler = async (req, res) => {
  const client = await connectDB;
  let db = client.db('nextjs');
  let result = await db.collection('post').find().toArray();
  if (req.method == 'GET') {
    res.status(200).json(result);
  }
  if (req.method == 'POST') {
    res.status(200).json({ name: '바보' });
  }
};

export default handler;
