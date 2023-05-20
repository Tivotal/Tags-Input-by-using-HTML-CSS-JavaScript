/* Created by Tivotal */

let ul = document.querySelector("ul");
let input = document.querySelector("input");
let countTxt = document.querySelector(".details span");
let btn = document.querySelector("button");
let tags = [];
let maxTags = 15;

countTags();

function addTag(e) {
  //if user click enter button
  if (e.key == "Enter") {
    //removing unwanted spaces from tag entered by user
    let tag = e.target.value.replace(/\s+/g, "");
    //if the tag length is greater than 1 & array not contains it
    if (tag.length > 1 && !tags.includes(tag)) {
      //allow tags only when tags length is less than 15
      if (tags.length < 15) {
        //splitting tag from comma
        tag.split(",").forEach((tag) => {
          //adding tag to tags array
          tags.push(tag);
          createTag();
        });
      }
    }
    //clearing input value
    e.target.value = "";
  }
}

function createTag() {
  //to avoid duplicates, removing all li tags before creating new tags
  ul.querySelectorAll("li").forEach((li) => li.remove());
  //creating li tag for each tag in tags array

  tags
    .slice()
    .reverse()
    .forEach((tag) => {
      let liTag = `<li>${tag} <i class="fas fa-xmark" 
      onclick="remove(this, '${tag}')"></i></li>`;
      //inserting li tag into ul tag
      ul.insertAdjacentHTML("afterbegin", liTag);
    });
  countTags();
}

function remove(element, tag) {
  //getting tag index from tags
  let index = tags.indexOf(tag);
  //removing tag from tags array
  tags = [...tags.slice(0, index), ...tags.slice(index + 1)];

  //removing li tag of tag
  element.parentElement.remove();
  countTags();
}

function countTags() {
  input.focus();
  //subtracting tags array length from max tags possible
  countTxt.innerText = maxTags - tags.length;
}

input.addEventListener("keyup", addTag);

btn.addEventListener("click", () => {
  //clearing the tag array
  tags.length = 0;
  //removing all li tags
  ul.querySelectorAll("li").forEach((li) => li.remove());
  countTags();
});
