"use client";
import "@/css/auth.css";
import Image from "next/image";
import React, { useState } from "react";
import logo from "@/public/logo.png";
import { AnimatePresence, motion } from "motion/react";
import { motionTranstion } from "@/constants/motionTranstion";
import { BASE_URL } from "@/constants/BASE_URL";
import { setCookie } from "cookies-next/client";
import Loader from "@/components/ux/Loader";
import { useRouter } from "next/navigation";
import Eye from "@/components/svg/Eye";
import EyeSlash from "@/components/svg/EyeSlash";

function Auth() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [passwordInput, setPasswordInput] = useState(true);
  const router = useRouter();

  const login = async () => {
    setIsLoading(true);
    setIsError(false);
    setErrorMessage("");
    setIsSuccess(false);
    try {
      const response = await fetch(`${BASE_URL}/Account/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password, email }),
      });

      const data = await response.json();

      if (response.status == 200) {
        setIsLoading(false);
        setIsSuccess(true);
        setCookie("token", data.token);
        router.push("/");
      } else {
        setIsError(true);
        setErrorMessage(data.message);
      }
    } catch (err: any) {
      setIsError(true);
      setErrorMessage("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="auth-page h-screen w-screen fixed top-0 left-0 bg-[var(--background)] flex items-center justify-center z-[10">
        <motion.form
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={motionTranstion}
          action=""
          onSubmit={(e) => {
            e.preventDefault();
            login();
          }}
          className="p-3 flex flex-col gap-4 items-center relative"
        >
          <div className="flex items-center gap-2">
            <Image className="w-[1.5rem]" src={logo} alt="ISMS logo" />
            <h4 className="opacity-75">ISMS</h4>
          </div>

          <div className="input-group">
            <label htmlFor="">Email</label>
            <input
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              required
              type="text"
              placeholder="example@gmail.com"
            />
          </div>

          <div className="input-group relative password">
            <label htmlFor="">Password</label>
            <input
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              required
              type={passwordInput ? "password" : "text"}
              placeholder="password"
            />
            <span
              onClick={() => setPasswordInput(!passwordInput)}
              className="absolute cursor-pointer right-0 bottom-2.5"
            >
              {passwordInput ? (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={motionTranstion}
                >
                  <Eye />
                </motion.span>
              ) : (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={motionTranstion}
                >
                  <EyeSlash />
                </motion.span>
              )}
            </span>
          </div>

          {isError && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={motionTranstion}
              className="error absolute bottom-[-2.5rem]"
            >
              {errorMessage}
            </motion.span>
          )}

          {isSuccess && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={motionTranstion}
              className="success absolute bottom-[-2.5rem]"
            >
              Login success. Setting up your space...
            </motion.span>
          )}

          <button className="cta">{isLoading ? <Loader /> : "Login"}</button>
          <div className="flex w-full">
            <span
              style={{ fontSize: "var(--p2)" }}
              className="opacity-75 ml-auto font-medium"
            >
              Forgot password?
            </span>
          </div>
        </motion.form>
      </div>
    </AnimatePresence>
  );
}

export default Auth;
