"use client";
import "@/css/auth.css";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import logo from "@/public/logo.png";
import { AnimatePresence, motion } from "motion/react";
import { motionTransition } from "@/constants/motionTransition";
import Loader from "@/components/ux/Loader";
import { useRouter } from "nextjs-toploader/app";
import Eye from "@/components/svg/Eye";
import EyeSlash from "@/components/svg/EyeSlash";
import Check from "@/components/svg/Check";
import { login } from "@/api/auth";

function Auth() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [passwordInput, setPasswordInput] = useState(true);
  const router = useRouter();
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    if (isSuccess) {
      window.setTimeout(() => {
        router.push("/");
      }, 1500);
    }
  }, [isSuccess, router]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    login({
      email,
      password,
      rememberMe,
      setErrorMessage,
      setIsError,
      setIsLoading,
      setIsSuccess,
    });
  };

  return (
    <AnimatePresence>
      <div className="auth-page h-screen w-screen fixed top-0 left-0 bg-[var(--background)] flex items-center justify-center z-[10">
        <motion.form
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={motionTransition}
          action=""
          onSubmit={submit}
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
                  transition={motionTransition}
                >
                  <Eye />
                </motion.span>
              ) : (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={motionTransition}
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
              transition={motionTransition}
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
              transition={motionTransition}
              className="success absolute bottom-[-2.5rem]"
            >
              Login success. Setting up your space...
            </motion.span>
          )}

          <button className="cta">{isLoading ? <Loader /> : "Login"}</button>
          <div className="flex w-full">
            <span
              onClick={() => setRememberMe(!rememberMe)}
              className={`checkbox-container ${rememberMe ? "checked" : ""}`}
            >
              <span className="checkbox">
                <Check />
              </span>
              <span className="checkbox-label">Remember me</span>
            </span>
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
