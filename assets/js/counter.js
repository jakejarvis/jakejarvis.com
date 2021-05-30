(function () {
  // don't continue if there isn't a span#meta-hits element on this page
  var wrapper = document.getElementById("meta-hits");

  if (wrapper) {
    // deduce a consistent identifier for this page, no matter the URL
    var canonical = document.createElement("a");
    canonical.href = document.querySelector("link[rel='canonical']").href;

    // strip beginning and ending forward slash
    var slug = canonical.pathname.slice(1, -1);

    // this will return an error from the API anyways
    if (!slug || slug === "/") return;

    fetch("/api/hits?slug=" + slug)
      .then((response) => response.json())
      .then((data) => {
        // finally inject the hits
        var spinner = document.getElementById("hit-spinner");
        var counter = document.getElementById("hit-counter");

        // show the hits and hide the loading spinner
        spinner.style.display = "none";
        counter.appendChild(document.createTextNode(data.pretty_hits));
        wrapper.title = data.pretty_hits + " " + data.pretty_unit;
      })
      .catch((error) => {});
  }
})();
