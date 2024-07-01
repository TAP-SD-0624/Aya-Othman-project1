const body = document.querySelector("body");
const btnDark = document.querySelector(".btnDark");
const modeText = document.querySelector(".modeText");
const btnFavourite = document.querySelector(".btnFavourite");
const favouriteContainer = document.querySelector(".favouriteContainer");

let topics = [];
let favouriteList = [];
// document.addEventListener("DOMContentLoaded", () => {
//     fetch("topics.json")
//       .then((response) => response.json())
//       .then((data) => {
//         topics=data;
//         favouriteList = topics.filter((item) => item.favourite);
//         console.log (data);
//         createFavouritesTopicsCards(favouriteList);

//         console.log(favouriteList);

//        createTopicsCards(data);
//        createDetailsPage(data);

//       });
//   });

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
  `;
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

      const CardCourseArea = document.createElement("div");
      CardCourseArea.classList.add("CarsCourseArea");
      let cardCourseHTML = "";
      cardCourseHTML += `
      <div class="favCourseImage">
        <img src="${cardData.image}" alt="${cardData.topic}">
      </div>
      <div class="favCourseInfo courseCard">
      <div class="topOfCard">
      <h5>${cardData.topic}</h5>by <a href="#">${cardData.name}</a>
      </div>
    </div>
  `;

      detailsArea.innerHTML = cardHTML;
      courseBreaf.appendChild(detailsArea);

      CardCourseArea.innerHTML = cardCourseHTML;
      courseBreaf.appendChild(CardCourseArea);
    }
  }
};
(async () => {
  document.addEventListener("DOMContentLoaded", () => {
    fetch("topics.json")
      .then((response) => response.json())
      .then((data) => {
        topics = data;
        favouriteList = topics.filter((item) => item.favourite);
        console.log(data);
        createFavouritesTopicsCards(favouriteList);
        console.log(favouriteList);
        createDetailsPage(data);
        createTopicsCards(data);
      });
  });
})();
