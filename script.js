// Navbar dropdown menu code
let links = document.querySelector(".navbar-links").children;   
let positionBottom = false  // for tracking dropdown menu position
let toggleArrow = [false, false, false];    // for tracking arrow icon of each link
let dropdownMenuAnim;   // for storing dropdown menu animation in order to reverse it
let arrowAnimation = [];    // storing arrow animations of each link to control them separately
[...links].forEach((link, index) => {
    link.addEventListener("click", function () {
        if (index == 0) {   // if the clicked link is the first link (for displaying dropdown menu)
            if (!positionBottom) {  // if the dropdown menu is not displayed
                arrowAnimation[index] = link.firstElementChild.firstElementChild.animate([{ // rotating the arrow icon
                    transform: 'rotate(0deg)'
                }, {
                    transform: 'rotate(180deg)'
                }],
                    {
                        duration: 300,
                        fill: 'forwards'
                    });
                const dropdownMenu = document.querySelector(".dropdownMenu");
                dropdownMenuAnim = dropdownMenu.animate([   // displaying the dropdown menu
                    {
                        transform: 'translateY(-250px)'
                    },
                    {
                        transform: 'translateY(30px)'
                    }
                ], {
                    duration: 300,
                    fill: 'forwards'
                });
            }
            else {
                dropdownMenuAnim.reverse(); // hiding the dropdown menu
                arrowAnimation[index].reverse();    // rotating the arrow icon back
            }
            positionBottom = !positionBottom;   //  update the dropdown menu's position
        }
        else {
            if (toggleArrow[index] == false) {  // if the arrow icon is not rotated
                arrowAnimation[index] = link.firstElementChild.animate([{   // rotating the arrow icon
                    transform: 'rotate(0deg)'
                }, {
                    transform: 'rotate(180deg)'
                }],
                    {
                        duration: 300,
                        fill: 'forwards'
                    });
                toggleArrow[index] = !toggleArrow[index];   // changing the arrow icon state
            }
            else {
                arrowAnimation[index].reverse();    // rotating the arrow icon back 
            }
        }
    });
})

// Codes section icon selection and copy code script
let codesDivIcons = document.querySelector(".codes-div>div:first-child").children;
let prevClicked = document.querySelector(".codes-div>div:first-child").firstElementChild;   // for tracking the previous clicked icon
let clicked = false;    // for tracking the copy icon state
[...codesDivIcons].forEach(element => {
    element.addEventListener("click", function () {
        if (!element.hasAttribute("data-name")) {   // if the clicked element is an icon
            prevClicked.classList.remove("clicked");    
            prevClicked.firstElementChild.classList.remove("clicked");
            element.classList.add("clicked");   // adding the clicked class to the clicked icon div (for displaying bottom border)
            element.firstElementChild.classList.add("clicked"); //  adding the clicked class to the clicked icon (to change its color)
            prevClicked = element;  //  update prevClicked variable with the current element
        }
        else {  //  if the copy div is clicked
            if (clicked) {  //  if the div is selected
                element.firstElementChild.setAttribute("src", "assets/images/copy-icon.svg");
                element.lastElementChild.innerText = "Copy";
                clicked = false;
            }
            else {  //  if the div is not selected
                element.firstElementChild.setAttribute("src", "assets/images/copied-icon.svg");
                element.lastElementChild.innerText = "Copied";
                clicked = true;
            }
        }
    });
});

// Codes section animated changing text script
let dynamicTextList = document.querySelector(".codes-section .section-title span").children;
let arr = [...dynamicTextList]; //  storing the h1 text elements in an array
let i = 0;  //  to keep track of text element number
setInterval(() => { //  to change text after some time
    if (i == 0) {   
        arr[3].classList.remove("show");    //  if the current element is first one, hide the 4th (last) element
    }
    else {
        arr[i - 1].classList.remove("show");    //  hide the previous element
    }
    arr[i].classList.add("show");   //  display the current element
    if (i == 0 || i == 2) {
        arr[i].style.borderBottom = "3px dashed #F22F46";   //  set color of first and third elements
    }
    else {
        arr[i].style.color = "#ED9501";
        arr[i].style.borderBottom = "3px dashed #ED9501";   //  set color of second and fourth elements
    }
    i++;
    i == 4 ? i = 0 : i;     //  reset the loop 
}, 2000);   // 2 seconds delay

