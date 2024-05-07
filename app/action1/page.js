import { action1 } from './action1';

const ClientComponent = () => {
  return (
    <form action={action1}>
      <button type='submit'>Add to Cart</button>
    </form>
  );
};

export default ClientComponent;
