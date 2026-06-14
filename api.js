const API_URL = "SEU_ENDPOINT";

async function api(action, payload = {}) {
  const res = await fetch(API_URL, {
    method: "POST",
    body: JSON.stringify({ action, ...payload })
  });

  return res.json();
}
