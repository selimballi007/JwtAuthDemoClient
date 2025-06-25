import React from "react";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage/>}>
          {/*Diğer Sayfalar Yakında*/}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
