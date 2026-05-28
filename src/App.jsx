import React, { useEffect, useMemo, useRef, useState } from "react";
import MasterLogin from "./pages/MasterLogin.jsx";
import { analyzeFengShui } from "./services/analyzeFengShui.js";
import { getDirectionFromDegree, normalizeDegree } from "./services/fengShuiAnalyzer.js";

const STEPS = ["首页", "罗盘", "上传", "分析", "结果"];
const ROOM_TYPES = ["客厅", "卧室", "厨房", "书房", "办公室", "店铺", "玄关", "其他"];
const MOUNTAINS = ["子", "癸", "丑", "艮", "寅", "甲", "卯", "乙", "辰", "巽", "巳", "丙", "午", "丁", "未", "坤", "申", "庚", "酉", "辛", "戌", "乾", "亥", "壬"];
const STEMS = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"];
const BRANCHES = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"];
const BAGUA = ["坎", "艮", "震", "巽", "离", "坤", "兑", "乾"];
const TRIGRAMS = ["☵", "☶", "☳", "☴", "☲", "☷", "☱", "☰"];
const DEGREES = ["0", "30", "60", "90", "120", "150", "180", "210", "240", "270", "300", "330"];

export default function App() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [step, setStep] = useState(0);
  const [degree, setDegree] = useState(0);
  const [sensorEnabled, setSensorEnabled] = useState(false);
  const [manualMode, setManualMode] = useState(false);
  const [savedCompass, setSavedCompass] = useState({ degree: 0, direction: "北" });
  const [photo, setPhoto] = useState(null);
  const [report, setReport] = useState(null);
  const [userInput, setUserInput] = useState({
    roomType: "客厅",
    houseFacing: "",
    doorDirection: "",
    bedPosition: "",
    sofaPosition: "",
    wealthPosition: "",
    mirrorToBed: false,
    doorToDoor: false,
    beamOverhead: false,
    bedHeadAgainstWall: true,
    sofaAgainstWall: true,
    doorFacingToilet: false,
    stoveNearSink: false,
    roomIsBright: true,
    roomIsCluttered: false
  });

  const direction = useMemo(() => getDirectionFromDegree(degree), [degree]);

  if (!isUnlocked) {
    return (
      <MasterLogin
        onEnter={() => {
          setIsUnlocked(true);
        }}
      />
    );
  }

  function go(next) {
    setStep(Math.max(0, Math.min(STEPS.length - 1, next)));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function saveCompass() {
    setSavedCompass({ degree: normalizeDegree(degree), direction: direction.label });
    setUserInput((current) => ({
      ...current,
      houseFacing: current.houseFacing || direction.label,
      doorDirection: current.doorDirection || direction.label
    }));
    go(2);
  }

  async function generateReport() {
    const result = await analyzeFengShui({
      roomType: userInput.roomType,
      compassDirection: savedCompass.direction,
      detectedObjects: buildDetectedObjects(userInput),
      userInputs: {
        hasMirrorFacingBed: userInput.mirrorToBed,
        bedHeadAgainstWall: userInput.bedHeadAgainstWall,
        sofaAgainstWall: userInput.sofaAgainstWall,
        doorFacingToilet: userInput.doorFacingToilet,
        stoveNearSink: userInput.stoveNearSink,
        beamAboveBed: userInput.beamOverhead,
        roomIsBright: userInput.roomIsBright,
        roomIsCluttered: userInput.roomIsCluttered
      }
    });
    setReport(result);
    go(4);
  }

  return (
    <main className="min-h-screen bg-ink text-paper">
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_-10%,rgba(216,173,85,.18),transparent_34%),linear-gradient(180deg,#2a0807,#180706_52%,#080303)]" />
      <div className="fixed inset-0 opacity-[.08] paper-texture" />
      <div className="relative mx-auto min-h-screen w-full max-w-[430px] overflow-hidden border-x border-gold/10 bg-black/10">
        <StatusBar step={step} />
        {step === 0 && <Home onStart={() => go(1)} />}
        {step === 1 && (
          <CompassPage
            degree={degree}
            setDegree={setDegree}
            direction={direction}
            sensorEnabled={sensorEnabled}
            setSensorEnabled={setSensorEnabled}
            manualMode={manualMode}
            setManualMode={setManualMode}
            onSave={saveCompass}
          />
        )}
        {step === 2 && (
          <UploadPage
            photo={photo}
            setPhoto={setPhoto}
            roomType={userInput.roomType}
            setRoomType={(roomType) => setUserInput({ ...userInput, roomType })}
            onBack={() => go(1)}
            onNext={() => go(3)}
          />
        )}
        {step === 3 && (
          <AnalysisPage
            savedCompass={savedCompass}
            userInput={userInput}
            setUserInput={setUserInput}
            onBack={() => go(2)}
            onGenerate={generateReport}
          />
        )}
        {step === 4 && <ResultPage report={report} onRestart={() => go(0)} onEdit={() => go(3)} />}
      </div>
    </main>
  );
}

