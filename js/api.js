var url = "http://api.football-data.org/v2/";
var base_url = url.replace(/^http:\/\//i, 'https://');

function status(response) {
  if (response.status !== 200) {
    console.log("Error : " + response.status);
    return Promise.reject(new Error(response.statusText));
  } else {
    return Promise.resolve(response);
  }
}
function json(response) {
  return response.json();
}
function error(error) {
  //console.log("Error : " + error);
}

function getStandings(id_liga = "2019") {
  if ("caches" in window) {
    caches
      .match(base_url + `competitions/${id_liga}/standings`)
      .then(response => {
        if (response) {
          response.json().then(data => {
            var standingsHTML = "";
            data.standings[0].table.forEach(standing => {
              standingsHTML += `
                  <div class="col s12 card">
                    <a href="./team.html?id=${standing.team.id}">
                    <div class="row card-content">
                      <div class="col s2 center-align">
                        <img src="${standing.team.crestUrl.replace(/^http:\/\//i, 'https://')}" height="50" class="" alt="img-${standing.team.name}"/>
                      </div>
                      <div class="col s4">
                        <span class="black-text truncate">${standing.team.name}</span>
                        <p>Position: ${standing.position}</p>
                      </div>
                      <div class="col s6 right-align">
                        <div class="col s3 center-align">
                            <p class="black-text">W</p>
                            <p class="black-text">${standing.won}</p>
                        </div>
                        <div class="col s3 center-align">
                            <p class="black-text">D</p>
                            <p class="black-text">${standing.draw}</p>
                        </div>
                        <div class="col s3 center-align">
                            <p class="black-text">L</p>
                            <p class="black-text">${standing.lost}</p>
                        </div>
                        <div class="col s3 center-align">
                            <p class="black-text">PTS</p>
                            <p class="black-text">${standing.points}</p>
                        </div>
                      </div>
                    </div>
                    </a>
                  </div>
                `;
            });
            document.getElementById("standings").innerHTML = standingsHTML;
          })
          .catch(error);
        }
      })
      .catch(error);
  }

  fetch(base_url + `competitions/${id_liga}/standings`, {
    headers: {
      "X-Auth-Token": "0acbfd337c504659ac0a11a448212ebd",
    },
  })
    .then(status)
    .then(json)
    .then(data => {
      var standingsHTML = "";
      data.standings[0].table.forEach(standing => {
        standingsHTML += `
                  <div class="col s12 card">
                    <a href="./team.html?id=${standing.team.id}">
                    <div class="row card-content">
                      <div class="col s2 center-align">
                        <img src="${standing.team.crestUrl.replace(/^http:\/\//i, 'https://')}" height="50" class="" alt="img-${standing.team.name}"/>
                      </div>
                      <div class="col s4">
                        <span class="black-text truncate">${standing.team.name}</span>
                        <p>Position: ${standing.position}</p>
                      </div>
                      <div class="col s6 right-align">
                        <div class="col s3 center-align">
                            <p class="black-text">W</p>
                            <p class="black-text">${standing.won}</p>
                        </div>
                        <div class="col s3 center-align">
                            <p class="black-text">D</p>
                            <p class="black-text">${standing.draw}</p>
                        </div>
                        <div class="col s3 center-align">
                            <p class="black-text">L</p>
                            <p class="black-text">${standing.lost}</p>
                        </div>
                        <div class="col s3 center-align">
                            <p class="black-text">PTS</p>
                            <p class="black-text">${standing.points}</p>
                        </div>
                      </div>
                    </div>
                    </a>
                  </div>
                `;
      });
      document.getElementById("standings").innerHTML = standingsHTML;
    })
    .catch(error);
}

function getTeams(id_liga = "2019") {
  if ("caches" in window) {
    caches
      .match(base_url + `competitions/${id_liga}/teams`)
      .then(function (response) {
        if (response) {
          response.json().then(data => {
            var teamsHTML = "";
            data.teams.forEach(team => {
              teamsHTML += `
                  <div class="col s12 card">
                    <a href="./team.html?id=${team.id}">
                    <div class="row card-content">
                      <div class="col s2 center-align">
                        <img src="${team.crestUrl.replace(/^http:\/\//i, 'https://')}" height="50" class=""alt="img-${team.name}"/>
                      </div>
                      <div class="col s4 offset-s1">
                        <span class="black-text truncate">${team.name}</span>
                        <p class=blue-text">${team.area.name}</p>
                      </div>
                    </div>
                    </a>
                  </div>
                `;
            });
            document.getElementById("teams").innerHTML = teamsHTML;
          })
          .catch(error);
        }
      })
      .catch(error);
  }

  fetch(base_url + `competitions/${id_liga}/teams`, {
    headers: {
      "X-Auth-Token": "0acbfd337c504659ac0a11a448212ebd",
    },
  })
    .then(status)
    .then(json)
    .then(data => {
      var teamsHTML = "";
      data.teams.forEach(team => {
        teamsHTML += `
                  <div class="col s12 card">
                    <a href="./team.html?id=${team.id}">
                    <div class="row card-content">
                      <div class="col s2 center-align">
                        <img src="${team.crestUrl.replace(/^http:\/\//i, 'https://')}" height="50" class=""alt="img-${team.name}"/>
                      </div>
                      <div class="col s4 offset-s1">
                        <span class="black-text truncate">${team.name}</span>
                        <p class="blue-text">${team.area.name}</p>
                      </div>
                    </div>
                    </a>
                  </div>
                `;
      });
      document.getElementById("teams").innerHTML = teamsHTML;
    })
    .catch(error);
}

function getTeamById() {
  return new Promise(function (resolve, reject) {
    var urlParams = new URLSearchParams(window.location.search);
    var idParam = urlParams.get("id");
    if ("caches" in window) {
      caches.match(base_url + "teams/" + idParam).then(response => {
        if (response) {
          response.json().then(data => {
            console.log(data);
            var teamHTML = `
            <h4 class="center">${data.name}</h4>
            <br/>
            <div class="col s6 offset-s3 center">
              <img src="${data.crestUrl.replace(/^http:\/\//i, 'https://')}" height="300"alt="img-${data.name}"/>
            </div>
            <br>
            <h6>Details</h6>
            <ul>
              <li>
                <i class="material-icons grey-text">public</i>
                <span class="right blue-text truncate">${data.website}</span>
              </li>
              <li>
                <i class="material-icons grey-text">phone</i>
                <span class="right blue-text truncate">${data.phone}</span>
              </li>
              <li>
                <i class="material-icons grey-text">email</i>
                <span class="right blue-text truncate">${data.email}</span>
              </li>
              <li>
                <i class="material-icons grey-text">map</i>
                <span class="right blue-text truncate">${data.address}</span>
              </li>
              <li>
                <i class="material-icons grey-text">place</i>
                <span class="right blue-text truncate">${data.venue}</span>
              </li>
            </ul>
            <br>
            <h6>Squad</h6>
            <ul>
          `;
            var no = 1;
            data.squad.forEach(squad => {
              teamHTML += `
            <li>
            <span class="black-text truncate">${no++}. ${squad.name} (${
                squad.position
              }) <i class="material-icons secondary-content grey-text">person</i></span>
            </li>
            `;
            });

            teamHTML += `
            </ul>
          `;

            document.getElementById("body-content").innerHTML = teamHTML;
            resolve(data);
          })
          .catch(error);
        }
      })
      .catch(error);
    }

    fetch(base_url + "teams/" + idParam, {
      headers: {
        "X-Auth-Token": "0acbfd337c504659ac0a11a448212ebd",
      },
    })
      .then(status)
      .then(json)
      .then(data => {
        console.log(data);
        var teamHTML = `
            <h4 class="center">${data.name}</h4>
            <br/>
            <div class="col s6 offset-s3 center">
              <img src="${data.crestUrl.replace(/^http:\/\//i, 'https://')}" height="300"alt="img-${data.name}"/>
            </div>
            <br>
            <h6>Details</h6>
            <ul>
              <li>
                <i class="material-icons grey-text">public</i>
                <span class="right blue-text truncate">${data.website}</span>
              </li>
              <li>
                <i class="material-icons grey-text">phone</i>
                <span class="right blue-text truncate">${data.phone}</span>
              </li>
              <li>
                <i class="material-icons grey-text">email</i>
                <span class="right blue-text truncate">${data.email}</span>
              </li>
              <li>
                <i class="material-icons grey-text">map</i>
                <span class="right blue-text truncate">${data.address}</span>
              </li>
              <li>
                <i class="material-icons grey-text">place</i>
                <span class="right blue-text truncate">${data.venue}</span>
              </li>
            </ul>
            <br>
            <h6>Squad</h6>
            <ul>
          `;
        var no = 1;
        data.squad.forEach(squad => {
          teamHTML += `
            <li>
            <span class="black-text truncate">${no++}. ${squad.name} (${
            squad.position
          }) <i class="material-icons secondary-content grey-text">person</i></span>
            </li>
            `;
        });

        teamHTML += `
            </ul>
          `;

        document.getElementById("body-content").innerHTML = teamHTML;
        resolve(data);
      })
      .catch(error);
  });
}

function getSavedTeams() {
  getAll().then(teams => {
    console.log(teams);
    var teamsHTML = "";
    teams.forEach(team => {
      teamsHTML += `
        <div class="col s12 card">
          <a href="./team.html?id=${team.id}&saved=true">
          <div class="row card-content">
            <div class="col s2 center-align">
              <img src="${team.crestUrl.replace(/^http:\/\//i, 'https://')}" height="50" class=""alt="img-${team.name}"/>
            </div>
            <div class="col s4 offset-s1">
              <span class="black-text truncate">${team.name}</span>
              <p class="blue-text">${team.area.name}</p>
            </div>
          </div>
          </a>
        </div>
      `;
    });
    document.getElementById("saved").innerHTML = teamsHTML;
  })
  .catch(error);
}

function getSavedTeamById() {
  var urlParams = new URLSearchParams(window.location.search);
  var idParam = urlParams.get("id");

  getById(idParam).then(team => {
    console.log(team);
    teamHTML = "";
    var teamHTML = `
            <h4 class="center">${team.name}</h4>
            <br/>
            <div class="col s6 offset-s3 center">
              <img src="${team.crestUrl.replace(/^http:\/\//i, 'https://')}" height="300"alt="img-${team.name}"/>
            </div>
            <br>
            <h6>Details</h6>
            <ul>
              <li>
                <i class="material-icons grey-text">public</i>
                <span class="right blue-text truncate">${team.website}</span>
              </li>
              <li>
                <i class="material-icons grey-text">phone</i>
                <span class="right blue-text truncate">${team.phone}</span>
              </li>
              <li>
                <i class="material-icons grey-text">email</i>
                <span class="right blue-text truncate">${team.email}</span>
              </li>
              <li>
                <i class="material-icons grey-text">map</i>
                <span class="right blue-text truncate">${team.address}</span>
              </li>
              <li>
                <i class="material-icons grey-text">place</i>
                <span class="right blue-text truncate">${team.venue}</span>
              </li>
            </ul>
            <br>
            <h6>Squad</h6>
            <ul>
          `;
    var no = 1;
    team.squad.forEach(squad => {
      teamHTML += `
            <li>
            <span class="black-text truncate">${no++}. ${squad.name} (${
        squad.position
      }) <i class="material-icons secondary-content grey-text">person</i></span>
            </li>
            `;
    });

    teamHTML += `
            </ul>
          `;
    document.getElementById("body-content").innerHTML = teamHTML;
  })
  .catch(error);
}

function getById(id) {
  id = parseInt(id);

  return new Promise(function (resolve, reject) {
    dbPromised
      .then(db => {
        var tx = db.transaction("teams", "readonly");
        var store = tx.objectStore("teams");
        return store.get(id);
      })
      .then(team => {
        resolve(team);
      })
      .catch(error => {
        console.log(error);
        reject(team);
      });
  });
}
