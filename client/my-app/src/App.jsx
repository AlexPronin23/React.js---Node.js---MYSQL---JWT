import Header from "./components/Header";
import FormSignIn from "./pages/FormSignIn";
import FormLogIn from "./pages/FormLogIn";

import { Routes, Route } from "react-router";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Header />} />
        <Route path="/register" element={<FormSignIn />} />
        <Route path="/login" element={<FormLogIn />} />
      </Routes>
    </>
  );
}

export default App;
