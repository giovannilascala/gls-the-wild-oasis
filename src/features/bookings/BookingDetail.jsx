import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";

import { useBooking } from "./useBooking";
import Spinner from "../../ui/Spinner";
import { useNavigate } from "react-router-dom";
import { useCheckout } from "../check-in-out/useCheckout";
import { useDeleteBooking } from "./useDeleteBooking";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Empty from "../../ui/Empty";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const navigate = useNavigate();
  const moveBack = useMoveBack();

  const { booking = {}, isFetching } = useBooking();
  const { isCheckingOut, checkout } = useCheckout();
  const { isDeleting, deleteBooking } = useDeleteBooking();

  if (isFetching || isCheckingOut || isDeleting) return <Spinner />;
  if (!booking) <Empty resourceName="booking" />;

  const obj = {
    status: "checked-out",
  };

  const { status, id } = booking;

  function toBookings() {
    navigate("/bookings");
  }

  function handleDelete() {
    deleteBooking(id, {
      onSuccess: toBookings,
    });
  }

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking {id}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        {status === "unconfirmed" && (
          <Button onClick={() => navigate(`/checkin/${id}`)}>Check In</Button>
        )}

        {status === "checked-in" && (
          <Button
            onClick={() => checkout({ id, obj }, { onSuccess: toBookings })}
          >
            Check Out
          </Button>
        )}

        <Modal>
          <Modal.Open opens="delete-booking">
            <Button variation="danger">Delete Booking</Button>
          </Modal.Open>

          <Modal.Window name="delete-booking">
            <ConfirmDelete
              resourceName="booking"
              disabled={isDeleting}
              onConfirm={handleDelete}
            />
          </Modal.Window>
        </Modal>

        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
