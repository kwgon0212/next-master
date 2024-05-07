import { connectDB } from '@/util/database';
import { ObjectId } from 'mongodb';

export default async function Edit(props) {
  const client = await connectDB;
  const db = client.db('nextjs');
  let result = await db
    .collection('post')
    .findOne({ _id: new ObjectId(props.params.id.toString()) });

  return (
    <div className='p-20'>
      <h4>글 수정 페이지</h4>
      <form action='/api/post/edit' method='POST'>
        <input
          name='_id'
          defaultValue={props.params.id.toString()}
          style={{ display: 'none' }}
        ></input>
        <input name='title' defaultValue={result.title.toString()}></input>
        <input name='content' defaultValue={result.content.toString()}></input>
        <button type='submit'>수정하기</button>
      </form>
    </div>
  );
}
