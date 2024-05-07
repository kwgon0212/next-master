import { connectDB } from '@/util/database';
import { ObjectId } from 'mongodb';

const handler = async (req, res) => {
  if (req.method == 'GET') {
    const db = (await connectDB).db('nextjs');

    let result = await db
      .collection('comment')
      .find({ postId: new ObjectId(req.query.postId) })
      .toArray();

    res.status(200).send(result);
  }
};

export default handler;