// Feedback section clients reviews slider script
let sliderImages = document.querySelector(".carousel-indicators").children; //  selecting client's images (for navigating the reviews carousel)
let prevActive = document.querySelector(".carousel-indicators").firstElementChild;  //  to keep track of previous image
let sliderImagesArr = [...sliderImages];
sliderImagesArr.forEach((element) => {
    element.addEventListener("click", function () {
        prevActive.classList.remove("active");  //  remove .active class from previous image
        element.classList.add("active");    // add .active class on current image
        prevActive = element;   //  set current image as prevActive
    });
});

// Intro section messages list animation script
let messagesListItems = document.querySelector(".intro-section-msgs-list").children;  //  selecting the messages list items
let msgsAnimationReverse;   //  to keep track of reverse (hiding) animation of icons

function messagesAnimationFunc() {
    let animations = [];    //  to keep track of the animations on each list item

    [...messagesListItems].forEach((message, index) => {
        let anim = message.animate([    //  animating the messages list items
            { top: "30px", opacity: 0 },
            { top: "0px", visibility: 'visible', opacity: 1 }
        ], {
            duration: 200,
            delay: index * 1500,    //  delay the animation of each list item to display them one after the other
            fill: 'forwards'
        });

        animations.push(anim);
    });

    animations[animations.length - 1].onfinish = () => {    // wait for the last animation to finish
        [...messagesListItems].forEach((message) => {
            msgsAnimationReverse = message.animate([    //  play the hiding animation 
                { top: "0px", opacity: 1 },
                { top: "30px", opacity: 0 }
            ], {
                duration: 200,
                fill: 'forwards',
                delay: 1000
            });
        });

        msgsAnimationReverse.onfinish = () => {
            setTimeout(messagesAnimationFunc, 1000);    //  keep replaying the animations after 1 second delays
        };
    };
}
messagesAnimationFunc();    //  function responsible for playing messages list items animations

// CPaaS section cards hover animation script
const cards = document.querySelectorAll('.cpaas-section .card');    
const animatedBgCircle = document.querySelectorAll('.animation-circle');    //  selecting the circles which appears in the cards' backgrounds to give an animation effect
let animatedBgCircleArr = [...animatedBgCircle];    //  array to keep track of animation circle of each card
let circleAnimation;    //  to keep track of circle animation (in order to reverse it on mouseleave)
let cardHeadingAnimation;   //  to keep track of card header animation (in order to reverse it on mouseleave)
[...cards].forEach((card, index) => {
    card.addEventListener('mouseenter', () => {     //  listen to the hover event
        if (index == 0) {
            animatedBgCircle[index].style.backgroundColor = '#FFCF73';  //  set the color of first card's animation circle
        }
        else if (index == 1) {
            animatedBgCircle[index].style.backgroundColor = '#84F3CA';  //  set the color of second card's animation circle
        }
        else {
            animatedBgCircle[index].style.backgroundColor = '#82CDFF';  //  set the color of third card's animation circle
        }
        card.classList.add('hover');    //  add this class to animate the card's border
        cardHeadingAnimation = card.firstElementChild.firstElementChild.animate([   //  change bg color of card's heading text to white through animation
            {
            },
            {
                backgroundColor: '#fff'
            }
        ], {
            duration: 800,
            fill: 'forwards'
        });
        circleAnimation = animatedBgCircle[index].animate([     //     display the circle animation on cards on hover
            {
                height: 0,
                width: 0,
                opacity: 0
            },
            {
                height: '1000px',
                width: '1000px',
                opacity: 1
            }
        ], {
            duration: 800,
            easing: 'linear',
            fill: 'forwards'
        });
    });

    card.addEventListener('mouseleave', () => {
        circleAnimation.reverse();  //  reverse the circle animation on mouseleave
        cardHeadingAnimation.reverse(); //  reverse the card heading animation on mouseleave
        card.classList.remove('hover'); //  reverse the card border's animation
    });
});





