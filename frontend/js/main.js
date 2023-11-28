// header background change
let header = document.querySelector("header");
window.addEventListener("scroll", () => {
  header.classList.toggle("shadow", window.scrollY > 0);
});

// api integration
const all = document.getElementById("all");
const gdsc = document.getElementById("gdsc");
const ecell = document.getElementById("ecell");
const ieee = document.getElementById("ieee");

const fetchAllEvents = async () => {
  try {
    const json = await fetch("http://localhost:3000/events");
    const result = await json.json();
    if (!result) {
      return;
    }
    const postSection = document.getElementById("allPosts");
    postSection.innerHTML = "";
    result.forEach((element) => {
      const node = document.createElement("div");
      node.innerHTML = `
        <div onclick="singlePost('${element._id}')" class="event-box">
          <img src="img/${element.poster}" alt="" class="event-img" />
          <h2 class="category">${element.organizer}</h2>
          <p class="event-title">
            ${element.name}
          </p>
          <span class="event-date">${element.createdAt.slice(0, 10)}</span>
          <p class="event-decription">
            ${element.description}
            <!-- profile -->
            <div class="profile">
              <img src="img/${
                element.author.avatar
              }" alt="" class="profile-img">
              <span class="profile-name">${element.author.name}</span>
            </div>
          </p>
        </div>       
      `;
      postSection.appendChild(node);
    });
  } catch (error) {
    console.log(error);
  }
  if (query === "all") {
    gdsc.classList.remove("active-filter");
    all.classList.add("active-filter");
    ecell.classList.remove("active-filter");
    ieee.classList.remove("active-filter");
  }
};

const fetchAllEventsParams = async (query = "") => {
  try {
    const json = await fetch(`http://localhost:3000/events?organizer=${query}`);
    const result = await json.json();
    if (!result) {
      return;
    }
    const postSection = document.getElementById("allPosts");
    postSection.innerHTML = "";
    result.forEach((element) => {
      const node = document.createElement("div");
      node.innerHTML = `
        <div onclick="singlePost()" class="event-box">
          <img src="img/${element.poster}" alt="" class="event-img" />
          <h2 class="category">${element.organizer}</h2>
          <p class="event-title">
            ${element.name}
          </p>
          <span class="event-date">${element.createdAt.slice(0, 10)}</span>
          <p class="event-decription">
            ${element.description}
            <!-- profile -->
            <div class="profile">
              <img src="img/${
                element.author.avatar
              }" alt="" class="profile-img">
              <span class="profile-name">${element.author.name}</span>
            </div>
          </p>
        </div>       
      `;
      postSection.appendChild(node);
    });
    console.log(result);
  } catch (error) {
    console.log(error);
  }
  if (typeof query === undefined) return;
  if (query === "") {
    gdsc.classList.remove("active-filter");
    all.classList.add("active-filter");
    ecell.classList.remove("active-filter");
    ieee.classList.remove("active-filter");
  }
  if (query === "gdsc") {
    gdsc.classList.add("active-filter");
    all.classList.remove("active-filter");
    ecell.classList.remove("active-filter");
    ieee.classList.remove("active-filter");
  }
  if (query === "ecell") {
    gdsc.classList.remove("active-filter");
    all.classList.remove("active-filter");
    ecell.classList.add("active-filter");
    ieee.classList.remove("active-filter");
  }
  if (query === "ieee") {
    gdsc.classList.remove("active-filter");
    all.classList.remove("active-filter");
    ecell.classList.remove("active-filter");
    ieee.classList.add("active-filter");
  }
};

const singlePost = async (id) => {
  console.log(id);
  location.href = "event-page.html";
  localStorage.setItem("id", JSON.stringify(id));
};

const fetchSinglePost = async () => {
  const id = JSON.parse(localStorage.getItem("id"));
  try {
    const json = await fetch(`http://localhost:3000/event/${id}`);
    const result = await json.json();
    console.log(result);
    document.getElementById("para").innerHTML = result.description;
    document.getElementById("postName").innerHTML = result.name;
    const ele = document.getElementById("postImageContainer");
    const node = document.createElement("div");
    node.innerHTML = `
    <img src="img/${result.poster}" alt="" class="header-img" />
    `;
    ele.appendChild(node);
  } catch (error) {
    console.log(error);
  }
};
