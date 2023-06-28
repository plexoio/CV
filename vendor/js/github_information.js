function userInformationHTML(user) {
    return `
        <h2 class="my-3">${user.name}
            <span class="small-name">
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
        </div>`
}
const fetchGitHubInformation = (event) => {
    var username = $('#gh-username').val();
    if (!username) {
        $('#gh-user-data').html(`<h4 class="my-3">No usernameis empty!</h4>`);
        return; // stops the function before running the rest of the code in this scope
    }

    $('#gh-user-data').html(`<div id="loader" class="my-3"><img src="vendor/css/img/loader.gif" alt="loading"></div>`)

    $.when(
        $.getJSON(`https://api.github.com/users/${username}`)
    ).then(
        function (response) {
            var userData = response;
            $('#gh-user-data').html(userInformationHTML(userData));
        }, function (errorResponse) {
            if (errorResponse.status === 404) {
                $('#gh-user-data').html(`<h2>No information found for ${username}</h2>`);
            } else {
                console.log(errorResponse);
                $('#gh-user-data').html(`<h2>Error: ${errorResponse.responseJSON.message}</h2>`);
            }
        }
    )
};