function buildDetectedObjects(userInput) {
  const objects = [];
  if (userInput.doorToDoor) {
    objects.push({ object: "door", position: "any", facing: "any", relation: "facing_door" });
  }
  if (userInput.bedPosition) {
    objects.push({ object: "bed", position: userInput.bedPosition, facing: userInput.houseFacing || "any", relation: "facing_known" });
  }
  if (userInput.sofaPosition) {
    objects.push({ object: "sofa", position: userInput.sofaPosition, facing: "any", relation: userInput.sofaAgainstWall ? "against_wall" : "no_backing" });
  }
  if (userInput.wealthPosition) {
    objects.push({ object: "layout", position: userInput.wealthPosition, facing: "any", relation: "wealth_position_known" });
  }
  return objects;
}

function StatusBar({ step }) {
  return (
    <header className="sticky top-0 z-20 border-b border-gold/15 bg-ink/80 px-5 pb-3 pt-[max(14px,env(safe-area-inset-top))] backdrop-blur-xl">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-song text-lg tracking-[.18em] text-palegold">玄衡</p>
          <p className="text-[11px] text-paper/52">Feng Shui Compass MVP</p>
        </div>
        <div className="rounded-full border border-gold/30 px-3 py-1 text-xs text-gold">{STEPS[step]}</div>
      </div>
      <div className="mt-3 grid grid-cols-5 gap-1">
        {STEPS.map((item, index) => (
          <div key={item} className={`h-1 rounded-full ${index <= step ? "bg-gold" : "bg-paper/12"}`} />
        ))}
      </div>
    </header>
  );
}

function Home({ onStart }) {
  return (
    <section className="flex min-h-[calc(100vh-84px)] flex-col justify-between px-5 py-6">
      <div>
        <div className="relative mx-auto mt-4 flex h-72 w-72 items-center justify-center">
          <div className="absolute inset-0 rounded-full border border-gold/20 bg-lacquer/20 shadow-glow" />
          <Luopan degree={18} large={false} />
        </div>
        <h1 className="mt-8 font-song text-5xl leading-tight text-palegold">风水罗盘</h1>
        <p className="mt-4 max-w-sm text-base leading-8 text-paper/72">
          用手机罗盘记录朝向，上传房间照片，填写关键布局信息，生成清晰易懂的传统家居风水建议。
        </p>
      </div>
      <div className="space-y-3 pb-4">
        <button className="primary-button w-full" onClick={onStart}>开始测风水</button>
        <p className="text-center text-xs leading-5 text-paper/45">当前为本地模拟分析原型，已预留 AI 图像识别接口。</p>
      </div>
    </section>
  );
}

function CompassPage({ degree, setDegree, direction, sensorEnabled, setSensorEnabled, manualMode, setManualMode, onSave }) {
  const [permissionText, setPermissionText] = useState("尚未启用");

  useEffect(() => {
    if (!sensorEnabled || manualMode) return undefined;
    const handler = (event) => {
      const raw = event.webkitCompassHeading ?? (event.alpha == null ? null : 360 - event.alpha);
      if (raw == null || Number.isNaN(raw)) return;
      setDegree(normalizeDegree(raw));
    };
    window.addEventListener("deviceorientation", handler, true);
    window.addEventListener("deviceorientationabsolute", handler, true);
    return () => {
      window.removeEventListener("deviceorientation", handler, true);
      window.removeEventListener("deviceorientationabsolute", handler, true);
    };
  }, [sensorEnabled, manualMode, setDegree]);

  async function requestSensor() {
    try {
      if (typeof DeviceOrientationEvent !== "undefined" && typeof DeviceOrientationEvent.requestPermission === "function") {
        const state = await DeviceOrientationEvent.requestPermission();
        if (state !== "granted") {
          setPermissionText("未授权，已切换模拟");
          setManualMode(true);
          return;
        }
      }
      setSensorEnabled(true);
      setManualMode(false);
      setPermissionText("传感器已启用");
    } catch {
      setPermissionText("不可用，已切换模拟");
      setManualMode(true);
    }
  }

  return (
    <section className="px-5 py-6">
      <div className="flex items-end justify-between">
        <div>
          <h2 className="font-song text-3xl text-palegold">手机罗盘</h2>
          <p className="mt-2 text-sm text-paper/56">{permissionText}</p>
        </div>
        <button className="ghost-button px-4 py-2" onClick={() => setManualMode(!manualMode)}>
          {manualMode ? "传感器" : "模拟"}
        </button>
      </div>

      <div className="mt-8">
        <ManualCompass degree={degree} setDegree={setDegree} direction={direction} enabled={manualMode || !sensorEnabled} />
      </div>

      <div className="mt-7 rounded-[8px] border border-gold/20 bg-paper/[.06] p-5 shadow-insetGold">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-paper/52">当前方向</p>
            <p className="mt-1 font-song text-5xl text-palegold">{direction.label}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-paper/52">角度</p>
            <p className="mt-1 text-4xl font-semibold text-gold">{normalizeDegree(degree)}°</p>
          </div>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <button className="secondary-button" onClick={requestSensor}>启用罗盘</button>
        <button className="primary-button" onClick={onSave}>保存方向</button>
      </div>
    </section>
  );
}

