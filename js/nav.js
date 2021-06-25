document.addEventListener("DOMContentLoaded", function () {
  // Activate sidebar nav
  const elems = document.querySelectorAll(".sidenav");
  M.Sidenav.init(elems);
  loadNav();

  function loadNav() {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState === 4) {
        if (this.status !== 200) return;

        // Muat daftar tautan menu
        document.querySelectorAll(".topnav, .sidenav").forEach(function (elm) {
          elm.innerHTML = xhttp.responseText;
        });

        // daftarkan listener untuk tiap menu nav
        document.querySelectorAll(".sidenav a, .topnav a").forEach( function(elm) {
            elm.addEventListener("click", function(event) {

                // tutup sidenav
                const sidenav = document.querySelector(".sidenav");
                M.Sidenav.getInstance(sidenav).close();

                // muat kontent halaman yang dipanggil
                page = this.getAttribute("href").substr(1);
                loadPage(page);
            })
        })
      }
    };
    xhttp.open("GET", "nav.html", true);
    xhttp.send();
  }

  var page = window.location.hash.substr(1);
  if (page === "") page = "standings";
  loadPage(page);

  function loadPage(page) {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState === 4) {
        var content = document.querySelector("#body-content");

        if (page === "standings") {
          getStandings();
        } else if (page === "saved") {
          getSavedTeams();
        } else if (page === "teams") {
          getTeams();
        }

        if (this.status === 200) {
          content.innerHTML = xhttp.responseText;
        } else if (this.status === 404) {
          content.innerHTML = `<h3 class="center-align">404 Halaman tidak ditemukan.</h3>`;
        } else {
          content.innerHTML = `<h3 class="center-align">Terjadi error. Halaman tidak dapat diakses.</h3>`;
        }
      }
    };
    xhttp.open("GET", `pages/${page}.html`, true);
    xhttp.send();
  }
});
