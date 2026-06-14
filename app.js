const App = {

  async load(planilha) {
    Store.planilha = planilha;
    document.getElementById("titulo").innerText = planilha;

    const res = await API.send("read", { planilha });

    if (res.success) UI.render(res.data);
  },

  async filtrar() {
    const data = document.getElementById("fData").value;
    const tipo = document.getElementById("fTipo").value;

    const res = await API.send("read", { planilha: tipo });

    if (!res.success) return;

    const filtrado = res.data.filter((r, i) =>
      i === 0 || !data || r[1] === formatar(data)
    );

    UI.render(filtrado);
  }

};

window.onload = () => App.load("Planilha1");

function formatar(data) {
  if (!data) return "";
  const [y,m,d] = data.split("-");
  return `${d}/${m}/${y}`;
}
