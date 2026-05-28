export const DIRECTIONS = [
  { label: "北", range: [337.5, 360], alt: [0, 22.5], element: "水", angle: 0 },
  { label: "东北", range: [22.5, 67.5], element: "土", angle: 45 },
  { label: "东", range: [67.5, 112.5], element: "木", angle: 90 },
  { label: "东南", range: [112.5, 157.5], element: "木", angle: 135 },
  { label: "南", range: [157.5, 202.5], element: "火", angle: 180 },
  { label: "西南", range: [202.5, 247.5], element: "土", angle: 225 },
  { label: "西", range: [247.5, 292.5], element: "金", angle: 270 },
  { label: "西北", range: [292.5, 337.5], element: "金", angle: 315 }
];

const ROOM_GUIDES = {
  客厅: {
    focus: "客厅重在纳气、聚气与动线开阔。",
    suitable: ["圆叶绿植", "暖色落地灯", "成对摆件", "整洁收纳柜"],
    avoid: ["尖角直冲沙发", "过多镜面", "杂物堆在入门处"]
  },
  卧室: {
    focus: "卧室重在安稳、私密与睡眠气场。",
    suitable: ["柔和床头灯", "成对床头柜", "棉麻织物", "低饱和色床品"],
    avoid: ["镜子正对床", "床头悬空", "横梁压床", "大面积冷光"]
  },
  厨房: {
    focus: "厨房重在水火平衡、清洁与炉灶稳定。",
    suitable: ["陶瓷器皿", "干净台面", "暖光照明", "稳定炉位"],
    avoid: ["灶台正对水槽", "刀具外露", "垃圾桶靠近炉灶"]
  },
  书房: {
    focus: "书房重在专注、文昌与背后有靠。",
    suitable: ["台灯", "书架", "文竹", "山形或稳重摆件"],
    avoid: ["座位背门", "桌面杂乱", "强反光屏幕"]
  },
  办公室: {
    focus: "办公室重在坐有靠、前方明堂与沟通动线。",
    suitable: ["稳重座椅", "文件收纳", "绿色植物", "温润台灯"],
    avoid: ["背后走道", "桌角相冲", "门直冲座位"]
  },
  店铺: {
    focus: "店铺重在门面纳气、收银稳定与动线顺畅。",
    suitable: ["明亮招牌", "干净入口", "聚光陈列", "招财植物"],
    avoid: ["入口遮挡", "收银背后空虚", "杂物堵财位"]
  },
  玄关: {
    focus: "玄关重在缓冲外气、整洁与明亮。",
    suitable: ["暖光灯", "鞋柜收纳", "小型绿植", "柔和地垫"],
    avoid: ["镜子正对大门", "鞋物外露", "昏暗潮湿"]
  },
  其他: {
    focus: "空间重在整洁、采光、通风与动线自然。",
    suitable: ["柔和照明", "圆润家具", "绿植", "收纳用品"],
    avoid: ["尖角直冲", "杂物压迫", "阴暗潮湿"]
  }
};

export function normalizeDegree(value) {
  return ((Math.round(value) % 360) + 360) % 360;
}

export function getDirectionFromDegree(degree) {
  const value = normalizeDegree(degree);
  return DIRECTIONS.find((item) => {
    if (item.alt) return value >= item.range[0] || value < item.alt[1];
    return value >= item.range[0] && value < item.range[1];
  }) || DIRECTIONS[0];
}

export async function analyzeRoomPhoto(photo, compassData, userInput) {
  const roomType = userInput.roomType || "其他";
  const guide = ROOM_GUIDES[roomType] || ROOM_GUIDES.其他;
  const direction = getDirectionFromDegree(compassData.degree || 0);
  const issues = [];
  const adjustments = [];

  if (userInput.mirrorToBed) {
    issues.push("镜子对床容易造成视觉压迫，传统风水中也认为会扰动睡眠气场。");
    adjustments.push("建议移动镜子角度，或用柜门、布帘在夜间遮挡镜面。");
  }
  if (userInput.doorToDoor) {
    issues.push("门对门容易形成直冲动线，隐私与气流稳定性都会变弱。");
    adjustments.push("可在两门之间增加屏风、矮柜、绿植或门帘做缓冲。");
  }
  if (userInput.beamOverhead) {
    issues.push("横梁压顶会带来压迫感，尤其不宜长期压在床、沙发或办公位上方。");
    adjustments.push("优先调整床、沙发或座位位置；无法移动时可用吊顶、软装灯带弱化梁感。");
  }
  if (!photo) {
    issues.push("当前未上传房间照片，建议上传后再结合实际门窗、家具和采光判断。");
  }

  const fortuneHint = direction.label === "东南"
    ? "当前朝向接近东南，传统上常与生发、财气和流动性关联，可保持明亮整洁。"
    : `当前罗盘方向为${direction.label}，五行属${direction.element}，建议先保持该方位干净、通风、少堆杂物。`;

  return {
    title: `${roomType}风水初步建议`,
    summary: `${guide.focus} 本次罗盘读数约为 ${normalizeDegree(compassData.degree || 0)}°（${direction.label}）。`,
    strengths: [
      "已结合空间类型、罗盘方向与基础格局问题进行初步判断。",
      fortuneHint,
      "只要入口、主要坐卧位置和采光保持舒展，整体气场就有较好的基础。"
    ],
    issues: issues.length ? issues : [
      "暂未发现明显高风险格局。后续接入图像识别后，可进一步识别门、窗、床、镜子和炉灶的位置。",
      "目前判断主要依赖用户填写信息，照片内容尚未进行真实 AI 识别。"
    ],
    adjustments: adjustments.length ? adjustments : [
      "保持入口与主要通道无遮挡，让气流和人的动线更顺。",
      "核心家具宜背后有靠，避免长期处在门口、走道或尖角直冲位置。",
      "用暖光、织物和圆润器物缓和过硬、过冷或过直的空间感。"
    ],
    suitable: guide.suitable,
    avoid: guide.avoid,
    positions: [
      { name: "财位", text: "优先保持入门斜对角区域明亮、整洁，可放稳重收纳或圆叶植物。" },
      { name: "文昌位", text: "书桌或阅读区宜有稳定靠背和柔和照明，避免背门与杂物压桌。" },
      { name: "桃花位", text: "可用温润色彩、鲜花或成对小物点缀，但不宜过度堆饰。" },
      { name: "健康位", text: "重视通风、采光、干燥与睡眠区安定，减少尖角、强光和噪音干扰。" }
    ],
    disclaimer: "本结果仅供传统文化和家居参考，不作为绝对判断。"
  };
}