function ManualCompass({ degree, setDegree, direction, enabled }) {
  const ref = useRef(null);
  const [dragging, setDragging] = useState(false);

  function updateFromPointer(event) {
    if (!enabled || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    const angle = Math.atan2(y, x) * 180 / Math.PI + 90;
    setDegree(normalizeDegree(angle));
  }

  return (
    <div
      ref={ref}
      className={`relative mx-auto h-[340px] w-[340px] max-w-full touch-none select-none ${enabled ? "cursor-grab" : ""}`}
      onPointerDown={(event) => { setDragging(true); updateFromPointer(event); }}
      onPointerMove={(event) => dragging && updateFromPointer(event)}
      onPointerUp={() => setDragging(false)}
      onPointerCancel={() => setDragging(false)}
    >
      <div className="absolute left-1/2 top-0 z-10 h-8 w-5 -translate-x-1/2 clip-pointer bg-gold shadow-lg" />
      <Luopan degree={degree} large />
      <div className="pointer-events-none absolute left-1/2 top-1/2 z-10 grid h-[86px] w-[86px] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-gold/55 bg-ink/90 text-center shadow-insetGold">
        <div>
          <p className="font-song text-3xl leading-none text-palegold">{direction.label}</p>
          <p className="mt-1 text-xs font-semibold text-gold">{normalizeDegree(degree)}°</p>
        </div>
      </div>
    </div>
  );
}

function Luopan({ degree, large }) {
  return (
    <div
      className={`luopan absolute inset-0 m-auto ${large ? "" : "scale-[.84]"}`}
      style={{ transform: `rotate(${-degree}deg) ${large ? "" : "scale(.84)"}` }}
    >
      <TickRing count={120} radius={164} longEvery={5} />
      <TickRing count={24} radius={139} longEvery={1} strong />
      <Ring labels={DEGREES} radius={158} className="text-[10px] font-semibold text-paper/55" />
      <Ring labels={MOUNTAINS} radius={138} className="text-[13px] text-palegold" />
      <Ring labels={BRANCHES} radius={111} className="font-song text-sm text-gold" />
      <Ring labels={STEMS} radius={86} className="text-xs text-paper/70" />
      <Ring labels={BAGUA} radius={61} className="font-song text-base text-palegold" />
      <Ring labels={TRIGRAMS} radius={42} className="text-[22px] text-gold/85" />
      <div className="absolute inset-[18%] rounded-full border border-gold/20" />
      <div className="absolute inset-[28%] rounded-full border border-cinnabar/35" />
      <div className="absolute inset-[37%] rounded-full border border-gold/45 bg-ink/90 shadow-insetGold" />
      <div className="absolute inset-[43%] rounded-full border border-cinnabar bg-gold/90" />
      <div className="absolute left-1/2 top-[12%] h-[76%] w-px -translate-x-1/2 bg-gold/35" />
      <div className="absolute left-[12%] top-1/2 h-px w-[76%] -translate-y-1/2 bg-gold/35" />
    </div>
  );
}

function TickRing({ count, radius, longEvery, strong }) {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => {
        const angle = index * (360 / count);
        const isLong = index % longEvery === 0;
        return (
          <span
            key={`${count}-${index}`}
            className={`absolute left-1/2 top-1/2 block origin-center ${strong ? "bg-gold/55" : "bg-gold/28"}`}
            style={{
              width: strong || isLong ? "1px" : "1px",
              height: strong || isLong ? "14px" : "7px",
              transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-${radius}px)`
            }}
          />
        );
      })}
    </>
  );
}

function Ring({ labels, radius, className }) {
  return (
    <>
      {labels.map((label, index) => {
        const angle = index * (360 / labels.length);
        return (
          <span
            key={`${label}-${index}`}
            className={`absolute left-1/2 top-1/2 block ${className}`}
            style={{ transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-${radius}px) rotate(${-angle}deg)` }}
          >
            {label}
          </span>
        );
      })}
    </>
  );
}

