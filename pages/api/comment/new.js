import { connectDB } from '@/util/database';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import { ObjectId } from 'mongodb';

const handler = async (req, res) => {
  if (req.method == 'POST') {
    let session = await getServerSession(req, res, authOptions);
    req.body = JSON.parse(req.body);
    if (session) {
      const client = await connectDB;
      const db = client.db('nextjs');

      let data = {
        comment: req.body.comment,
        postId: new ObjectId(req.body.postId),
        author: session.user.email,
      };

      let result = await db.collection('comment').insertOne(data);
      res.status(200).send('댓글 등록 완료');
    } else {
      res.status(500).send('로그인 하세요');
    }
  }
};

export default handler;
