class registration {
  constructor() {
    this.clientid = "ce826796e677f40a3d8a";
    this.secret = "2a71485cfe4aa3fcdc31b79e6ec1565e3bdad9a7";
    this.repos_sort = 'created: asc';
  }
}

document.getElementById("user").addEventListener("keyup", getUser);

//fetch user details
async function getUser(e) {
  // console.log(e.target.value)
  if (e.target.value != "") {
    const profileData = await fetch(
      `https://api.github.com/users/${e.target.value}?client_id=${this.client_id}&client_secret=${this.client_secret}`
    );

    //fetch repository
    const repos = await fetch(
      `https://api.github.com/users/${e.target.value}/repos?per_page=${5}&sort=${this.repos_sort}&client_id=${this.client_id}&client_secret=${this.client_secret}`
    );

    const data = await profileData.json();
    const repdata = await repos.json();



    //displaying the users detail in DOM
    document.getElementById('inf').innerHTML = `<div class="panel panel-default">
<div class="panel-heading">
<h3 class="panel-title">${data.name}</h3>
</div>

<div class="panel-body">
<div class="row">
<div class="col-md-3">
<img style="width:100%" class="thumbnail" src="${data.avatar_url}">
<a target="_blank" class="btn btn-primary btn-block" href="${data.html_url}">View profile</a>
</div>
<div class="col-md-9">
<span class="badge badge-primary">Public Repos: ${data.public_repos}</span>
<span class="badge badge-secondary">Public Gists: ${data.public_gists}</span>
<span class="badge badge-success">Followers: ${data.followers}</span>
<span class="badge badge-info">Following: ${data.following}</span>


<ul class="list-group">
<li class="list-group-item">Company:${data.company}</li>
<li class="list-group-item">Website:${data.blog}</li>
<li class="list-group-item">Location:${data.location}</li>
<li class="list-group-item">Membersince:${data.created_at}</li>
</ul>
</div>
<div class="col-md-9">
`;


    //displaying repository datas
    console.log(repdata)

    let output = `<h2 class="page-heading m-3">Latest Repository</h2>
        `;

    repdata.forEach(function (repos) {
      output += `
          <div class="card card-body mb-2">
            <div class="row">
              <div class="col-md-6">
                <a href="${repos.html_url}" target="_blank">${repos.name}</a>
              </div>
              <div class="col-md-6">
              <span class="badge badge-primary">Stars: ${repos.stargazers_count}</span>
              <span class="badge badge-secondary">Watchers: ${repos.watchers_count}</span>
              <span class="badge badge-success">Forks: ${repos.fork}</span>
              </div>
            </div>
          </div>
         
        `;
    });
    document.getElementById("output").innerHTML = `${output}</ul>`;
  } else {
    document.getElementById('inf').innerHTML = "";
    document.getElementById('output').innerHTML = "";
  }
};
