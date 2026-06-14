const UI = {

  render(data) {
    Store.dados = data;

    const thead = document.getElementById("thead");
    const tbody = document.getElementById("tbody");

    thead.innerHTML = `<tr>
      ${data[0].slice(1).map(h => `<th>${h}</th>`).join("")}
      <th>Ações</th>
    </tr>`;

    tbody.innerHTML = "";

    data.slice(1).forEach(row => {
      const tr = document.createElement("tr");

      tr.innerHTML = `
        ${row.slice(1).map(d => `<td>${d}</td>`).join("")}
        <td>
          <button onclick="UI.edit('${row[0]}')">✏️</button>
          <button onclick="UI.remove('${row[0]}')">🗑</button>
        </td>
      `;
      tbody.appendChild(tr);
    });
  },

  openForm(data = null) {
    document.getElementById("modal").classList.remove("hidden");
    document.getElementById("formTitle").innerText = data ? "Editar" : "Novo";

    Store.editId = data?.id || null;

    const form = document.getElementById("formFields");

    form.innerHTML = `
      <input id="data" type="date">
      <input id="hora" type="time">
      <input id="passageiro" placeholder="Passageiro">
      <input id="setor" placeholder="Setor">
      <input id="motivo" placeholder="Motivo">
      <input id="itinerario" placeholder="Itinerário">
      <input id="status" placeholder="Status">
    `;
  },

  closeForm() {
    document.getElementById("modal").classList.add("hidden");
  },

  async save() {
    const valores = [
      formatar(document.getElementById("data").value),
      document.getElementById("hora").value,
      document.getElementById("passageiro").value,
      document.getElementById("setor").value,
      document.getElementById("motivo").value,
      document.getElementById("itinerario").value,
      document.getElementById("status").value
    ];

    if (!valores[0]) {
      UI.toast("Data obrigatória", true);
      return;
    }

    const action = Store.editId ? "update" : "create";

    const res = await API.send(action, {
      planilha: Store.planilha,
      id: Store.editId,
      valores
    });

    if (res.success) {
      UI.toast("Salvo com sucesso");
      App.load(Store.planilha);
      UI.closeForm();
    } else {
      UI.toast("Erro ao salvar", true);
    }
  },

  async remove(id) {
    await API.send("delete", {
      planilha: Store.planilha,
      id
    });

    UI.toast("Removido");
    App.load(Store.planilha);
  },

  toast(msg, isError = false) {
    const t = document.createElement("div");
    t.className = `toast ${isError ? "error" : ""}`;
    t.innerText = msg;

    document.getElementById("toast").appendChild(t);

    setTimeout(() => t.remove(), 3000);
  }
};
