var dbPromised = idb.open("football-app", 2, function (upgradeDb) {
  var teamsObjectStore = upgradeDb.createObjectStore("teams", {
    keyPath: "id",
  });
  teamsObjectStore.createIndex("name", "name", {
    unique: false,
  });
});

// fungsi save
function saveForLater(team) {
  dbPromised
    .then(function (db) {
      var tx = db.transaction("teams", "readwrite");
      var store = tx.objectStore("teams");
      console.log(team);
      store.put(team);
      return tx.complete;
    })
    .then(function () {
      console.log("Team berhasil di simpan.");
    });
}

function deleteSavedTeamById(id) {
  dbPromised
    .then(function (db) {
      id = parseInt(id);
      var tx = db.transaction("teams", "readwrite");
      var store = tx.objectStore("teams");
      console.log(id);
      store.delete(id);
      return tx.complete;
    })
    .then(function () {
      console.log("Team berhasil di hapus.");
    });
}

function getAll() {
  return new Promise(function (resolve, reject) {
    dbPromised
      .then(function (db) {
        var tx = db.transaction("teams", "readonly");
        var store = tx.objectStore("teams");
        return store.getAll();
      })
      .then(function (teams) {
        resolve(teams);
      });
  });
}
