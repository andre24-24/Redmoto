// ==========================================================================
// СТВОРЕННЯ ПЛАТЕЖУ ЧЕРЕЗ LIQPAY
//
// Ця функція виконується на сервері (Vercel), а не в браузері користувача.
// Це важливо: підпис платежу генерується тут, щоб ніхто не міг підмінити
// суму замовлення на сторінці оплати.
//
// НАЛАШТУВАННЯ:
// 1. Зареєструйтесь як продавець на https://www.liqpay.ua (потрібен ФОП/ТОВ)
// 2. Отримайте Public key та Private key у кабінеті LiqPay
// 3. У Vercel: Settings → Environment Variables додайте:
//    LIQPAY_PUBLIC_KEY = ваш публічний ключ
//    LIQPAY_PRIVATE_KEY = ваш приватний ключ
// ==========================================================================

const crypto = require("crypto");

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const PUBLIC_KEY = process.env.LIQPAY_PUBLIC_KEY;
  const PRIVATE_KEY = process.env.LIQPAY_PRIVATE_KEY;

  if (!PUBLIC_KEY || !PRIVATE_KEY) {
    res.status(500).json({
      error: "LiqPay keys are not configured. Add LIQPAY_PUBLIC_KEY and LIQPAY_PRIVATE_KEY in Vercel environment variables."
    });
    return;
  }

  const order = req.body;

  if (!order || !order.total || !order.items || order.items.length === 0) {
    res.status(400).json({ error: "Invalid order" });
    return;
  }

  const orderId = "order_" + Date.now();
  const description = order.items.map((i) => `${i.name} x${i.qty}`).join(", ");

  const payload = {
    public_key: PUBLIC_KEY,
    version: "3",
    action: "pay",
    amount: order.total,
    currency: "UAH",
    description: description.slice(0, 500),
    order_id: orderId,
    result_url: `https://${req.headers.host}/success.html`,
    server_url: `https://${req.headers.host}/api/liqpay-callback`
  };

  const dataString = Buffer.from(JSON.stringify(payload)).toString("base64");
  const signString = PRIVATE_KEY + dataString + PRIVATE_KEY;
  const signature = crypto.createHash("sha1").update(signString).digest("base64");

  const checkoutUrl =
    "https://www.liqpay.ua/api/3/checkout?data=" +
    encodeURIComponent(dataString) +
    "&signature=" +
    encodeURIComponent(signature);

  res.status(200).json({ checkoutUrl, orderId });
};
