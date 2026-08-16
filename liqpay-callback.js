// ==========================================================================
// СЕРВЕРНИЙ CALLBACK ВІД LIQPAY
//
// LiqPay надсилає сюди підтвердження після завершення оплати.
// Наразі функція лише перевіряє підпис і повертає 200 OK — цього достатньо,
// щоб LiqPay не повторював запит.
//
// ВАЖЛИВО — НАСТУПНИЙ КРОК:
// Тут немає бази даних, тому інформація про оплачені замовлення поки що
// НІКУДИ не зберігається і не приходить вам сповіщенням. Щоб отримувати
// сповіщення про нові оплачені замовлення, найпростіше додати відправку
// повідомлення в Telegram-бот або на email прямо в цій функції
// (звертайтесь, якщо потрібна допомога з цим кроком).
// ==========================================================================

const crypto = require("crypto");

module.exports = async (req, res) => {
  const PRIVATE_KEY = process.env.LIQPAY_PRIVATE_KEY;
  const { data, signature } = req.body || {};

  if (!data || !signature || !PRIVATE_KEY) {
    res.status(400).end();
    return;
  }

  const expectedSignature = crypto
    .createHash("sha1")
    .update(PRIVATE_KEY + data + PRIVATE_KEY)
    .digest("base64");

  if (expectedSignature !== signature) {
    res.status(400).json({ error: "Invalid signature" });
    return;
  }

  const decoded = JSON.parse(Buffer.from(data, "base64").toString("utf-8"));
  console.log("LiqPay payment status:", decoded.status, decoded.order_id);

  // TODO: тут додати збереження замовлення / надсилання сповіщення

  res.status(200).end();
};
