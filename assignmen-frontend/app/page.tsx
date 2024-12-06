"use client";
import { useState } from "react";
import { redirect } from "next/navigation";

export default function Home() {
  const [username, setUsername] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [alreadyUser, setAlreadyUser] = useState<boolean>(false);

  const handleSubmit = async () => {
    const endpoint = alreadyUser ? 'signin' : 'signup'
    const result = await fetch(`http://localhost:3000/api/v1/${endpoint}`, {
      method: "POST",
      body: JSON.stringify({
        username,
        password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (result.status == 200) {
      const response = await result.json();
      console.log(response);
      localStorage.setItem("token", response.token);
      redirect("/dashboard");
    }
  };

  const handleAlreadyUser = () => {
    setAlreadyUser(prev => !prev)
  }
  return (
    <div className="flex justify-center items-center mx-auto mt-[0rem] w-[70%] border-2 h-screen ">
      <div className="flex flex-col text-center ">
        {alreadyUser ? (
          <>
            <h2 className="mb-2   text-xl  ">Login</h2>
            <p className="text-sm my-3">
              New user? <span onClick={handleAlreadyUser} className="cursor-pointer"> Signup </span>
            </p>
          </>
        ) : (
          <>
            <h2 className="mb-2 text-xl ">Signup</h2>
            <p className="text-sm my-3">
              Already a user? <span onClick={handleAlreadyUser} className="cursor-pointer"> Login </span>
            </p>
          </>
        )}
        <input
          className="p-3 mt-2 "
          placeholder="username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <input
          className="p-3 mt-2  "
          placeholder="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />

        <button
          className="mt-5 bg-blue-800 text-white w-[50%] mx-auto px-3 py-1 rounded-md"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
