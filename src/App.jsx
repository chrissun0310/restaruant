import React, { useEffect, useMemo, useState } from "react";
import { analyzeFengShui } from "./services/analyzeFengShui.js";
import { getDirectionFromDegree, normalizeDegree } from "./services/fengShuiAnalyzer.js";
import ziweiKnowledge from "../knowledge/ziwei/palaces.json";
import palmKnowledge from "../knowledge/palmistry/lines.json";
import faceKnowledge from "../knowledge/physiognomy/features.json";
import fengshuiKnowledge from "../knowledge/fengshui/basic.json";

const DISCLAIMER = "本结果基于传统文化资料与AI生成内容，仅供学习、娱乐和参考，不构成任何专业建议或事实判断。";
const MODULES = [
  { path: "/fengshui", title: "风水分析", icon: "罗", text: "罗盘朝向、空间布局、家居建议" },
  { path: "/ziwei", title: "紫微斗数", icon: "紫", text: "十二宫知识库，性格与方向参考" },
  { path: "/palm", title: "手相分析", icon: "掌", text: "生命线、智慧线、感情线、事业线" },
  { path: "/face", title: "面相分析", icon: "相", text: "五官比例、三庭五眼、整体协调" }
];
const FIELD = "w-full rounded-[8px] border border-gold/25 bg-black/25 px-3 py-3 text-paper outline-none focus:border-palegold";
const CARD = "rounded-[8px] border border-gold/20 bg-paper/[.06] p-4 shadow-insetGold";

export default function App() {
  const [route, setRoute] = useState(path());
  useEffect(() => {
    const sync = () => setRoute(path());
    window.addEventListener("popstate", sync);
    return () => window.removeEventListener("popstate", sync);
  }, []);
  const nav = (to) => {
    window.history.pushState({}, "", to);
    setRoute(to);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <main className="min-h-screen bg-ink text-paper">
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_-10%,rgba(216,173,85,.24),transparent_32%),radial-gradient(circle_at_12%_82%,rgba(143,22,22,.35),transparent_34%),linear-gradient(180deg,#2a0807,#180706_52%,#080303)]" />
      <div className="fixed inset-0 opacity-[.08] paper-texture" />
      <Particles />
      <div className="relative mx-auto min-h-screen max-w-[430px] border-x border-gold/10 bg-black/10">
        {route === "/" && <Home nav={nav} />}
        {route === "/fengshui" && <Fengshui nav={nav} />}
        {route === "/ziwei" && <Ziwei nav={nav} />}
        {route === "/palm" && <Palm nav={nav} />}
        {route === "/face" && <Face nav={nav} />}
      </div>
    </main>
  );
}

function path() {
  return ["/", "/fengshui", "/ziwei", "/palm", "/face"].includes(window.location.pathname) ? window.location.pathname : "/";
}

function Header({ nav, title }) {
  return <header className="sticky top-0 z-20 border-b border-gold/15 bg-ink/85 px-5 py-4 backdrop-blur-xl">
    <button className="text-left" onClick={() => nav("/")}> 
      <p className="font-song text-lg tracking-[.18em] text-palegold">孙大师风水</p>
      <p className="text-xs text-paper/50">{title}</p>
    </button>
  </header>;
}

function Home({ nav }) {
  const total = ziweiKnowledge.length + palmKnowledge.length + faceKnowledge.length + fengshuiKnowledge.length;
  return <section className="min-h-screen px-5 py-7">
    <div className={`${CARD} relative overflow-hidden`}>
      <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full border border-gold/30 bg-gold/10" />
      <p className="font-song text-xl tracking-[.22em] text-gold">孙大师风水</p>
      <h1 className="mt-5 font-song text-5xl leading-tight text-palegold">东方玄学<br />智能分析</h1>
      <p className="mt-4 text-sm leading-7 text-paper/65">风水、紫微、手相、面相四大入口，基于传统文化 JSON 知识库生成参考解读。</p>
    </div>
    <div className="mt-5 grid gap-3">
      {MODULES.map((m) => <button key={m.path} onClick={() => nav(m.path)} className="module-card text-left">
        <span className="module-icon">{m.icon}</span><span className="flex-1"><span className="block font-song text-2xl text-palegold">{m.title}</span><span className="mt-1 block text-sm leading-6 text-paper/58">{m.text}</span></span><span className="text-2xl text-gold">›</span>
      </button>)}
    </div>
    <div className={`${CARD} mt-5`}><p className="font-song text-lg text-palegold">Zi Wei Knowledge Base · RAG 架构</p><p className="mt-2 text-sm leading-6 text-paper/58">已建立 knowledge/ JSON 知识库，共 {total} 条条目，后续可接入真实排盘、图像识别与向量检索。</p></div>
    <p className="mt-5 text-center text-xs leading-5 text-paper/45">{DISCLAIMER}</p>
  </section>;
}

