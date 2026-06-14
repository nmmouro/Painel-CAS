const API_URL = "https://script.google.com/macros/s/AKfycbz67LG_8h-EWJs6t132FnT5ask5dE12nFiZECdxEjYig21-hH_L5tXTB_uX1o4WeOjgFw/exec";

const API = {
  async send(action, data = {}) {
    const res = await fetch(API_URL, {
      method: "POST",
      body: JSON.stringify({ action, ...data })
    });
    return res.json();
  }
};
