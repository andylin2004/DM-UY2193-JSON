// this is where we have our blog rendered in
let blogContainer;

// posts that we have
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
        "image": "https://loremflickr.com/1920/1080/matty+healy",
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
    // load all blog posts if index page
    if (page == "index.html" || !page) {
        // via https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of, this will go through every single post indice as a post, no index number required
        // i blame curiosity for this unorthodox thing
        for (post of posts) {
            addPostPreview(post);
        }
    } else {
        // otherwise get params
        let queryStr = window.location.search;
        let urlParams = new URLSearchParams(queryStr);
        // if its a single blog post, just load that single blog post
        if (page == "blog.html") {
            // get the post id and find it in params
            let id = urlParams.get("postid");
            for (post of posts) {
                if (post["postid"] == id) {
                    addPostPreview(post);
                    break;
                }
            }
        } else if (page == "tags.html") {
            // if tag page, get the actual tag in url param
            let tag = urlParams.get("tag");
            let tagTxt = document.getElementById("tagtitle");
            // we want users to know that they're looking at one specific web page
            tagTxt.innerText = "Posts with tag " + tag;
            //  find all posts with that tag and render it
            for (post of posts) {
                if (post["tags"].includes(tag)) {
                    addPostPreview(post);
                }
            }
        }
    }
    // lozad activation code, courtesy of https://github.com/ApoorvSaxena/lozad.js
    const observer = lozad(); // lazy loads elements with default selector as '.lozad'
    observer.observe();
    // fancybox activation code, courtesy of https://fancyapps.com/fancybox/getting-started/
    Fancybox.bind('[data-fancybox]', {}); 
});

function addPostPreview(json) {
    // this function will basically render a blog post in it's own div
    // create a div to contain the post, append to content container
    let contentContainer = document.createElement("div");
    blogContainer.appendChild(contentContainer);
    
    // create a h1 that contains an a tag that will link to the specific blog post, with the text being the post title, and append it to the blog container
    let title = document.createElement("h1");
    let urlComponent = document.createElement("a");
    urlComponent.href = "blog.html?postid=" + json["postid"];
    urlComponent.innerText = json["posttitle"]
    title.appendChild(urlComponent);
    contentContainer.appendChild(title);
    
    // create a p tag with the date class that will say the date, and then append it to the blog container
    // we'll also append a hr tag to the blog container
    let date = document.createElement("p");
    date.className = "date";
    date.innerText = json["date"];
    contentContainer.appendChild(date);
    contentContainer.appendChild(document.createElement("hr"));
    
    // if there is an image on the post, we create an img tag and make it show whatever image we want to show and append it to the container
    // we also make a container that can be used with data-fancybox, which contains the said image
    if (json["image"]) {
        let imgContainer = document.createElement("a");
        // dataset can be used to make custom tag params, provided that they start with data, via https://www.geeksforgeeks.org/what-are-custom-attributes-in-html5/
        // we will need to use this to add the fancybox tag param, as well as the src param so that fancybox knows what image to load up
        imgContainer.dataset.fancybox = null;
        imgContainer.dataset.src = json["image"];
        contentContainer.appendChild(imgContainer);
        let img = document.createElement("img");
        img.className = "lozad";
        img.src = json["image"];
        imgContainer.appendChild(img);
    }
    
    // we add a p tag that will contain the body text for the blog post, and append it to the container
    let postBody = document.createElement("p");
    postBody.innerText = json["postcontent"];
    contentContainer.appendChild(postBody);
    
    // we add a p tag for the tags, and append it to the container
    let tags = document.createElement("p");
    tags.innerText = "Tags: ";
    contentContainer.appendChild(tags);
    
    // loop for each json tag
    for (tag of json["tags"]) {
        // we make an a tag for each tag, link it to the specified tag page, set the text to whatever the tag is, and append it to the element that tags element has
        let tagElement = document.createElement("a");
        tagElement.href = "tags.html?tag=" + tag;
        tagElement.innerText = tag;
        tags.appendChild(tagElement);
        // via https://flexiple.com/javascript/get-last-array-element-javascript, you can use -1 in slice with an array to get the last element
        // if the current tag isn't the last tag, we append a comma (note it's a string, i poked around lol)
        if (json["tags"].slice(-1) != tag) {
            // from poking around, append will append a string to the end of the current node situation if i'm wording this well
            tags.append(", ");
        }
    }
}