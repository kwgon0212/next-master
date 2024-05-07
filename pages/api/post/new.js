import { connectDB } from '@/util/database';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';

const handler = async (req, res) => {
  let session = await getServerSession(req, res, authOptions);

  let data = {
    title: req.body.title,
    content: req.body.content,
  };
  if (session) {
    data.author = session.user.email;
  }
  if (req.method == 'POST') {
    if (req.body.title == '') {
      res.send(
        '<script>alert("제목 안 씀");window.location.href="/write";</script>'
      );
    } else {
      const client = await connectDB;
      const db = client.db('nextjs');
      let result = db.collection('post').insertOne(data);
      res.redirect('/list');
    }
  }
};

export default handler;
