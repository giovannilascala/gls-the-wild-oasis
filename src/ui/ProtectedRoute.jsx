import styled from "styled-components";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-500);
  display: flex;
  justify-content: center;
  align-items: center;
`;

function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  // Load the authenticated user
  const { isLoading, isAuthenticated } = useUser();

  // 3. If the is NO authenticated user, redirect to /login
  useEffect(() => {
    if (!isAuthenticated && !isLoading) navigate("/login");
  }, [isAuthenticated, isLoading, navigate]);

  // Spinner when loading
  if (isLoading)
    return (
      <FullPage>
        <Spinner />;
      </FullPage>
    );

  // if the is authenticated user redirect to /dashboard
  if (isAuthenticated) return children;
}

export default ProtectedRoute;
