import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DetailRestaurantPage from "./pages/detail-restaurant";
import RestaurantPage from "./pages/restaurant";

function App() {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<RestaurantPage />} />
                    <Route path="/detail-restaurant/:id" element={<DetailRestaurantPage />} />
                </Routes>
            </Router>
        </>
    )
}

export default App;
