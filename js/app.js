/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Define Global Variables
 *
 */
const sections = document.querySelectorAll("section");
const navBarList = document.querySelector("#navbar__list");
const topBtn = document.getElementById("topBtn");
let isScrollEvent = true;

/**
 * End Global Variables
 * Start Helper Functions
 *
 */


/**
* @description getItemByAttribute gets the item by finding it with it's attribute
* @param {object} attributeParent
* @param {string} attribute
* @returns {object} the item that matches the input attribute
*/

const getItemByAttribute = (attributeParent, attribute) => {
  const attributeValue = attributeParent.getAttribute(attribute);
  const element = document.querySelector(`[data-nav = "${attributeValue}"]`);
  return element;
};

/**
* @description getBounding gets bounding of clientRect for element and checks if this element is within the screen
* @param {object} element
* @returns {object} elementBounding and isElementWithinBounding
*/
const getBounding = (element) => {
  const elementBounding = element.getBoundingClientRect();
  const isElementWithinBounding =
    elementBounding.top >= 0 &&
    elementBounding.left > 0 &&
    elementBounding.top <
      (window.innerHeight || document.documentElement.clientHeight);
  return { elementBounding, isElementWithinBounding };
};

//set the class for the active link in the nav bar
const setActiveClass = () => {
  const navBarAnchors = document.querySelectorAll("a");
  const activeSection = document.querySelector(".active");
  if (activeSection) activeSection.classList.remove("active");
  const activeAnchor = document.querySelector(".menu__link--active");
  if (activeAnchor) activeAnchor.classList.remove("menu__link--active");
  loop1: for (const key in navBarAnchors) {
    const selectedSection = getItemByAttribute(
      navBarAnchors[key],
      "data-value"
    );

    const { isElementWithinBounding } = getBounding(selectedSection);
    if (isElementWithinBounding) {
      navBarAnchors[key].classList.add("menu__link--active");
      selectedSection.classList.add("active");
      break loop1;
    }
  }
};

/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

// build the nav

/**
* @description self invoked function that based on sections count we will have the same num of links in the nav bar each refer to its section
*/
(function () {
  for (let sectionNum = 1; sectionNum <= sections.length; sectionNum++) {
    const navBarItem = document.createElement("li");
    const navBarLink = document.createElement("a");
    navBarLink.textContent = `Section ${sectionNum}`;
    navBarLink.setAttribute("data-value", `Section ${sectionNum}`);
    navBarLink.classList.add("menu__link");
    navBarItem.appendChild(navBarLink);
    navBarList.appendChild(navBarItem);
    navBarLink.addEventListener("click", (event) => {
      isScrollEvent = false;
      onLinkClick(event);
    });
  }
})();

// Add class 'active' to section when near top of viewport
setActiveClass();

/**
* @description onLinkClick scrolls to section on link click
* @param {object} event
*/
const onLinkClick = (event) => {
  event.preventDefault();
  const activeItem = document.querySelector(".active");
  if (activeItem) activeItem.classList.remove("active");
  const selectedSection = getItemByAttribute(
    event.target,
    "data-value"
  ).getElementsByClassName("landing__container")[0];
  selectedSection.scrollIntoView({
    behavior: "smooth",
  });

  selectedSection.classList.add("active");
  isScrollEvent = true;
};

/**
 * End Main Functions
 * Begin Events
 *
 */

// Scroll event
document.addEventListener("scroll", (event) => {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    topBtn.style.display = "block";
  } else {
    topBtn.style.display = "none";
  }
  if (isScrollEvent) {
    setActiveClass();
  }
});

// When the user clicks on the button, scroll to the top of the document
topBtn.addEventListener("click", function (event) {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
});
