const apiKey = "";  // API key omitted.
const url = "https://api.textcortex.com/v1/texts/social-media-posts";

let parent = document.getElementById("main");

let header = document.createElement("h1");
header.textContent = "Post Generator";

let topLine = document.createElement("h4");
topLine.textContent = "Where would you like to make a post?";

let twitter = document.createElement("input");
twitter.type = "radio";
twitter.name = "rbtn";
twitter.value = "twitter";
let twitterLabel = document.createElement("label");
twitterLabel.innerText = "Twitter";
twitterLabel.append(twitter);

let linkedin = document.createElement("input");
linkedin.type = "radio";
linkedin.name = "rbtn";
linkedin.value = "linkedin";
let linkedinLabel = document.createElement("label");
linkedinLabel.innerText = "LinkedIn";
linkedinLabel.append(linkedin);

let midLine = document.createElement("h4");
midLine.textContent = "What would you like the post to talk about? Separate multiple keywords by commas.";

let keywordInput = document.createElement("input");
keywordInput.placeholder = "Enter some keywords";

let bottomLine = document.createElement("h4");
bottomLine.textContent = "When ready, click the submit button below.";

let result = document.createElement("p");

let submit = document.createElement("button");
submit.innerText = "Submit";
submit.addEventListener("click", async () => {
    if (keywordInput.value !== "" && (twitter.checked || linkedin.checked)) {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + apiKey
            },
            body: `{
                "context":"story",
                "keywords":[${keywordInput.value.split(",").map(w => `"${w}"`)}],
                "mode":"${twitter.checked ? "twitter" : "linkedin"}"
            }`
        };

        let response = await fetch(url, options);
        let story_data = await response.json();

        result.textContent = story_data.data.outputs[0].text;
    }
});

let back = document.createElement("a");
back.href = "index.html";
back.textContent = "Go back to the home page.";

parent.append(header);
parent.append(topLine);
parent.append(twitterLabel);
parent.append(document.createElement("br"));
parent.append(linkedinLabel);
parent.append(document.createElement("br"));
parent.append(midLine);
parent.append(keywordInput);
parent.append(bottomLine);
parent.append(submit);
parent.append(result);
parent.append(back);