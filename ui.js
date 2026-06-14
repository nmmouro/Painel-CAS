function render(data) {
  const thead = document.getElementById("thead");
  const tbody = document.getElementById("tbody");

  thead.innerHTML = "";
  tbody.innerHTML = "";

  const headers = data[0];

  thead.innerHTML = `<tr>${headers.map(h => `<th>${h}</th>`).join("")}<th>Ações</th></tr>`;

  data.slice(1).forEach(row => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      ${row.slice(1).map(d => `<td>${d}</td>`).join("")}
      <td>
        <button onclick="editar('${row[0]}')">✏️</button>
        <button onclick="remover('${row[0]}')">🗑</button>
      </td>
    `;

    tbody.appendChild(tr);
  });
}
