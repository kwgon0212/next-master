import { connectDB } from '@/util/database';
import bcrypt from 'bcrypt';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    if (
      req.body.name === '' ||
      req.body.email === '' ||
      req.body.password === ''
    ) {
      res.status(500).json('빈칸을 채워주세요');
    } else {
      console.log(req.body);
      const hash = await bcrypt.hash(req.body.password, 10);
      req.body.password = hash;

      let db = (await connectDB).db('nextjs');
      await db.collection('user_cred').insertOne(req.body);
      res.status(200).json('성공');
    }
  }
}