function UploadPage({ photo, setPhoto, roomType, setRoomType, onBack, onNext }) {
  function handleFile(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setPhoto({ name: file.name, url: reader.result });
    reader.readAsDataURL(file);
  }

  return (
    <section className="px-5 py-6">
      <h2 className="font-song text-3xl text-palegold">上传房间照片</h2>
      <p className="mt-2 text-sm leading-6 text-paper/58">支持客厅、卧室、办公室、门口、厨房等空间。当前原型会保存预览，后续可接入 AI Vision。</p>

      <label className="mt-6 flex aspect-[4/3] w-full items-center justify-center overflow-hidden rounded-[8px] border border-dashed border-gold/40 bg-paper/[.06]">
        {photo ? (
          <img className="h-full w-full object-cover" src={photo.url} alt="房间照片预览" />
        ) : (
          <div className="text-center">
            <div className="mx-auto grid h-14 w-14 place-items-center rounded-full border border-gold/35 text-2xl text-gold">+</div>
            <p className="mt-4 text-sm text-paper/62">点击上传照片</p>
          </div>
        )}
        <input className="hidden" type="file" accept="image/*" onChange={handleFile} />
      </label>

      <div className="mt-6">
        <p className="form-label">房间类型</p>
        <div className="mt-3 grid grid-cols-4 gap-2">
          {ROOM_TYPES.map((type) => (
            <button key={type} className={`chip ${roomType === type ? "chip-active" : ""}`} onClick={() => setRoomType(type)}>
              {type}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-3">
        <button className="secondary-button" onClick={onBack}>返回</button>
        <button className="primary-button" onClick={onNext}>继续分析</button>
      </div>
    </section>
  );
}

function AnalysisPage({ savedCompass, userInput, setUserInput, onBack, onGenerate }) {
  function update(key, value) {
    setUserInput({ ...userInput, [key]: value });
  }

  return (
    <section className="px-5 py-6">
      <h2 className="font-song text-3xl text-palegold">填写布局信息</h2>
      <div className="mt-4 rounded-[8px] border border-gold/20 bg-paper/[.06] p-4">
        <p className="text-sm text-paper/56">已保存罗盘</p>
        <p className="mt-1 text-2xl font-semibold text-gold">{savedCompass.direction} · {savedCompass.degree}°</p>
      </div>

      <div className="mt-5 space-y-4">
        <TextInput label="房子朝向" value={userInput.houseFacing} onChange={(value) => update("houseFacing", value)} placeholder="例如：坐北朝南" />
        <TextInput label="大门方向" value={userInput.doorDirection} onChange={(value) => update("doorDirection", value)} placeholder="例如：东南" />
        <TextInput label="床的位置" value={userInput.bedPosition} onChange={(value) => update("bedPosition", value)} placeholder="例如：靠西墙，床头向北" />
        <TextInput label="沙发位置" value={userInput.sofaPosition} onChange={(value) => update("sofaPosition", value)} placeholder="例如：靠东墙，面向电视墙" />
        <TextInput label="财位位置" value={userInput.wealthPosition} onChange={(value) => update("wealthPosition", value)} placeholder="例如：入门斜对角" />
      </div>

      <div className="mt-5 space-y-3">
        <Toggle label="镜子对床" checked={userInput.mirrorToBed} onChange={(value) => update("mirrorToBed", value)} />
        <Toggle label="门对门" checked={userInput.doorToDoor} onChange={(value) => update("doorToDoor", value)} />
        <Toggle label="横梁压顶" checked={userInput.beamOverhead} onChange={(value) => update("beamOverhead", value)} />
        <Toggle label="床头靠墙" checked={userInput.bedHeadAgainstWall} onChange={(value) => update("bedHeadAgainstWall", value)} />
        <Toggle label="沙发靠墙" checked={userInput.sofaAgainstWall} onChange={(value) => update("sofaAgainstWall", value)} />
        <Toggle label="大门对厕所" checked={userInput.doorFacingToilet} onChange={(value) => update("doorFacingToilet", value)} />
        <Toggle label="灶台靠近水槽" checked={userInput.stoveNearSink} onChange={(value) => update("stoveNearSink", value)} />
        <Toggle label="房间明亮" checked={userInput.roomIsBright} onChange={(value) => update("roomIsBright", value)} />
        <Toggle label="房间凌乱" checked={userInput.roomIsCluttered} onChange={(value) => update("roomIsCluttered", value)} />
      </div>

      <div className="mt-8 grid grid-cols-2 gap-3">
        <button className="secondary-button" onClick={onBack}>返回</button>
        <button className="primary-button" onClick={onGenerate}>生成建议</button>
      </div>
    </section>
  );
}

function TextInput({ label, value, onChange, placeholder }) {
  return (
    <label className="block">
      <span className="form-label">{label}</span>
      <input
        className="mt-2 w-full rounded-[8px] border border-gold/18 bg-paper/[.07] px-4 py-3 text-base text-paper outline-none transition focus:border-gold/60"
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  );
}

function Toggle({ label, checked, onChange }) {
  return (
    <button className="flex w-full items-center justify-between rounded-[8px] border border-gold/18 bg-paper/[.06] px-4 py-3" onClick={() => onChange(!checked)}>
      <span className="text-sm text-paper/78">{label}</span>
      <span className={`relative h-7 w-12 rounded-full transition ${checked ? "bg-gold" : "bg-paper/18"}`}>
        <span className={`absolute top-1 h-5 w-5 rounded-full bg-ink transition ${checked ? "left-6" : "left-1"}`} />
      </span>
    </button>
  );
}

function ResultPage({ report, onRestart, onEdit }) {
  if (!report) return null;
  return (
    <section className="px-5 py-6">
      <h2 className="font-song text-3xl text-palegold">风水规则分析结果</h2>
      <div className="mt-4 rounded-[8px] border border-gold/25 bg-paper/[.07] p-5 shadow-insetGold">
        <p className="text-sm text-paper/56">总评分</p>
        <div className="mt-2 flex items-end justify-between">
          <p className="text-6xl font-semibold text-gold">{report.score}</p>
          <p className="rounded-full border border-gold/35 px-4 py-2 font-song text-2xl text-palegold">{report.level}</p>
        </div>
      </div>
      <ReportBlock title="识别到的问题" items={report.issues} />
      <ReportBlock title="正面布局" items={report.positiveFindings} />
      <ReportBlock title="调整建议" items={report.recommendations} />

      <div className="mt-5 grid grid-cols-2 gap-3">
        <MiniList title="推荐颜色" items={report.colorSuggestions} />
        <MiniList title="推荐摆件" items={report.luckyItems} />
      </div>

      <div className="mt-5 rounded-[8px] border border-gold/20 bg-paper/[.06] p-4">
        <h3 className="font-song text-xl text-palegold">方位建议</h3>
        <ul className="mt-3 space-y-2">
          {report.directionSuggestions.map((item, index) => (
            <li key={index} className="flex gap-3 text-sm leading-6 text-paper/70">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <p className="mt-5 text-center text-xs leading-5 text-paper/45">{report.disclaimer}</p>
      <div className="mt-6 grid grid-cols-2 gap-3 pb-4">
        <button className="secondary-button" onClick={onEdit}>修改信息</button>
        <button className="primary-button" onClick={onRestart}>重新开始</button>
      </div>
    </section>
  );
}

function ReportBlock({ title, items }) {
  return (
    <div className="mt-5 rounded-[8px] border border-gold/20 bg-paper/[.06] p-4">
      <h3 className="font-song text-xl text-palegold">{title}</h3>
      <ul className="mt-3 space-y-2">
        {items.map((item, index) => (
          <li key={index} className="flex gap-3 text-sm leading-6 text-paper/70">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function MiniList({ title, items }) {
  return (
    <div className="rounded-[8px] border border-gold/20 bg-paper/[.06] p-4">
      <h3 className="font-song text-lg text-palegold">{title}</h3>
      <div className="mt-3 flex flex-wrap gap-2">
        {items.map((item) => <span key={item} className="rounded-full bg-gold/12 px-3 py-1 text-xs text-palegold">{item}</span>)}
      </div>
    </div>
  );
}