function Ziwei({ nav }) {
  const [form, setForm] = useState({ name: "", gender: "男性", date: "", time: "", city: "" });
  const [result, setResult] = useState(null);
  const submit = () => {
    const seed = (form.name + form.date + form.time + form.city).length;
    const pick = (i) => ziweiKnowledge[(seed + i) % ziweiKnowledge.length];
    setResult([
      ["性格倾向", `传统紫微斗数认为，${pick(0).topic}可作为观察个人行动方式的参考：${pick(0).interpretation}`],
      ["事业倾向", `传统观点认为，${pick(2).topic}与事业表达有关，可能呈现${pick(2).interpretation}`],
      ["财富倾向", `从${pick(1).topic}角度看，财富管理更适合稳健规划，仅供参考。${pick(1).interpretation}`],
      ["人际关系倾向", `${pick(3).topic}提示互动关系中的倾向，可作为自我观察。${pick(3).interpretation}`],
      ["建议方向", `建议把结果作为传统文化研究与娱乐材料，结合现实沟通、学习与长期计划综合判断。`]
    ]);
  };
  return <Page nav={nav} title="紫微斗数"><FormGrid>
    <Input label="姓名" value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
    <Select label="性别" value={form.gender} options={["男性", "女性"]} onChange={(v) => setForm({ ...form, gender: v })} />
    <Input label="出生日期" type="date" value={form.date} onChange={(v) => setForm({ ...form, date: v })} />
    <Input label="出生时间" type="time" value={form.time} onChange={(v) => setForm({ ...form, time: v })} />
    <Input label="出生城市" value={form.city} onChange={(v) => setForm({ ...form, city: v })} />
    <button className="primary-button" onClick={submit}>生成紫微参考</button>
  </FormGrid>{result && <Result rows={result} />}</Page>;
}

function Palm({ nav }) {
  const [gender, setGender] = useState("男性");
  const [img, setImg] = useState("");
  const [result, setResult] = useState(null);
  const submit = () => setResult(palmKnowledge.map((item) => [item.topic, `传统手相文化认为，${item.description}${item.interpretation} 该内容可作为个性特点与职业发展参考。`]));
  return <Page nav={nav} title="手相分析"><div className={CARD}>
    <p className="text-sm leading-6 text-paper/65">男左女右：男性建议上传左手，女性建议上传右手。第一版仅做传统手相文化解读。</p>
    <div className="mt-4 grid grid-cols-2 gap-2">{["男性", "女性"].map((g) => <button key={g} onClick={() => setGender(g)} className={gender === g ? "primary-button" : "secondary-button"}>{g}</button>)}</div>
    <Upload label="上传手掌照片" image={img} setImage={setImg} />
    <button className="primary-button mt-4 w-full" onClick={submit}>生成手相参考</button>
  </div>{result && <Result rows={result} extra="不构成医学、法律、投资或人生建议。" />}</Page>;
}

function Face({ nav }) {
  const [img, setImg] = useState("");
  const [result, setResult] = useState(null);
  const submit = () => setResult(faceKnowledge.map((item) => [item.topic, `传统面相文化认为，${item.description}${item.interpretation} 仅用于外在气质、社交风格与性格特点参考。`]));
  return <Page nav={nav} title="面相分析"><div className={CARD}>
    <p className="text-sm leading-6 text-paper/65">请上传正面清晰头像。分析范围限于五官比例、三庭五眼与整体协调性，不判断疾病、寿命、犯罪、智商、种族或财富保证。</p>
    <Upload label="上传正面头像" image={img} setImage={setImg} />
    <button className="primary-button mt-4 w-full" onClick={submit}>生成面相参考</button>
  </div>{result && <Result rows={result} />}</Page>;
}

