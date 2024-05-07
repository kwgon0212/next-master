import { connectDB } from '@/util/database';

const handler = async (req, res) => {
  const client = await connectDB;
  const db = client.db('nextjs');

  const result = await db
    .collection('user')
    .find({ id: req.body.id })
    .toArray();

  if (result.length == 0) {
    db.collection('user').insertOne({
      id: req.body.id,
      password: req.body.password,
    });
    res.redirect('/list');
  } else {
    res.setHeader('Content-Type', 'text/html; charset=UTF-8');
    res.send('<script>alert("이미존재하는아이디");</script>');
  }
};

export default handler;
