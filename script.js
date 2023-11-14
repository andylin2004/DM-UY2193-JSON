// this is where we have our blog rendered in
let blogContainer;

let posts = [
    {
        "posttitle": "My friend is renting a Tesla Model Y",
        "postcontent": "Is this a bruh moment? I know that my transit foamer friends are really disappointed in him right now",
        "date": "November 12, 2023",
        "image": "https://loremflickr.com/1920/1080/tesla+model+y",
        "tags": ["bruh", "moment"],
        "postid": "tesla"
    },
    {
        "posttitle": "I love Matty Healy",
        "postcontent": "This guy is like the perfect blend of chaoticness and artfulness. He is super based at what he's doing and cranks out some of the best music I've ever heard. Man's might be way too chaotic sometimes but he's great.",
        "date": "November 10, 2023",
        "image": "https://loremflickr.com/1920/1080/the+1975",
        "tags": ["the1975", "mattyhealy"],
        "postid": "mattyhealy"
    }
];

// wait for the page to actually load, then run everything inside here
document.addEventListener("DOMContentLoaded", function () {
    // partially via https://befused.com/javascript/get-filename-url/, but I found out via just using autocomplete that split and pop is a thing (python brain of mine)
    // we want to get the html page
    let page = window.location.pathname.split('/').pop();
    blogContainer = document.getElementById("blogcontainer");
    if (page == "index.html" || !page) {
        // via https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of, this will go through every single post indice as a post, no index number required
        // i blame curiosity for this unorthodox thing
        for (post of posts) {
            addPostPreview(post);
        }
    } else {
        let queryStr = window.location.search;
        let urlParams = new URLSearchParams(queryStr);
        if (page == "blog.html") {
            let id = urlParams.get("postid");
            for (post of posts) {
                if (post["postid"] == id) {
                    addPostPreview(post);
                    break;
                }
            }
        } else if (page == "tags.html") {
            let tag = urlParams.get("tag");
            let tagTxt = document.getElementById("tagtitle");
            tagTxt.innerText = "Posts with tag " + tag;
            for (post of posts) {
                if (post["tags"].includes(tag)) {
                    addPostPreview(post);
                }
            }
        }
    }
});

function addPostPreview(json) {
    let contentContainer = document.createElement("div");
    blogContainer.appendChild(contentContainer);
    
    let title = document.createElement("h1");
    let urlComponent = document.createElement("a");
    urlComponent.href = "blog.html?postid=" + json["postid"];
    urlComponent.innerText = json["posttitle"]
    title.appendChild(urlComponent);
    contentContainer.appendChild(title);
    
    let date = document.createElement("p");
    date.className = "date";
    date.innerText = json["date"];
    contentContainer.appendChild(date);
    contentContainer.appendChild(document.createElement("hr"));
    
    if (json["image"]) {
        let img = document.createElement("img");
        img.src = json["image"];
        contentContainer.appendChild(img);
    }
    
    let postBody = document.createElement("p");
    postBody.innerText = json["postcontent"];
    contentContainer.appendChild(postBody);
    
    let tags = document.createElement("p");
    tags.innerText = "Tags: ";
    contentContainer.appendChild(tags);
    
    for (tag of json["tags"]) {
        let tagElement = document.createElement("a");
        tagElement.href = "tags.html?tag=" + tag;
        tagElement.innerText = tag;
        tags.appendChild(tagElement);
        // via https://flexiple.com/javascript/get-last-array-element-javascript, you can use -1 in slice with an array to get the last element
        if (json["tags"].slice(-1) != tag) {
            // from poking around, append will append a string to the end of the current node situation if i'm wording this well
            tags.append(", ");
        }
    }
}