import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreateCabinForm from "./CreateCabinForm";

function AddCabin() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="cabin-form">
          <Button>Add new cabin</Button>
        </Modal.Open>

        <Modal.Window name="cabin-form">
          <CreateCabinForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default AddCabin;

// import CabinTable from "./CabinTable";
// function AddCabin() {
//   const [isOpenModal, setIsOpenModal] = useState(false);

//   const onClose = () => setIsOpenModal(false);

//   return (
//     <div>
//       <Button onClick={() => setIsOpenModal((isOpenModal) => !isOpenModal)}>
//         Add new cabin
//       </Button>
//       {/* {isOpenModal && <CreateCabinForm setIsOpenModal={setIsOpenModal} />} */}
//       {isOpenModal && (
//         <Modal onClose={onClose}>
//           <CreateCabinForm onCloseModal={onClose} />
//         </Modal>
//       )}
//     </div>
//   );
// }
