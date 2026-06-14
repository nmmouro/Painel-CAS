const API_URL = "SEU_ENDPOINT";

const API = {
  async send(action, data = {}) {
    const res = await fetch(API_URL, {
      method: "POST",
      body: JSON.stringify({ action, ...data })
    });
    return res.json();
  }
};
