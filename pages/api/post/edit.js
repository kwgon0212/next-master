import { connectDB } from '@/util/database';
import { ObjectId } from 'mongodb';

const handler = async (req, res) => {
  if (req.method == 'POST') {
    if (req.body.title == '') {
      res.send(
        `<script>alert("제목 안 씀");window.location.href="/edit/${req.body.id}";</script>`
      );
    } else {
      const client = await connectDB;
      const db = client.db('nextjs');
      let result = await db
        .collection('post')
        .updateOne(
          { _id: new ObjectId(req.body._id) },
          { $set: { title: req.body.title, content: req.body.content } }
        );
      res.redirect('/list');
    }
  }
};

export default handler;
