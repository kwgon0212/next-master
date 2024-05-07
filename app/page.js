import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { connectDB } from '@/util/database';
import { getServerSession } from 'next-auth';

export default async function Home() {
  const client = await connectDB;
  const db = client.db('nextjs');
  let result = await db.collection('post').find().toArray();

  // await fetch('/url',{cache:'force-cache'})

  return (
    <>
      <span>{result[0].title}</span>
    </>
  );
}
