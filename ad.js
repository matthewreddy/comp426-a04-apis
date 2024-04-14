const apiKey = "";  // API key omitted.
const url = "https://api.textcortex.com/v1/texts/ads";

let parent = document.getElementById("main");

let header = document.createElement("h1");
header.textContent = "Ad Generator";

let topLine = document.createElement("h4");
topLine.textContent = "What is the name of your product?";

let nameInput = document.createElement("input");
nameInput.placeholder = "Enter a name";

let descLine = document.createElement("h4");
descLine.textContent = "Give a brief description of your product.";

let desc = document.createElement("textarea");
desc.placeholder = "Enter a description";
desc.style.width = "250px";
desc.style.height = "100px";

let keywordLine = document.createElement("h4");
keywordLine.textContent = "What would you like the ad to talk about? Separate multiple keywords by commas.";

let keywordInput = document.createElement("input");
keywordInput.placeholder = "Enter some keywords";

let bottomLine = document.createElement("h4");
bottomLine.textContent = "When ready, click the submit button below.";

let result = document.createElement("p");

let submit = document.createElement("button");
submit.innerText = "Submit";
submit.addEventListener("click", async () => {
    if (nameInput.value !== "" && keywordInput.value !== "" && desc.value !== "") {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + apiKey
            },
            body: `{
                "description":"${desc.value}",
                "keywords":[${keywordInput.value.split(",").map(w => `"${w}"`)}],
                "name":"${nameInput.value}"
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
parent.append(nameInput);
parent.append(descLine);
parent.append(desc);
parent.append(keywordLine);
parent.append(keywordInput);
parent.append(bottomLine);
parent.append(submit);
parent.append(result);
parent.append(back);