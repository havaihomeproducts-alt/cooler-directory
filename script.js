const list = document.getElementById("list");
const search = document.getElementById("search");

let companies = [];

async function load() {
  const r = await fetch(API_URL);
  companies = await r.json();
  render(companies);
}

function render(data) {
  list.innerHTML = "";

  data.forEach(c => {

    list.innerHTML += `
      <div class="card">
        <h2>${c["Company Name"]}</h2>

        <div class="badge">
          ${c["Select your business category"] || ""}
        </div>

        <p><b>City:</b> ${c["City"] || ""}</p>

        <p><b>State:</b> ${c["State"] || ""}</p>

        <p><b>Contact:</b> ${c["Contact Person"] || ""}</p>

        <p><b>Mobile:</b> ${c["Mobile Number"] || ""}</p>

        <p><b>Email:</b> ${c["Email Address"] || ""}</p>

      </div>
    `;

  });
}

search.oninput = function () {

  const text = this.value.toLowerCase();

  render(
    companies.filter(c =>
      JSON.stringify(c).toLowerCase().includes(text)
    )
  );

};

load();
