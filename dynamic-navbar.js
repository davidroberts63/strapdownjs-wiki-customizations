var navbarHtml=`
<div id="the-navbar" class="navbar navbar-fixed-top">
    <div class="navbar-inner">
        <div class="container">
            <div id="headline" class="brand"></div>
            <ul class="nav">
                <li class="dropdown">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown">Style<b class="caret"></b></a>
                    <ul class="dropdown-menu">
                        <li class="styleChoice"><a href="#">Amelia</a></li>
                        <li class="styleChoice"><a href="#">Cerulean</a></li>
                        <li class="styleChoice"><a href="#">Cyborg</a></li>
                        <li class="styleChoice"><a href="#">Journal</a></li>
                        <li class="styleChoice"><a href="#">Readable</a></li>
                        <li class="styleChoice"><a href="#">Simplex</a></li>
                        <li class="styleChoice"><a href="#">Slate</a></li>
                        <li class="styleChoice"><a href="#">Spacelab</a></li>
                        <li class="styleChoice"><a href="#">Spruce</a></li>
                        <li class="styleChoice"><a href="#">Superhero</a></li>
                        <li class="styleChoice"><a href="#">United</a></li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
</div>
`;

$("#the-navbar").html(navbarHtml);
$("#the-navbar #headline").html($("wikiName")[0].innerText);
$("wikiName")[0].remove();

(function() {

var locationParts = window.location.pathname.split("/");
var CURRENT_TITLE = $("title")[0].innerText;

$("#the-breadcrumb").append(
    locationParts
        .reduce(forLinkableParts, [])
        .map(toLinks)
        .map(toHtml)
);
    
function ofTheWikiRoot(value) {
    return value.indexOf("Wiki") > 0;
}

function indexUrlForPart(value) {
    return window.location.href.substring(0, window.location.href.indexOf(value) + value.length) + "/index.html";
}

function toHtml(current, index, theArray) {
    if(current.href == null) {
        return "<li class='active'>" + current.text + "</li>";
    } else {
        return "<li><a href='" + current.href + "'>" + current.text + "</a> <span class='divider'>/</span></li>";
    }
}

function toLinks(current, index, theArray) {
    var result = {};
    if(ofTheWikiRoot(current)) {
        result.text = "Home";
        result.href = indexUrlForPart(current);
    } else if(index == theArray.length - 1) {
        result.text = CURRENT_TITLE
        result.href = null 
    } else {
        result.text = current.replace("-", " ");
        result.href = indexUrlForPart(current);
    }
    
    return result;
}

function forLinkableParts(result, current, index, theArray) {
    if(index >= theArray.findIndex(ofTheWikiRoot) && current != "index.html") {
        result.push(current);
        return result;
    }
        
    return result;
}

})();

$(".styleChoice").click(function(e) {
    var styleName = e.target.innerText.trim().toLowerCase();
    $("link[rel='stylesheet']")[0].href = "http://strapdownjs.com/v/0.2/themes/" + styleName + ".min.css";
    localStorage.setItem("style", styleName);
});

setTimeout(function() {
    var styleName = localStorage.getItem("style") || "journal";
    console.log(styleName);
    $("link[rel='stylesheet']")[0].href = "http://strapdownjs.com/v/0.2/themes/" + styleName.toLowerCase() + ".min.css";
}, 1000);