function Fengshui({ nav }) {
  const [degree, setDegree] = useState(0);
  const [room, setRoom] = useState("客厅");
  const [report, setReport] = useState(null);
  const direction = useMemo(() => getDirectionFromDegree(degree), [degree]);
  const submit = async () => {
    const result = await analyzeFengShui({ roomType: room, compassDirection: direction.label, detectedObjects: [], userInputs: { roomIsBright: true, bedHeadAgainstWall: true, sofaAgainstWall: true } });
    setReport([
      ["整体格局", result.summary || "传统风水观点认为，空间气口、采光与动线会影响居住感受，可作为整理布局的参考。"],
      ["朝向参考", `当前罗盘为 ${normalizeDegree(degree)}°，约为${direction.label}向。传统观点认为，可结合实际采光、通风和使用习惯观察。`],
      ["建议方向", (result.suggestions || ["保持明亮整洁", "避免长期堆积杂物", "主要家具宜稳定有靠"]).join("；")]
    ]);
  };
  return <Page nav={nav} title="风水分析"><div className={CARD}>
    <div className="mx-auto grid h-64 w-64 place-items-center rounded-full border-4 border-gold/70 bg-black/35 shadow-glow"><div className="font-song text-6xl text-palegold">罗</div><div className="absolute mt-28 text-gold">{normalizeDegree(degree)}° · {direction.label}</div></div>
    <input className="mt-5 w-full accent-gold" min="0" max="359" type="range" value={degree} onChange={(e) => setDegree(Number(e.target.value))} />
    <Select label="空间类型" value={room} options={["客厅", "卧室", "厨房", "书房", "办公室", "店铺", "玄关", "其他"]} onChange={setRoom} />
    <button className="primary-button mt-4 w-full" onClick={submit}>生成风水参考</button>
  </div>{report && <Result rows={report} />}</Page>;
}

function Page({ nav, title, children }) {
  return <><Header nav={nav} title={title} /><section className="px-5 py-5"><h1 className="font-song text-4xl text-palegold">{title}</h1><p className="mt-2 text-sm leading-6 text-paper/58">传统文化知识库分析，仅供学习、娱乐和参考。</p><div className="mt-5 grid gap-4">{children}</div></section></>;
}
function FormGrid({ children }) { return <div className={`${CARD} grid gap-3`}>{children}</div>; }
function Input({ label, value, onChange, type = "text" }) { return <label className="block text-sm text-paper/58">{label}<input className={`${FIELD} mt-2`} type={type} value={value} onChange={(e) => onChange(e.target.value)} /></label>; }
function Select({ label, value, options, onChange }) { return <label className="mt-3 block text-sm text-paper/58">{label}<select className={`${FIELD} mt-2`} value={value} onChange={(e) => onChange(e.target.value)}>{options.map((o) => <option key={o}>{o}</option>)}</select></label>; }
function Upload({ label, image, setImage }) {
  return <label className="mt-4 block rounded-[8px] border border-dashed border-gold/35 bg-black/20 p-4 text-center text-sm text-paper/60">{image ? <img src={image} alt={label} className="mx-auto max-h-56 rounded-[8px] object-cover" /> : label}<input className="hidden" type="file" accept="image/*" onChange={(e) => { const file = e.target.files?.[0]; if (!file) return; const r = new FileReader(); r.onload = () => setImage(String(r.result)); r.readAsDataURL(file); }} /></label>;
}
function Result({ rows, extra }) { return <div className="grid gap-3">{rows.map(([title, text]) => <div key={title} className={CARD}><p className="font-song text-xl text-palegold">{title}</p><p className="mt-2 text-sm leading-7 text-paper/70">{text}</p></div>)}<p className="rounded-[8px] border border-gold/25 bg-black/30 p-4 text-xs leading-6 text-gold/85">{extra ? `${extra} ` : ""}{DISCLAIMER}</p></div>; }
function Particles() { return <div className="pointer-events-none fixed inset-0 overflow-hidden">{Array.from({ length: 22 }).map((_, i) => <span key={i} className="absolute h-1 w-1 rounded-full bg-gold/60" style={{ left: `${(i * 37) % 100}%`, top: `${(i * 19) % 100}%`, opacity: .22 + (i % 4) * .12 }} />)}</div>; }
