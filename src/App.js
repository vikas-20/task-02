import React,{useEffect,useState } from 'react';
import './App.css';
import Card from './Components/Card';
import axios from 'axios';
import Spinner from './Components/Spiner';

function App() {
  const [cardData, setData] = useState([]);
  const [visibility, setVisibility] = useState(false);
  const [loading, setLoading] = useState(false);
  const allData = async () => {
    if (visibility) {
      const res = await axios.get("https://reqres.in/api/users?page=1");
      const delay = 3000;
      await new Promise((resolve) => setTimeout(resolve, delay));
      setData(res.data.data);
    }
    setLoading(false);
  };
  const display = () => {
    setVisibility(true);
    setLoading(true);
  };
  useEffect(() => {
    if (visibility) {
      allData();
    }
  },);
  const renderCard = (user) => {
    if (loading) return Spinner;
    else {
      return (
        <Card userName = {user.first_name}
          userLast = {user.last_name}
          userEmail= {user.email}
          avatar = {user.avatar}
        />
      );
    }
  };
  return (
    <>
    <div className="Navbar">
      <h1>
            User's Page
      </h1>
      <button onClick={display}>Get Users</button>
    </div>
     {loading ? <Spinner /> : null}
      <div>
        {loading ? null : cardData.map(renderCard)}
      </div>
    </>
  );
}

export default App;
