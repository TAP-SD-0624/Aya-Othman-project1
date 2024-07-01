const body = document.querySelector("body");
const btnDark = document.querySelector(".btnDark"); //like this
//const getBtnDark = ()=>document.querySelector(".btnDark"); //like this
const modeText = document.querySelector(".modeText");
const btnFavourite = document.querySelector(".btnFavourite");
const favouriteContainer = document.querySelector(".favouriteContainer"); //for best parctce it should be a getters rather than variable

let topics = [];
let favouriteList = [];

const setDataToLocalStorage = () => {
  localStorage.setItem("coursesList", JSON.stringify(topics));
  localStorage.setItem("favouritesList", JSON.stringify(favouriteList));
};

btnDark.addEventListener("click", () => {
  body.classList.contains("dark")
    ? body.classList.toggle("lightMode")
    : body.classList.toggle("darkMode");
});

btnDark.addEventListener("click", () => {
  if (modeText.innerText === "Dark Mode") {
    modeText.innerText = "Light Mode";
  } else {
    modeText.innerText = "Dark Mode";
  }
});

btnFavourite.addEventListener("click", () => {
  favouriteContainer.classList.toggle("showFavourite");
  console.log("show");
});

const createTopicsCards = (data) => {
  const innerContainer = document.querySelector(".innerContainer");
  console.log(data);
  data.map((course) => {
    const cardCourse = document.createElement("div");
    cardCourse.classList.add("card");
    let cardHTML = "";
    cardHTML += `
          <div class="courseImage">
            <img src="${course.image}" alt="${course.topic}">
          </div>
          <div class="courseInfo">
            <p>${course.category}</p>
            <h3>${course.topic}</h3>
            <ul>
              <li><ion-icon class="starShap" name="star"></ion-icon></li>
              <li><ion-icon  class="starShap" name="star"></ion-icon></li>
              <li><ion-icon  class="starShap" name="star"></ion-icon></li>
              <li><ion-icon  class="starShap" name="star"></ion-icon></li>
              <li><ion-icon class="starShap"  name="star"></ion-icon></li>
            </ul>
            <p>${course.name}</p>

        </div>
      `;

    cardCourse.innerHTML = cardHTML;
    innerContainer.appendChild(cardCourse);
    cardCourse.addEventListener("click", () => {
      window.location.href = `details.html?CourseId=${course.id}`;
    });
  });
};

const createFavouritesTopicsCards = (fav) => {
  const favContainer = document.querySelector(".favouriteList");
  favContainer.innerHTML = "";
  fav.map((favCourse) => {
    const cardCourse = document.createElement("div");
    cardCourse.classList.add("card");
    let cardHTML = "";
    cardHTML += `
      <div class="favCourseImage">
        <img src="${favCourse.image}" alt="${favCourse.topic}">
      </div>
      <div class="favCourseInfo">
        <h3>${favCourse.topic}</h3>
        <ul class="favUl">
          <li><ion-icon class="starShap" name="star"></ion-icon></li>
          <li><ion-icon  class="starShap" name="star"></ion-icon></li>
          <li><ion-icon  class="starShap" name="star"></ion-icon></li>
          <li><ion-icon  class="starShap" name="star"></ion-icon></li>
          <li><ion-icon class="starShap"  name="star"></ion-icon></li>
        </ul>
    </div>
  `; //divide to two function one for craete one card and its details and the other for create the list the append as well
    cardCourse.innerHTML = cardHTML;
    favContainer.appendChild(cardCourse);
  });
};

