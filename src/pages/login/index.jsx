import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";

const Login = () => {
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();
    if (e.target.username.value !== "Admin") return;
    if (e.target.password.value !== "Admin") return;
    // console.log(e.target.username.value + e.target.password.value);
    localStorage.setItem(
      "adminInfo",
      JSON.stringify({
        username: e.target.username.value,
        password: e.target.password.value,
      })
    );

    router.push("/");
  };
  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <main className="bg-[url('/landing.jpg')] h-[calc(100dvh-54px)] md:h-[calc(100dvh-56px)] bg-cover bg-center bg-no-repeat relative flex flex-col md:flex-row px-2  md:px-20 gap-8 justify-center text-white">
        z
        <div name="overlay" className="bg-black/50 absolute inset-0" />
        <h1 className="z-10 my-auto text-3xl md:text-6xl font-semibold px-4 text-center md:text-start">
          QUiWAG STORE PRODUCT ViEWER
        </h1>
        <form
          className="flex flex-col gap-2 z-10 md:px-10 my-auto bg-none md:bg-black/40 w-full md:w-[calc(4px*150)] rounded-lg"
          onSubmit={handleLogin}
        >
          <h2 className="text-2xl font-semibold text-center my-8">
            Admin Login
          </h2>
          <input
            className="p-4 text-black"
            type="text"
            name="username"
            id="username"
            placeholder="Username"
          />
          <input
            className="p-4 text-black"
            type="password"
            name="password"
            id="password"
            placeholder="Password"
          />
          <button className="p-4 bg-red-500 my-8">Login</button>
        </form>
      </main>
    </>
  );
};

export default Login;
