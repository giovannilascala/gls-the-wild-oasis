import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Checkbox from "../../ui/Checkbox";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "../bookings/useBooking";
import { useEffect, useState } from "react";
import Spinner from "../../ui/Spinner";
import { useCheckin } from "./useCheckin";
import { useSettings } from "../settings/useSettings";
import { formatCurrency } from "../../utils/helpers";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [confirmPaid, setConfirmPaid] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);

  const moveBack = useMoveBack();
  const { booking = {}, isFetching } = useBooking();
  const { settings = {}, isLoading: isLoadingSettings } = useSettings();

  const { checkin, isCheckingIn } = useCheckin();

  useEffect(() => {
    setConfirmPaid(booking?.isPaid ?? false);
    setAddBreakfast(booking?.hasBreakfast ?? false);
  }, [booking]);

  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;

  const breakfastPrice = settings.breakfastPrice * numNights * numGuests;
  const formatBreakfast = formatCurrency(breakfastPrice);
  const formatTotalPrice = formatCurrency(totalPrice);

  function handleCheckin() {
    if (!confirmPaid) return;

    let obj = {
      status: "checked-in",
      isPaid: true,
    };

    if (addBreakfast) {
      obj = {
        ...obj,
        hasBreakfast: true,
        extrasPrice: breakfastPrice,
        totalPrice: totalPrice + breakfastPrice,
      };

      checkin({ id: bookingId, obj });
    } else {
      checkin({ id: bookingId, obj });
    }
  }

  if (isFetching || isCheckingIn || isLoadingSettings) return <Spinner />;

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {!hasBreakfast && (
        <Box>
          <Checkbox
            value={addBreakfast}
            onChange={() => {
              setAddBreakfast((breakfast) => !breakfast);
              setConfirmPaid(false);
            }}
            id="breakfast"
            checked={addBreakfast}
          >
            Want to add breakfast for {formatCurrency(settings.breakfastPrice)}{" "}
            ?
          </Checkbox>
        </Box>
      )}

      <Box>
        <Checkbox
          value={confirmPaid}
          onChange={() => setConfirmPaid((confirm) => !confirm)}
          id="confirmPaid"
          checked={confirmPaid}
          disabled={confirmPaid || isCheckingIn}
        >
          I confirm that {guests.fullName} has paid the total amount of{" "}
          {!addBreakfast
            ? formatTotalPrice
            : formatCurrency(totalPrice + breakfastPrice)}{" "}
          {addBreakfast ? `(${formatTotalPrice} + ${formatBreakfast})` : ""}
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={!confirmPaid || isCheckingIn}>
          Check in booking #{bookingId}
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
