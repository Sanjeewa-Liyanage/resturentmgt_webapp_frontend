import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/header/header";
import HomePage from "./pages/homepage";
import AdminPage from "./pages-admin/admin";
import NotFound from "./components/NotFound";

function App() {
  return (
    <BrowserRouter>
        <Routes path ="/">
         <Route path="/" element={<HomePage/>} />
         <Route path="/admin/*" element={<AdminPage/>} />
         <Route path = "*" element={<NotFound />} />

        </Routes>
    
    </BrowserRouter>
  );
}

export default App;
