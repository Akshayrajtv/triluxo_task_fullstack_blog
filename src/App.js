import TopBar from "./components/topbar/TopBar";
import Single from "./pages/single/Single";
import Write from "./pages/write/Write";
import Home from "./pages/home/Home";
import Settings from "./pages/settings/Settings";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {
    

    return (
        <Router>
            <TopBar />
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/register" element={<Register />} />
                <Route exact path="/login" element={<Login />} />
                <Route path="/write" element= {<Write/>}/>
                 <Route exact path="/settings" element={<Settings/> }/>
                <Route exact path="/post/:postId" element={<Single />} />
            </Routes>
        </Router>
    );
}

export default App;
