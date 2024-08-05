document.addEventListener("DOMContentLoaded", function () {
  fetch("https://jsonplaceholder.typicode.com/posts")
    .then((response) => response.json())
    .then((posts) => {
      const tableBody = document.querySelector("#posts-table tbody");
      posts.forEach((post) => {
        const row = document.createElement("tr");

        const idCell = document.createElement("td");
        idCell.textContent = post.id;
        row.appendChild(idCell);

        const titleCell = document.createElement("td");
        titleCell.textContent = post.title;
        row.appendChild(titleCell);

        const bodyCell = document.createElement("td");
        bodyCell.textContent = post.body;
        row.appendChild(bodyCell);

        tableBody.appendChild(row);
      });
    })
    .catch((error) => console.error("Error fetching posts:", error));
});

function sortTable(columnIndex) {
  const table = document.querySelector("#posts-table tbody");
  const rows = Array.from(table.rows);
  let sortOrder = table.dataset.sortOrder ? JSON.parse(table.dataset.sortOrder) : [true, true, true];

  rows.sort((a, b) => {
    const cellA = a.cells[columnIndex].textContent;
    const cellB = b.cells[columnIndex].textContent;

    if (columnIndex === 0) {
      return sortOrder[columnIndex] ? Number(cellA) - Number(cellB) : Number(cellB) - Number(cellA);
    } else {
      return sortOrder[columnIndex] ? cellA.localeCompare(cellB) : cellB.localeCompare(cellA);
    }
  });

  sortOrder[columnIndex] = !sortOrder[columnIndex];
  table.dataset.sortOrder = JSON.stringify(sortOrder);

  rows.forEach((row) => table.appendChild(row));
}

function filterTable() {
  const query = document.querySelector("#search").value.toLowerCase();
  const rows = document.querySelectorAll("#posts-table tbody tr");
  const isNumericQuery = /^\d+$/.test(query);

  if (!isNumericQuery && query.length < 3) {
    rows.forEach((row) => (row.style.display = ""));
    return;
  }

  rows.forEach((row) => {
    const cells = row.querySelectorAll("td");
    const rowText = Array.from(cells)
      .map((cell) => cell.textContent.toLowerCase())
      .join(" ");
    row.style.display = rowText.includes(query) ? "" : "none";
  });
}
