var searchInput = document.getElementById("searchInput");
searchInput.value = "";
var query = new URLSearchParams(window.location.search);

if (query.has("q")) {
    searchInput.value = query.get("q");
    input();
}
searchInput.addEventListener('input', input);


function input() {
    var url = new URL(window.location.href);
    url.searchParams.set("q", searchInput.value);
    window.history.pushState({}, '', url);

    var filter = normalize(searchInput.value);
    var items = document.querySelectorAll('.romList li');
    var validDeterminers = [];
    Array.from(items).forEach(function (item) {
        if (item.classList.contains('determiner')) return;
        var parentli = item.closest(".determiner");
        var fullText = (parentli) ? parentli.getAttribute("data-determiner") : "";
        var secondText = item.textContent;
        var text = fullText + secondText;
        text = normalize(text);
        if (text.indexOf(filter) > -1) {
            item.classList.remove('hidden');
            if (parentli) {
                parentli.classList.remove('hidden');
                validDeterminers.push(parentli);
            }
        } else {
            item.classList.add('hidden');
            if (parentli && validDeterminers.indexOf(parentli) == -1) {
                parentli.classList.add('hidden');
            }
        }
    });
}
function normalize(string) {
    string = string.toLowerCase();
    string = string.replace(/[^a-z0-9]/g, "");
    string = string.replace(/\s/g, "");
    return string;
}