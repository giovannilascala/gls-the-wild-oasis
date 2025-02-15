import styled from "styled-components";
import Spinner from "./Spinner";

const StyledSpinner = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-grey-0);
`;

function SpinnerFullPage() {
  return (
    <StyledSpinner>
      <Spinner />
    </StyledSpinner>
  );
}

export default SpinnerFullPage;
