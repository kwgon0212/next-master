import { connectDB } from '@/util/database';
import { ObjectId } from 'mongodb';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';

const handler = async (req, res) => {
  if (req.method == 'DELETE') {
    let session = await getServerSession(req, res, authOptions);

    const client = await connectDB;
    const db = client.db('nextjs');

    let userPost = await db
      .collection('post')
      .findOne({ _id: new ObjectId(req.body) });

    if (userPost.author == session.user.email) {
      let result = await db
        .collection('post')
        .deleteOne({ _id: new ObjectId(req.body) });
      res.status(200).json('삭제완료');
    } else {
      res.status(500).json('현재유저와 작성자 불일치');
    }
  }
};

export default handler;
