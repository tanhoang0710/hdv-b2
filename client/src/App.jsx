import { useState } from "react";
import axios from "axios";
import "./App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [orderNumber, setOrderNumber] = useState("");
  const [companyID, setCompanyID] = useState("");

  const handleCheckStatus = async () => {
    try {
      const res = await axios.post("http://localhost:3000", {
        orderNumber,
        companyID,
      });
      if (res.status === 200 && res.data) {
        if (res.data.order) {
          if (res.data.order.status === true) toast.success("Đã giao");
          else toast.error("Chưa giao");
        }
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="App">
      <label htmlFor="orderNumber">Order Number</label>
      <input
        id="orderNumber"
        type="text"
        value={orderNumber}
        onChange={(e) => setOrderNumber(e.target.value)}
      />
      <label htmlFor="companyID">Company ID</label>
      <input
        id="companyID"
        type="text"
        value={companyID}
        onChange={(e) => setCompanyID(e.target.value)}
      />

      <button onClick={handleCheckStatus}>Check status</button>
      <ToastContainer />
    </div>
  );
}

export default App;
