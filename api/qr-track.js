import crypto from "node:crypto";

const getRedisConfig = () => ({
  url: process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN,
});

const redisCommand = async (command) => {
  const { url, token } = getRedisConfig();

  if (!url || !token) return null;

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

const todayKey = () => new Date().toISOString().slice(0, 10);

const getClientIp = (request) => {
  const forwarded = request.headers["x-forwarded-for"];
  const candidate = Array.isArray(forwarded) ? forwarded[0] : forwarded;
  return (
    request.headers["cf-connecting-ip"] ||
    request.headers["x-real-ip"] ||
    candidate?.split(",")[0]?.trim() ||
    "unknown"
  );
};

const hashIp = (ip) => crypto.createHash("sha256").update(ip).digest("hex").slice(0, 16);

const maskIp = (ip) => {
  if (ip === "unknown") return ip;
  if (ip.includes(":")) return `${ip.split(":").slice(0, 3).join(":")}:***`;
  const parts = ip.split(".");
  return parts.length === 4 ? `${parts[0]}.${parts[1]}.${parts[2]}.***` : "masked";
};

export default async function handler(request, response) {
  const configured = Boolean(getRedisConfig().url && getRedisConfig().token);

  if (!configured) {
    response.status(200).json({ configured: false });
    return;
  }

  try {
    const day = todayKey();

    if (request.method === "GET") {
      const [total, today, uniqueAll, uniqueToday] = await Promise.all([
        redisCommand(["GET", "yoMien:qr:visits:total"]),
        redisCommand(["GET", `yoMien:qr:visits:${day}`]),
        redisCommand(["SCARD", "yoMien:qr:ips:all"]),
        redisCommand(["SCARD", `yoMien:qr:ips:${day}`]),
      ]);

      response.status(200).json({
        configured: true,
        totalVisits: Number(total?.result || 0),
        todayVisits: Number(today?.result || 0),
        uniqueIps: Number(uniqueAll?.result || 0),
        todayUniqueIps: Number(uniqueToday?.result || 0),
      });
      return;
    }

    if (request.method === "POST") {
      const ip = getClientIp(request);
      const ipHash = hashIp(ip);
      const page = request.body?.page || "qr";
      const userAgent = String(request.headers["user-agent"] || "").slice(0, 180);
      const visit = {
        at: new Date().toISOString(),
        page,
        ipHash,
        ipPreview: maskIp(ip),
        userAgent,
      };

      await Promise.all([
        redisCommand(["INCR", "yoMien:qr:visits:total"]),
        redisCommand(["INCR", `yoMien:qr:visits:${day}`]),
        redisCommand(["SADD", "yoMien:qr:ips:all", ipHash]),
        redisCommand(["SADD", `yoMien:qr:ips:${day}`, ipHash]),
        redisCommand(["HINCRBY", "yoMien:qr:ipCounts", ipHash, 1]),
        redisCommand(["LPUSH", "yoMien:qr:recent", JSON.stringify(visit)]),
        redisCommand(["LTRIM", "yoMien:qr:recent", 0, 199]),
      ]);

      response.status(200).json({ configured: true, saved: true });
      return;
    }

    response.setHeader("Allow", "GET, POST");
    response.status(405).json({ error: "Method not allowed" });
  } catch {
    response.status(500).json({ error: "QR tracking error" });
  }
}
