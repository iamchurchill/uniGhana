import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Login from "./views/Login";
import Register from "./views/Register";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
            </Routes>
        </Router>
    )
}

export default App;
