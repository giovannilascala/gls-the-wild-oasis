import Button from "../../ui/Button";
import { useCheckout } from "./useCheckout";

function CheckoutButton({ bookingId }) {
  const { checkout } = useCheckout();

  function handleClick() {
    const obj = {
      status: "checked-out",
    };

    checkout({ id: bookingId, obj });
  }

  return (
    <Button variation="primary" size="small" onClick={handleClick}>
      Check out
    </Button>
  );
}

export default CheckoutButton;
