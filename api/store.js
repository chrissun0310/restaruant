const storageKeys = {
  main: {
    daily: "yoMien:main:dailyRecords",
    monthly: "yoMien:main:monthlyRecords",
  },
  demo: {
    daily: "yoMien:demo:dailyRecords",
    monthly: "yoMien:demo:monthlyRecords",
    loginCount: "yoMien:demo:loginCount",
  },
};

const getRedisConfig = () => ({
  url: process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN,
});

const redisCommand = async (command) => {
  const { url, token } = getRedisConfig();

  if (!url || !token) {
    return null;
  }

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(command),
  });

  if (!response.ok) {
    throw new Error(`Redis command failed: ${response.status}`);
  }

  return response.json();
};

const parseJson = (value) => {
  if (!value) return {};

  try {
    return JSON.parse(value);
  } catch {
    return {};
  }
};

export default async function handler(request, response) {
  const mode = request.query.mode === "demo" ? "demo" : "main";
  const keys = storageKeys[mode];

  try {
    if (!getRedisConfig().url || !getRedisConfig().token) {
      response.status(200).json({ configured: false });
      return;
    }

    if (request.method === "GET") {
      const daily = await redisCommand(["GET", keys.daily]);
      const monthly = await redisCommand(["GET", keys.monthly]);
      const loginCount =
        mode === "demo" ? await redisCommand(["GET", storageKeys.demo.loginCount]) : null;

      response.status(200).json({
        configured: true,
        dailyRecords: parseJson(daily?.result),
        monthlyRecords: parseJson(monthly?.result),
        demoLoginCount: Number(loginCount?.result || 0),
      });
      return;
    }

    if (request.method === "POST") {
      const body = request.body || {};

      if (body.action === "demo-login") {
        const count = await redisCommand(["INCR", storageKeys.demo.loginCount]);
        response.status(200).json({ configured: true, demoLoginCount: Number(count?.result || 0) });
        return;
      }

      await redisCommand(["SET", keys.daily, JSON.stringify(body.dailyRecords || {})]);
      await redisCommand(["SET", keys.monthly, JSON.stringify(body.monthlyRecords || {})]);
      response.status(200).json({ configured: true, saved: true });
      return;
    }

    response.setHeader("Allow", "GET, POST");
    response.status(405).json({ error: "Method not allowed" });
  } catch {
    response.status(500).json({ error: "Storage error" });
  }
}
