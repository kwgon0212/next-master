import { connectDB } from '@/util/database';
import { ObjectId } from 'mongodb';
import Comment from './Comment';

export default async function Detail(props) {
  let db = (await connectDB).db('nextjs');
  let result = await db
    .collection('post')
    .findOne({ _id: new ObjectId(props.params.id) });
  return (
    <div>
      <h4>상세페이지임</h4>
      <h4>{result.title}</h4>
      <p>{result.content}</p>
      <hr />
      <Comment postId={props.params.id} />
    </div>
  );
}
