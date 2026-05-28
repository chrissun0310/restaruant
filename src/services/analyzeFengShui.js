const DEFAULT_RULES_URL = "/fengshui_rules.json";

const ROOM_TYPE_MAP = {
  客厅: "living_room",
  卧室: "bedroom",
  厨房: "kitchen",
  书房: "office",
  办公室: "office",
  店铺: "shop",
  玄关: "entrance",
  大门: "entrance",
  卫生间: "bathroom",
  bathroom: "bathroom",
  bedroom: "bedroom",
  living_room: "living_room",
  kitchen: "kitchen",
  entrance: "entrance",
  office: "office",
  shop: "shop",
  general: "general"
};

const DIRECTION_MAP = {
  北: "north",
  南: "south",
  东: "east",
  西: "west",
  东北: "northeast",
  西北: "northwest",
  东南: "southeast",
  西南: "southwest",
  north: "north",
  south: "south",
  east: "east",
  west: "west",
  northeast: "northeast",
  northwest: "northwest",
  southeast: "southeast",
  southwest: "southwest",
  any: "any"
};

const LUCKY_ITEMS = {
  bedroom: ["柔和床头灯", "成对床头柜", "棉麻织物", "低饱和色床品"],
  living_room: ["圆叶绿植", "暖色落地灯", "整洁收纳柜", "圆角茶几"],
  kitchen: ["陶瓷器皿", "带盖垃圾桶", "防滑地垫", "暖白操作灯"],
  entrance: ["暖光玄关灯", "封闭鞋柜", "干净地垫", "侧墙仪容镜"],
  office: ["稳固书桌", "台灯", "小型绿植", "文件收纳盒"],
  shop: ["明亮招牌", "健康植物", "重点陈列灯", "整洁收银托盘"],
  bathroom: ["排风扇", "除湿用品", "封闭收纳", "暖光灯"],
  general: ["圆叶植物", "柔和照明", "陶瓷摆件", "木质收纳"]
};

const COLOR_SUGGESTIONS = {
  north: ["深蓝小面积点缀", "黑色少量点缀", "搭配暖光避免过暗"],
  south: ["暖白光", "少量红色或橙色", "避免大面积强烈火色"],
  east: ["绿色", "木色", "浅青色"],
  west: ["白色", "金属色", "米灰色"],
  northeast: ["米色", "陶土色", "浅黄色"],
  northwest: ["白色", "金色", "浅灰色"],
  southeast: ["绿色", "木色", "浅蓝绿色"],
  southwest: ["米色", "暖黄色", "陶土色"],
  any: ["柔和中性色", "低饱和暖色", "自然木色"]
};

export async function analyzeFengShui(input, rulesSource = DEFAULT_RULES_URL) {
  const rules = Array.isArray(rulesSource) ? rulesSource : await loadRules(rulesSource);
  const category = normalizeRoomType(input.roomType);
  const compassDirection = normalizeDirection(input.compassDirection);
  const facts = buildFactSet(input, compassDirection);
  const matchedRules = rules.filter((rule) => isRuleMatched(rule, category, compassDirection, facts));
  const score = clamp(
    80 + matchedRules.reduce((total, rule) => total + normalizedScoreChange(rule), 0),
    0,
    100
  );

  const positiveFindings = unique(
    matchedRules.filter((rule) => rule.severity === "positive").map((rule) => `${rule.condition} ${rule.recommendation}`)
  ).slice(0, 8);
  const issues = unique(
    matchedRules.filter((rule) => rule.severity !== "positive").map((rule) => `${rule.condition} ${rule.principle}`)
  ).slice(0, 10);
  const recommendations = unique(matchedRules.map((rule) => rule.recommendation)).slice(0, 10);
  const directionSuggestions = unique(
    matchedRules
      .filter((rule) => rule.school === "八宅" || rule.school === "五行" || rule.direction_required !== "any")
      .map((rule) => `${directionLabel(rule.direction_required)}：${rule.recommendation}`)
  ).slice(0, 8);

  return {
    score,
    level: getLevel(score),
    positiveFindings: positiveFindings.length ? positiveFindings : ["暂未命中明显正向规则，建议补充照片识别结果或更多布局信息。"],
    issues: issues.length ? issues : ["暂未命中明显问题规则，仍建议结合照片、户型和实际居住感受复核。"],
    recommendations: recommendations.length ? recommendations : ["保持空间明亮、整洁、通风，优先处理门冲、梁压、镜照和动线遮挡等可见问题。"],
    luckyItems: unique([...(LUCKY_ITEMS[category] || LUCKY_ITEMS.general), ...itemsFromDirection(compassDirection)]).slice(0, 8),
    colorSuggestions: COLOR_SUGGESTIONS[compassDirection] || COLOR_SUGGESTIONS.any,
    directionSuggestions: directionSuggestions.length
      ? directionSuggestions
      : [`${directionLabel(compassDirection)}：保持该方位干净、明亮、通风，避免堆放破损物或长期不用的杂物。`],
    disclaimer: "本结果仅供传统文化与家居布局参考，不作为绝对判断。"
  };
}

