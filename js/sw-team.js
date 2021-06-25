if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then(function () {
        console.log("Pendaftaran ServiceWorker berhasil");
      })
      .catch(function () {
        console.log("Pendaftaran ServiceWorker gagal");
      });

    requestPermission();
  });
} else {
  console.log("ServiceWorker belum didukung browser ini.");
}

function requestPermission() {
  if ("Notification" in window) {
    Notification.requestPermission().then(result => {
      if (result === "denied") {
        console.log("Fitur notifikasi tidak diijinkan.");
        return;
      } else if (result === "default") {
        console.error("Pengguna menutup kotak dialog permintaan ijin.");
        return;
      }

      navigator.serviceWorker.ready.then(() => {
        if ("PushManager" in window) {
          navigator.serviceWorker
            .getRegistration()
            .then(registration => {
              registration.pushManager
                .subscribe({
                  userVisibleOnly: true,
                  applicationServerKey: urlBase64ToUint8Array(
                    "BAkPXr4ceHRMW0k6yeZQKc72naZPLxO9DJQng9dMriPzSDlzh0xYbM6jV7IWQmwEbNeaDNiDQsOmV04VEE6QrqI"
                  ),
                })
                .then(subscribe => {
                  console.log(
                    "Berhasil melakukan subscribe dengan endpoint",
                    subscribe.endpoint
                  );

                  console.log(
                    "Berhasil melakukan subscribe dengan p256dh key: ",
                    btoa(
                      String.fromCharCode.apply(
                        null,
                        new Uint8Array(subscribe.getKey("p256dh"))
                      )
                    )
                  );

                  console.log(
                    "Berhasil melakukan subscribe dengan auth key: ",
                    btoa(
                      String.fromCharCode.apply(
                        null,
                        new Uint8Array(subscribe.getKey("auth"))
                      )
                    )
                  );
                });
            })
            .catch(function (e) {
              console.error("tidak dapat melakukan subscribe", e.message);
            });
        }
      });

    });
  }
}

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, "+")
    .replace(/_/g, "/");
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; i++) {
    outputArray[i] = rawData.charCodeAt(i);
  }

  return outputArray;
}

document.addEventListener("DOMContentLoaded", function () {
  var urlParams = new URLSearchParams(window.location.search);
  var isFromSaved = urlParams.get("saved");
  var id = urlParams.get("id");
  var btnSave = document.getElementById("save");
  if (isFromSaved) {
    btnSave.innerHTML = `<i class="large material-icons">delete</i>`;

    getSavedTeamById();

    btnSave.onclick = function () {
      console.log("FAB Button clicked.");
      M.toast({ html: "Success to delete favorite team" });
      deleteSavedTeamById(id);
      window.location.replace('/#saved');
    };
  } else {
    var item = getTeamById();

    btnSave.onclick = function () {
      console.log("FAB Button clicked.");
      M.toast({ html: "Success to save favorite team" });
      item.then(function (team) {
        saveForLater(team);
        btnSave.display = "none";
        window.location.replace(`/team.html?id=${id}&saved=true`);
      });
    };
  }
});
