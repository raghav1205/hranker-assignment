"use client";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

interface Item {
  id: number;
  name: string;
}

const Dahsboard = () => {
  const [items, setItems] = useState<Item[]>([]);
  useEffect(() => {
    const getItems = async () => {
      const result = await fetch("http://localhost:3000/api/v1/dashboard");
      const resultBody = await result.json();
      setItems(resultBody.items);
    };
    getItems();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token")
    redirect('/')
  }

  return (
    <div className="w-[70%] mx-auto flex flex-col items-center justify-center relaitve">
      <h1 className="text-2xl mt-8">Welcome to your dashboard</h1>
      <button className="absolute right-20 top-5 " onClick = {handleLogout}> Logout </button>
      <div className="grid grid-cols-3 mt-8 gap-5">
        {
            items.length > 0 ? items.map(item => {
                return <div key = {item.id}>
                    {item.name}
                </div>
            } )
            : <p>loading....</p>
        }
       
      </div>
    </div>
  );
};

export default Dahsboard;
