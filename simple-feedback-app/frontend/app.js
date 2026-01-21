const API = "http://localhost:3000/api/feedback";
const list = document.getElementById("list");

console.log("[Frontend] App loaded");

function submitFeedback() {
  const name = document.getElementById("name").value;
  const message = document.getElementById("message").value;

  console.log("[Frontend] Submitting feedback:", { name, message });

  fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, message }),
  })
    .then(res => {
      console.log("[Frontend] POST response status:", res.status);
      return res.json();
    })
    .then(() => loadFeedback())
    .catch(err => {
      console.error("[Frontend] Backend unreachable", err);
      alert("Backend unreachable");
    });
}

function loadFeedback() {
  console.log("[Frontend] Loading feedback");

  fetch(API)
    .then(res => res.json())
    .then(data => {
      console.log("[Frontend] Feedback received:", data);
      list.innerHTML = "";

      data.forEach(item => {
        const li = document.createElement("li");
        li.innerHTML = `
          <b>${item.name}</b>: ${item.message}
          <button onclick="deleteFeedback(${item.id})">Delete</button>
        `;
        list.appendChild(li);
      });
    });
}

function deleteFeedback(id) {
  console.log("[Frontend] Deleting feedback id:", id);

  fetch(`${API}/${id}`, { method: "DELETE" })
    .then(() => loadFeedback());
}

loadFeedback();
