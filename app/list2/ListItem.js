'use client';

import Link from 'next/link';

const ListItem = ({ result }) => {
  return (
    <>
      {result.map((element, idx) => {
        return (
          <div className='list-item' key={idx}>
            <Link href={`/detail/${element._id}`}>
              <h4>{element.title}</h4>
            </Link>
            <Link href={`/edit/${element._id}`}>✏️</Link>
            <span
              style={{ cursor: 'pointer', margin: '0 10px' }}
              onClick={(e) => {
                fetch('/api/post/delete', {
                  method: 'DELETE',
                  body: element._id,
                })
                  .then((result) => {
                    return result.json();
                  })
                  .then((result) => {
                    e.target.parentElement.style.opacity = 0;
                    setTimeout(() => {
                      e.target.parentElement.style.display = 'none';
                    }, 1000);
                  });
              }}
            >
              🗑️
            </span>
            <p>{element.content}</p>
          </div>
        );
      })}
    </>
  );
};

export default ListItem;
