
import { Toaster } from "react-hot-toast";
import "./App.css";
import Header from "./components/Hedear/Header";
import LocationList from "./components/LocationList/LocationList";
import { Route, Routes } from "react-router-dom";
import AppLayout from "./components/AppLayout/AppLayout";
import Hotels from "./components/Hotels/Hotels";
import HotelsProvider from "./components/Context/HotelsProvider";
import SingleHotel from "./components/SingleHotel/SingleHotel";
import BookMarkLayout from "./components/BookMarkLayout/BookMarkLayout";
import BookMarkProvaider from "./components/Context/BookMarkListContext";
import BookMark from "./components/BookMark/BookMark";
import SingleBookMark from "./components/singelBookMark/SingleBookMark";
import AddNewBookMark from "./components/addNewBookMark/AddNewBookMark";
import Login from "./components/Login/Login";
import AuthContextProvider from "./components/Context/AuthProvider";
import ProtectedRoute from "./components/ProtectedRoute/protectedRoute";

function App() {
  return <AuthContextProvider>
    <BookMarkProvaider>
      <HotelsProvider>
        <Toaster />
        <Header />
        <Routes>
          <Route path="/" element={<LocationList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/hotels" element={<AppLayout />}>
            <Route index element={<Hotels />} />
            <Route path=":id" element={<SingleHotel />} />
          </Route>
          <Route path="/bookmarks" element={<ProtectedRoute>
            <BookMarkLayout />
          </ProtectedRoute>} >
            <Route index element={<BookMark />} />
            <Route path=":id" element={<SingleBookMark />} />
            <Route path="add" element={<AddNewBookMark />} />
          </Route>
        </Routes>
      </HotelsProvider>
    </BookMarkProvaider>
  </AuthContextProvider>

}

export default App;

