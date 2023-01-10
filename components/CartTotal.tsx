import { useQuery } from "urql";

function CartTotal() {
  const [result] = useQuery({
    query: `
    query CartTotal {
      cart {
        id
        total
      }
    }`,
    requestPolicy: "cache-and-network",
    pause: typeof window === "undefined",
  });

  return (
    <>
      <p>Total: ${result.data?.cart.total}</p>
    </>
  );
}

export default CartTotal;
