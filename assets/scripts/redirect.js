function redirectTo(url) {
    window.location.href = url;
}

function redirectToSubdomain(subdomain) {
    var protocol = window.location.protocol;
    var path = window.location.pathname;

    var newUrl = protocol + '//' + subdomain + '.ccaa.info' + path;

    window.location.href = newUrl;
}