const createDetailsPage = (data) => {
  const urlVariable = new URLSearchParams(window.location.search);
  const cardId = urlVariable.get("CourseId");
  console.log(cardId);
  if (cardId) {
    const cardData = data.find((card) => card.id == cardId);
    console.log(cardData);
    if (cardData) {
      const courseBreaf = document.querySelector(".courseBreaf");
      const detailsArea = document.createElement("div");
      detailsArea.classList.add("detailsArea");
      let cardHTML = "";
      cardHTML += `
      <div>
    <h4 class="category">${cardData.category}</h4>
    <h3 class="cousreName">${cardData.topic}</h3>
        <ul class="courseUl">
          <li><ion-icon class="starShap" name="star"></ion-icon></li>
          <li><ion-icon  class="starShap" name="star"></ion-icon></li>
          <li><ion-icon  class="starShap" name="star"></ion-icon></li>
          <li><ion-icon  class="starShap" name="star"></ion-icon></li>
          <li><ion-icon class="starShap"  name="star"></ion-icon></li>
        </ul>
    </div>
    <p class="breaf">${cardData.description}</p>

`;

      const handleTheCLickedFavouriteButton = (cardId) => {
        cardData.favourite = !cardData.favourite;
        topics = [
          ...topics.map((item) =>
            item.id === cardId ? { ...item, favourite: !item.favourite } : item
          ),
        ];
        favouriteList = [...topics.filter((item) => item.favourite)];
        console.log(favouriteList);
        createFavouritesTopicsCards(favouriteList);
        setDataToLocalStorage();
      };

      const courseArea = document.querySelector(".courseArea");
      const CardCourseArea = document.createElement("div");
      CardCourseArea.classList.add("CardCourseArea");
      let cardCourseHTML = "";
      cardCourseHTML += `
      <div class="CourseImage">
        <img src="${cardData.image}" alt="${cardData.topic}">
      </div>
      <div class="courseCard">
      <div class="topOfCard">
      <h5>${cardData.topic}</h5>by <a href="#">${cardData.name}</a>
      </div>
    <div class="favouriteBtnDecisionContainer">
    <p>Interested about this topic?</p>
    <div class="favouriteBtnContainer">
    <button class="addOrRemove" type="button" data-id="${cardId} onClick=() => console.log("buttonClicked")} >
              <span class="addOrRemove textOfFavouriteButton">
            ${
              cardData.favourite
                ? "Remove from Favourites"
                : "Add to Favourites"
            }
              </span>
              <ion-icon name="heart-outline"></ion-icon>
            </button>
    </div>
    <p>Unlimited Credits</p>
    </div>
        </div>

  `;

      const subTopicsContainer = document.querySelector(".subTopicsContainer");
      const subTopics = document.createElement("div");
      subTopics.classList.add("subTopics");
      let subTopicsHTML = "";

      subTopicsHTML += `
      <div class="subTopic">
        <h4 class="sub-topics-h4">${cardData.topic} Sub Topics</h4>
      </div>
    `;

      cardData.subtopics.forEach((subTopic) => {
        subTopicsHTML += `
        <div class="subTopic">
        <button class="btn">
          <ion-icon class="checkIcon" name="checkmark-circle-outline"></ion-icon>
          <span>${subTopic}</span>
          </button>

        </div>
      `;
   
      });
         

      const emptyContainer = document.createElement("div");
      emptyContainer.classList.add("emptyContainer");

      detailsArea.innerHTML = cardHTML;
      courseBreaf.appendChild(detailsArea);

      subTopics.innerHTML = subTopicsHTML;
      CardCourseArea.innerHTML = cardCourseHTML;
      courseArea.appendChild(CardCourseArea);
      courseBreaf.appendChild(courseArea);
      subTopicsContainer.appendChild(subTopics);
      subTopicsContainer.appendChild(emptyContainer);
 // Add event listener for the favourite button
 document
 .querySelector(".favouriteBtnContainer button")
 .addEventListener("click", () =>{

   handleTheCLickedFavouriteButton(cardId)
     const text = document.querySelector(".textOfFavouriteButton");
   text.textContent = cardData.favourite ? "Remove From Favourites" : "Add to Favourites";
 }
 );
     
    }
  }
};

const getDataFromLocalStorage = () => {
  const savedCourses = localStorage.getItem("coursesList");
  const savedFavourites = localStorage.getItem("favouritesList");

  if (savedCourses) {
    topics = JSON.parse(savedCourses);
  }
  if (savedFavourites) {
    favouriteList = JSON.parse(savedFavourites);
  }
};

const fetchData = async () => {
  const response = await fetch("topics.json");
  return await response.json();
};

(async () => {
  //getDataFromLocalStorage();
  if (topics.length === 0) {
    topics = await fetchData();
    favouriteList = [...topics.filter((item) => item.favourite)];
  //  setDataToLocalStorage(); no need
  }
  createFavouritesTopicsCards(favouriteList);
  console.log(favouriteList);
  createDetailsPage(topics);
  createTopicsCards(topics);
})();