async function loadRules(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`无法读取风水规则库：${response.status}`);
  return response.json();
}

function buildFactSet(input, compassDirection) {
  const facts = new Set([`direction:${compassDirection}`]);
  const user = input.userInputs || {};
  addBooleanFact(facts, "hasMirrorFacingBed", user.hasMirrorFacingBed);
  addBooleanFact(facts, "bedHeadAgainstWall", user.bedHeadAgainstWall);
  addBooleanFact(facts, "sofaAgainstWall", user.sofaAgainstWall);
  addBooleanFact(facts, "doorFacingToilet", user.doorFacingToilet);
  addBooleanFact(facts, "stoveNearSink", user.stoveNearSink);
  addBooleanFact(facts, "beamAboveBed", user.beamAboveBed);
  addBooleanFact(facts, "roomIsBright", user.roomIsBright);
  addBooleanFact(facts, "roomIsCluttered", user.roomIsCluttered);

  for (const item of input.detectedObjects || []) {
    if (item.object) facts.add(item.object);
    if (item.relation) facts.add(`${item.object}:${item.relation}`);
    if (item.position) facts.add(`${item.object}:position:${normalizeDirection(item.position)}`);
    if (item.facing) facts.add(`${item.object}:facing:${normalizeDirection(item.facing)}`);
  }

  return facts;
}

function addBooleanFact(facts, key, value) {
  facts.add(value ? key : `!${key}`);
}

function isRuleMatched(rule, category, compassDirection, facts) {
  if (rule.category !== "general" && rule.category !== category) return false;
  if (rule.direction_required !== "any" && rule.direction_required !== compassDirection && !facts.has(`direction:${rule.direction_required}`)) {
    return false;
  }
  const triggers = rule.triggers || [];
  if (!triggers.length) return rule.direction_required !== "any" && rule.direction_required === compassDirection;
  return triggers.some((trigger) => facts.has(trigger));
}

function normalizedScoreChange(rule) {
  if (rule.severity === "positive") return Math.max(1, rule.score_change || 6);
  if (rule.severity === "low") return Math.min(-3, rule.score_change || -4);
  if (rule.severity === "medium") return Math.min(-8, rule.score_change || -10);
  return Math.min(-15, rule.score_change || -18);
}

function normalizeRoomType(roomType) {
  return ROOM_TYPE_MAP[roomType] || "general";
}

function normalizeDirection(direction) {
  return DIRECTION_MAP[direction] || "any";
}

function getLevel(score) {
  if (score >= 88) return "优秀";
  if (score >= 75) return "良好";
  if (score >= 60) return "一般";
  return "需要调整";
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, Math.round(value)));
}

function unique(items) {
  return Array.from(new Set(items.filter(Boolean)));
}

function directionLabel(direction) {
  const labels = {
    north: "北方",
    south: "南方",
    east: "东方",
    west: "西方",
    northeast: "东北方",
    northwest: "西北方",
    southeast: "东南方",
    southwest: "西南方",
    any: "整体空间"
  };
  return labels[direction];
}

function itemsFromDirection(direction) {
  const items = {
    north: ["暖光灯", "整洁水景"],
    south: ["暖色灯", "陶瓷小件"],
    east: ["圆叶绿植", "木质收纳"],
    west: ["圆形金属小件", "白色收纳盒"],
    northeast: ["陶瓷摆件", "低矮柜"],
    northwest: ["金属托盘", "整洁文件盒"],
    southeast: ["健康绿植", "木质小几"],
    southwest: ["棉麻织物", "陶土色摆件"],
    any: ["柔和照明", "圆润器物"]
  };
  return items[direction];
}
