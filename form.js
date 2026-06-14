function abrirForm(dados = null) {
  document.getElementById("modal").style.display = "flex";
  document.getElementById("formTitle").innerText = dados ? "Editar" : "Novo";

  if (dados) {
    editId = dados.id;
  } else {
    editId = null;
  }
}

function fecharForm() {
  document.getElementById("modal").style.display = "none";
}

async function salvar() {
  const valores = [
    formatar(document.getElementById("data").value),
    document.getElementById("hora").value,
    document.getElementById("passageiro").value,
    document.getElementById("setor").value,
    document.getElementById("motivo").value,
    document.getElementById("itinerario").value,
    document.getElementById("status").value
  ];

  // validação
  if (!valores[0] || !valores[2]) {
    alert("Preencha data e passageiro!");
    return;
  }

  if (editId) {
    await api("update", { planilha: planilhaAtual, id: editId, valores });
  } else {
    await api("create", { planilha: planilhaAtual, valores });
  }

  fecharForm();
  loadPage(planilhaAtual);
}
