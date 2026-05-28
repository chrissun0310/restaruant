import React from "react";
import { motion } from "framer-motion";
import coverImage from "../assets/sun-master-cover.png";

const DEFAULT_PASSWORD = import.meta.env.VITE_DEFAULT_PASSWORD || "8888";

export default function MasterLogin({ onEnter, coverSrc = coverImage }) {
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const [clickCount, setClickCount] = React.useState(() => Number(localStorage.getItem("sunMasterEnterCount") || 0));
  const [successPulse, setSuccessPulse] = React.useState(false);
  const inputRefs = React.useRef([]);

  function submitPassword() {
    if (password !== DEFAULT_PASSWORD) {
      setError("密码错误，请重新输入");
      if (window.navigator?.vibrate) window.navigator.vibrate([24, 34, 24]);
      window.setTimeout(() => {
        setPassword("");
        setError("");
        inputRefs.current[0]?.focus();
      }, 900);
      return;
    }

    const nextCount = clickCount + 1;
    localStorage.setItem("sunMasterEnterCount", String(nextCount));
    setClickCount(nextCount);
    setError("");
    setSuccessPulse(true);
    if (window.navigator?.vibrate) window.navigator.vibrate(35);
    window.setTimeout(() => onEnter(), 420);
  }

  function handleChange(event, index) {
    const value = event.target.value.replace(/\D/g, "").slice(0, 4);
    const chars = password.split("");
    chars[index] = value.slice(-1);
    const nextPassword = chars.join("").slice(0, 4);
    setPassword(nextPassword);
    setError("");
    if (value && index < 3) inputRefs.current[index + 1]?.focus();
  }

  return (
    <section className="master-login relative min-h-screen overflow-hidden bg-[#070302] text-[#f8efd7]">
      <img className="absolute inset-0 h-full w-full object-cover object-top" src={coverSrc} alt="孙大师风水封面" />
      <div className="absolute inset-0 master-cover-shade" />
      <div className="master-compass-halo master-cover-halo absolute left-1/2 top-[23%] h-[330px] w-[330px] -translate-x-1/2 rounded-full" />
      <FloatingParticles />

      <motion.div
        className="relative z-10 mx-auto flex min-h-screen w-full max-w-[430px] flex-col justify-end px-5 pb-[max(20px,env(safe-area-inset-bottom))] pt-[max(22px,env(safe-area-inset-top))]"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.85, ease: "easeOut" }}
      >
        <div className={`master-panel mb-4 rounded-[16px] border border-[#d8ad55]/45 p-4 shadow-[0_22px_80px_rgba(0,0,0,.52)] backdrop-blur-md ${successPulse ? "success-shake" : ""}`}>
          <div className="mb-3 flex items-center justify-center gap-2">
            <span className="h-px w-10 bg-gradient-to-r from-transparent to-[#d8ad55]/70" />
            <span className="text-[#d8ad55]">◇</span>
            <p className="whitespace-nowrap font-song text-[21px] tracking-[.1em] text-[#f2d998]">请输入密码进入</p>
            <span className="text-[#d8ad55]">◇</span>
            <span className="h-px w-10 bg-gradient-to-l from-transparent to-[#d8ad55]/70" />
          </div>

          <div className="grid w-full grid-cols-4 gap-3" aria-label="4位密码输入框">
            {[0, 1, 2, 3].map((index) => (
              <input
                key={index}
                ref={(node) => { inputRefs.current[index] = node; }}
                className={`master-code-box ${password[index] ? "master-code-box-filled" : ""}`}
                value={password[index] || ""}
                inputMode="numeric"
                maxLength="1"
                onChange={(event) => handleChange(event, index)}
                onKeyDown={(event) => {
                  if (event.key === "Backspace" && !password[index] && index > 0) inputRefs.current[index - 1]?.focus();
                  if (event.key === "Enter") submitPassword();
                }}
                aria-label={`密码第${index + 1}位`}
              />
            ))}
          </div>

          <p className="mt-2 h-5 text-center text-xs text-[#ffb3a7]">{error}</p>

          <motion.button
            className="master-enter-button mt-1 w-full"
            whileTap={{ scale: 0.985 }}
            whileHover={{ scale: 1.01 }}
            onClick={submitPassword}
          >
            进入系统
          </motion.button>
        </div>

        <p className="pb-1 text-center font-song text-[18px] tracking-[.08em] text-[#d8ad55]">
          累计正式点击次数：{clickCount.toLocaleString()} 次
        </p>
      </motion.div>
    </section>
  );
}

function FloatingParticles() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {Array.from({ length: 24 }).map((_, index) => (
        <span
          key={index}
          className="gold-particle"
          style={{
            left: `${(index * 31) % 100}%`,
            animationDelay: `${index * 0.29}s`,
            animationDuration: `${7 + (index % 6)}s`
          }}
        />
      ))}
    </div>
  );
}
