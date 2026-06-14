let planilhaAtual = "Planilha1";
let editId = null;

async function loadPage(planilha) {
  planilhaAtual = planilha;
  document.getElementById("titulo").innerText = planilha;

  const res = await api("read", { planilha });

  if (res.success) render(res.data);
}
