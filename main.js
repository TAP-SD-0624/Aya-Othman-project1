const body = document.querySelector('body');
const btnDark = document.querySelector('.btnDark');
const modeText = document.querySelector('.modeText');
const btnFavourite=document.querySelector('.btnFavourite');
const favouriteContainer=document.querySelector('.favouriteContainer');

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


let topics=[];
let favouriteList=[];
document.addEventListener("DOMContentLoaded", () => {
    fetch("topics.json")
      .then((response) => response.json())
      .then((data) => {
        topics=data;       
        favouriteList = topics.filter((item) => item.favourite);
        console.log (data);
        createFavouritesTopicsCards(favouriteList);

        console.log(favouriteList);
  
       createTopicsCards(data);
        createDetailsPage(data);


        
      });
  });

  const createTopicsCards = (data) => {
    const innerContainer = document.querySelector(".innerContainer");

    
    data.map((course) => {
        const cardCourse= document.createElement("div");
        cardCourse.classList.add("card");
        let cardHTML='';
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

  
    cardCourse.innerHTML=cardHTML;
    innerContainer.appendChild(cardCourse);
    cardCourse.addEventListener("click", () => {
        window.location.href = `details.html?CourseId=${course.id}`;
      });
     }); 
  };

  
  
const createFavouritesTopicsCards= (fav)=>{
  const favContainer = document.querySelector(".favouriteList");
  fav.map((favCourse) => {
    const cardCourse= document.createElement("div");
    cardCourse.classList.add("card");
    let cardHTML='';
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
  cardCourse.innerHTML=cardHTML;
  favContainer.appendChild(cardCourse);

     }); 
}

const createDetailsPage = (details)=>{
  const courseBreaf = document.querySelector(".courseBreaf");
const urlVariable = new URLSearchParams(window.location.search);
  const cardId = urlVariable.get("CourseId");
  const cardData = details.find((card) => card.id == cardId);
  const detailsArea= document.createElement("div");
  detailsArea.classList.add("card");
  let cardHTML='';
cardHTML+=
`
    <h4 class="category">${cardData.category}</h4>
    <h2 class="cousreName">${cardData.topic}</h2>
    <div class="cousreRate">
        <ul class="favUl">
          <li><ion-icon class="starShap" name="star"></ion-icon></li>
          <li><ion-icon  class="starShap" name="star"></ion-icon></li>
          <li><ion-icon  class="starShap" name="star"></ion-icon></li>
          <li><ion-icon  class="starShap" name="star"></ion-icon></li>
          <li><ion-icon class="starShap"  name="star"></ion-icon></li>
        </ul>
    </div>
    <p class="breaf">${cardData.description}</p>

`
detailsArea.innerHTML=cardHTML;
courseBreaf.appendChild(detailsArea);
}
(async () => {
  document.addEventListener("DOMContentLoaded", () => {
      fetch("topics.json")
        .then((response) => response.json())
        .then((data) => {
          topics=data;       
          favouriteList = topics.filter((item) => item.favourite);
          console.log (data);
          createFavouritesTopicsCards(favouriteList);
  
          console.log(favouriteList);
        createDetailsPage(data);
   createTopicsCards(data);
  
          
  
          
        });
    });
  })()