import {useEffect, useState} from "react";
import api from "../services/api";

const AdminDashboard=()=>{
    const[data,setData]=useState(null);

    useEffect(()=>{
        api.get("admin/dashboard")
            .then(res=>setData(res.data))
            .catch(err=>console.log(err));
    },[]);

    return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-6 shadow rounded-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Admin Dashboard</h1>
      {data ? (
        <div className="space-y-2">
          <p><strong>Message:</strong> {data.message}</p>
          <p><strong>Total User:</strong> {data.totalUsers}</p>
          <p><strong>Active Session:</strong> {data.activeSessions}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default AdminDashboard;