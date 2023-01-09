import { useQuery } from "urql";

function CartTotal() {
  const [result] = useQuery({
    query: `
    {
      cart {
        id
        total
      }
    }`,
    requestPolicy: "cache-and-network",
  });

  return (
    <>
      <p>Total: ${result.data?.cart.total}</p>
    </>
  );
}

export default CartTotal;
