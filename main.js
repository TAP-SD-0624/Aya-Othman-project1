let topics=[];
let faivouriteList=[];
document.addEventListener("DOMContentLoaded", () => {
    fetch("topics.json")
      .then((response) => response.json())
      .then((data) => {
        topics=data;
        console.log (data);
/* call func favourate here */
        createTopicsCards(data);
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
  
const faivourite= (fav)=>{
    const innerContainer = document.querySelector(".innerContainer");


}
/*1. add boolean to each element in jison property e.g. fav= fales as initial value 
/*2. favourites = [...courses.filter((item) => item.isFavourite)];
3. do mapping */

const body = document.querySelector('body');
const btnDark = document.querySelector('.btnDark');
const modeText = document.querySelector('.modeText');

btnDark.addEventListener("click", () => {
    if (body.classList.contains("darkMode")) {
        body.classList.toggle("lightMode");
        body.classList.remove("darkMode");
    } else {
        body.classList.toggle("darkMode");
        body.classList.remove("lightMode");
    }
});

btnDark.addEventListener("click", () => {
    if (modeText.innerText === "Dark Mode") {
        modeText.innerText = "Light Mode";
    } else {
        modeText.innerText = "Dark Mode";
    }
});
