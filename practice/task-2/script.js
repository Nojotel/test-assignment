document.addEventListener("DOMContentLoaded", function () {
  const loading = document.getElementById("loading");
  const errorDiv = document.getElementById("error");
  const table = document.getElementById("posts-table");
  const tableBody = document.querySelector("#posts-table tbody");

  fetch("https://jsonplaceholder.typicode.com/posts")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Сетевая ошибка: ответ не был успешным");
      }
      return response.json();
    })
    .then((posts) => {
      loading.style.display = "none";
      table.style.display = "table";

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
    .catch((error) => {
      loading.style.display = "none";
      errorDiv.style.display = "block";
      errorDiv.textContent = "Ошибка загрузки данных: " + error.message;
      console.error("Ошибка при загрузке постов:", error);
    });
});
