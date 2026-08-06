import Header from "./components/Header";
import FormSignIn from "./pages/FormSignIn";
import FormLogIn from "./pages/FormLogIn";
import Users from "./pages/Users";
import User from "./pages/User";
import Profile from "./pages/Profile";
import ProtectedRoute from "./pages/ProtectedRoute";
import { Routes, Route } from "react-router";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Header />} />
        <Route path="/register" element={<FormSignIn />} />
        <Route path="/login" element={<FormLogIn />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<User />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
