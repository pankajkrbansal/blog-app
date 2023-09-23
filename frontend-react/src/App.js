import "./App.css";
import Post from "./components/Post";
import Layout from "./components/Layout";
import Login from "./components/Login";
import { Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import { UserContextProvider } from "./components/UserContext";
import CreatePost from "./components/CreatePost";
import IndexPage from "./components/IndexPage";

function App() {
  return (
    <div>
      <main>
        <UserContextProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<IndexPage />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="/create" element={<CreatePost/>} />
            </Route>
          </Routes>
        </UserContextProvider>
      </main>
    </div>
  );
}

export default App;
