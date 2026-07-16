const list = document.getElementById("list");
const search = document.getElementById("search");

let companies = [];

async function load() {
  try {
    const r = await fetch(API_URL);
    companies = await r.json();

    render(companies);
  } catch (e) {
    list.innerHTML = "<p>Error loading data.</p>";
    console.error(e);
  }
}

function render(data) {
  list.innerHTML = "";

  if (!data || data.length === 0) {
    list.innerHTML = "<p>No companies found.</p>";
    return;
  }

  data.forEach(c => {

    // Remove spaces from all column names
    const clean = {};
    Object.keys(c).forEach(key => {
      clean[key.trim()] = c[key];
    });

    list.innerHTML += `
      <div class="card">

        <h2>${clean["Company Name"] || ""}</h2>

        <div class="badge">
          ${clean["Select your business category"] || clean["Business Category"] || ""}
        </div>

        <p><b>City:</b> ${clean["City"] || clean["city"] || ""}</p>

        <p><b>State:</b> ${clean["State"] || clean["state"] || ""}</p>

        <p><b>Contact:</b> ${clean["Contact Person"] || ""}</p>

        <p><b>Mobile:</b> ${clean["Mobile Number"] || ""}</p>

        <p><b>Email:</b> ${clean["Email Address"] || ""}</p>

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
