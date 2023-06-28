const userInformationHTML = (user) => {
    return `
        <h2 class="my-3">${user.name}
            <span>
                (@<a href="${user.html_url}" target="_blank">${user.login}</a>)
            </span>
        </h2>
        
        <div class="gh-content">
            <div class="gh-avatar my-2">
            <a href="${user.html_url}" target="_blank">
                <img src="${user.avatar_url}" width="80" height="80" alt="${user.name}'s avatar">
            </a>
            </div>
            <p class="text-center"><strong>Followers</strong> ${user.followers} | 
            <strong>Following</strong> ${user.following} |
            <strong>Repos:</strong> ${user.public_repos}</p>
        </div>`;
};

const reposInformationHTML = (repos) => {
    if (repos.length == 0) {
        return `<div class="clearfix repo-list">No repos to show!</div>`;
    }

    var listOfRepos = repos.map(function (repo) {
        return `<li>
                    <a href="${repo.html_url}" target="_blank">${repo.name}</a>
                </li>`;
    });

    return `<div class="clearfix repo-list">
                <p>
                    <strong>Repo list:</strong>
                </p>
                <ul>
                    ${listOfRepos.join("\n")}
                </ul>
            </div>`;
};

const fetchGitHubInformation = (event) => {
    var username = $('#gh-username').val();
    console.log(`The value is: ${username}`);
    if (!username) {
        $('#gh-repo-data').html('');
        $('#gh-user-data').html(`<h4 class="my-3">Search bar is empty!</h4>`);
        return; // stops the function before running the rest of the code in this scope
    }

    $('#gh-user-data').html(`<div id="loader" class="my-3"><img src="vendor/css/img/loader.gif" alt="loading"></div>`);

    $.when(
        $.getJSON(`https://api.github.com/users/${username}`), // firstPromise
        $.getJSON(`https://api.github.com/users/${username}/repos`) // secondPromise
    ).then(
        function (firstPromise, secondPromise) {
            var userData = firstPromise[0]; // needed if promises >= 2
            var reposData = secondPromise[0]; // needed if promises >= 2
            $('#gh-user-data').html(userInformationHTML(userData));
            $('#gh-repo-data').html(reposInformationHTML(reposData));
        }, function (errorResponse) {
            if (errorResponse.status === 404) {
                $('#gh-user-data').html(`<h2>No information found for ${username}</h2>`);
            } else {
                console.log(errorResponse);
                $('#gh-user-data').html(`<h2 class="my-3">Error: ${errorResponse.responseJSON.message}</h2>`);
            }
        }
    );
};

$(document).ready(fetchGitHubInformation);
