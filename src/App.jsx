import GlobalStyles from "./styles/GlobalStyles";
import { lazy, Suspense } from "react";

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import AppLayout from "./ui/AppLayout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./ui/ProtectedRoute";
import DarkModeProvider from "./context/DarkModeContext";
import SpinnerFullPage from "./ui/SpinnerFullPage";
import { createPortal } from "react-dom";

const Dashboard = lazy(() => import("./pages/Dashboard"));
const Users = lazy(() => import("./pages/Users"));
const Bookings = lazy(() => import("./pages/Bookings"));
const Cabins = lazy(() => import("./pages/Cabins"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));
const Account = lazy(() => import("./pages/Account"));
const Login = lazy(() => import("./pages/Login"));
const Settings = lazy(() => import("./pages/Settings"));
const Booking = lazy(() => import("./pages/Booking"));
const CheckIn = lazy(() => import("./pages/CheckIn"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <DarkModeProvider>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />

        <GlobalStyles />
        <BrowserRouter>
          <Suspense fallback={createPortal(<SpinnerFullPage />, document.body)}>
            <Routes>
              <Route
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Navigate replace to="dashboard" />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/bookings" element={<Bookings />} />
                <Route path="/bookings/:bookingId" element={<Booking />} />
                <Route path="/checkin/:bookingId" element={<CheckIn />} />
                <Route path="/cabins" element={<Cabins />} />
                <Route path="/users" element={<Users />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/account" element={<Account />} />
              </Route>

              <Route path="/login" element={<Login />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>

        <Toaster
          position="top-center"
          gutter={12}
          containerStyle={{ margin: "8px" }}
          toastOptions={{
            success: {
              duration: 3000,
            },
            error: {
              duration: 5000,
            },
            style: {
              fontSize: "16px",
              maxWidth: "500px",
              padding: "16px 24px",
              backgroundColor: "var(--color-grey-0)",
              color: "var(--color-grey-700)",
            },
          }}
        />
      </QueryClientProvider>
    </DarkModeProvider>
  );
}

export default App;

// const StyledApp = styled.div`
//   padding: 20px;
// `;

// function App() {
//   return (
//     <>
//       <GlobalStyles />
//       <StyledApp>
//         <Row type="vertical">
//           <Row type="horizontal">
//             <Heading as="h1">The Wild Oasis</Heading>

//             <div>
//               <Heading as="h2">Check in and check out</Heading>
//               <Button
//                 variation="primary"
//                 size="medium"
//                 onClick={() => alert("Checked in")}
//               >
//                 Check in
//               </Button>
//               <Button
//                 variation="secondary"
//                 size="small"
//                 onClick={() => alert("Checked out")}
//               >
//                 Check out
//               </Button>
//             </div>
//           </Row>

//           <Row type="vertical">
//             <Heading as="h3">Form</Heading>
//             <form>
//               <Input type="number" placeholder="Number of gueste" />
//               <Input type="number" placeholder="Number of gueste" />
//             </form>
//           </Row>
//         </Row>
//       </StyledApp>
//     </>
//   );
// }
