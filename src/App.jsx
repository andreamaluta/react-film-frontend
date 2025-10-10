import { BrowserRouter } from "react-router-dom"
import { Route } from "react-router-dom"
import { Routes } from "react-router-dom"
import HomePage from "./pages/HomePage"
import DefaultLayout from "./layout/DefaultLayout"
import DetailPage from "./pages/DetailPage"

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<DefaultLayout />}>
            <Route index element={<HomePage />}></Route>
            <Route path="/films/:id" element={<DetailPage />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}
