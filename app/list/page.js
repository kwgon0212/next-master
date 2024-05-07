import { connectDB } from '@/util/database';
import ListItem from './ListItem';

export const dynamic = 'force-dynamic';

export default async function List() {
  const client = await connectDB;
  let db = client.db('nextjs');
  let result = await db.collection('post').find().toArray();

  result = result.map((element) => {
    element._id = element._id.toString();
    return element;
  });

  return (
    <div className='list-bg'>
      <ListItem result={result} />
    </div>
  );
}
