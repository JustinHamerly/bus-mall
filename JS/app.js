'use strict';
/* --------------------------------------------------GLOBAL VARIABLES */
const itemSectionElem = document.getElementById('ItemDisplay');
//reference to the HTML section for displaying three items
const resultsSectionElem = document.getElementById('results');
//reference to the HTML section for results
const firstImgElem = document.getElementById('imgOne');
const secondImgElem = document.getElementById('imgTwo');
const thirdImgElem = document.getElementById('imgThree');
const firstH2Elem = document.getElementById('labelOne');
const secondH2Elem = document.getElementById('labelTwo');
const thirdH2Elem = document.getElementById('labelThree');
//references to the IMG and h2 elements for the three displayed items
let firstProduct = null;
let secondProduct = null;
let thirdProduct = null;
//variables for the three products set to null before they are assigned objects through the selectThreeProducts function
let clickCounter = 0;
//creates click counter and sets it to 0.  Will be increased through the handleClick function.


/* --------------------------------------------------CONSTRUTOR FUNCTION */
function Product(productName, imgPath){
  this.productName = productName;
  this.imgPath = imgPath;
  this.votes = 0;
  this.shown = 0;
}
//Creates new Products and adds them to the array of products.
Product.allProducts = [];
//the array of products
console.log(Product.allProducts);


/* --------------------------------------------------CONSTRUCTOR METHODS */
Product.prototype.renderProduct = function (img, h2){
  img.src = this.imgPath;
  img.alt = this.productName;
  h2.textContent = this.productName;
  this.shown ++;
};
//prototype method that takes the img location and h2 location as arguments, and changes the img elements source and the h2 elements text.  It then increments the products shown property by one.


/* --------------------------------------------------GLOBAL FUNCTIONS */
function pushCreateProduct(productName, imgPath){
  Product.allProducts.push(new Product(productName, imgPath));
}
//Creates a product through the constructor function, and pushes that function to an array.
function selectThreeProducts(){
  const doNotUse =[firstProduct, secondProduct, thirdProduct];
  while (doNotUse.includes(firstProduct)){
    let firstIndex = Math.floor(Math.random() * Product.allProducts.length);
    firstProduct = Product.allProducts[firstIndex];
  }
  doNotUse.push(firstProduct);
  while (doNotUse.includes(secondProduct)){
    let secondIndex = Math.floor(Math.random() * Product.allProducts.length);
    secondProduct = Product.allProducts[secondIndex];
  }
  doNotUse.push(secondProduct);
  while (doNotUse.includes(thirdProduct)){
    let thirdIndex = Math.floor(Math.random() * Product.allProducts.length);
    thirdProduct = Product.allProducts[thirdIndex];
  }
  doNotUse.push(thirdProduct);
}
//selects three products and assigns them to the global variables ensuring the second doesn't match the first and the third doesn't match the first or second.
function showThreeProducts(){
  firstProduct.renderProduct(firstImgElem, firstH2Elem);
  secondProduct.renderProduct(secondImgElem, secondH2Elem);
  thirdProduct.renderProduct(thirdImgElem, thirdH2Elem);
}
//renders the three products on the page using the renderProduct method by taking the img element and h2 element locations.
function renderResults(){
  const ulElem = document.createElement('ul');
  resultsSectionElem.appendChild(ulElem);
  for(let product of Product.allProducts){
    const liElem = document.createElement('li');
    liElem.textContent = `${product.productName} has been viewed ${product.shown} times and picked ${product.votes} times.`;
    ulElem.appendChild(liElem);
  }
}
//function to create unordered list and append each items results as list items in the UL.
function handleButton(e){
  let buttonClicked = e.target.id;
  if (buttonClicked === 'resultsbutton'){
    resultsSectionElem.textContent = '';
    renderResults();
    resultsSectionElem.removeEventListener('click', handleButton);
  }
}
//removes the renders the list of products with how many times viewed and clicked using the renderResults function.
function handleClick(e){
  let imageClicked = e.target.id;
  if (imageClicked === 'imgOne' || imageClicked === 'imgTwo' || imageClicked === 'imgThree'){
    clickCounter++;
    if (imageClicked === 'imgOne'){
      firstProduct.votes++;
    } else if (imageClicked === 'imgTwo'){
      secondProduct.votes++;
    } else {
      thirdProduct.votes++;
    }
    selectThreeProducts();
    showThreeProducts();
  }
  //checks that the click was on one of the three images, and if it was, it incrases the votes on that item and then rerenders three more items.
  if (clickCounter === 25){
    itemSectionElem.textContent = '';
    itemSectionElem.removeEventListener('click', handleClick);
    const buttonElem = document.createElement('div');
    buttonElem.id = 'resultsbutton';
    buttonElem.textContent = 'VIEW RESULTS';
    resultsSectionElem.appendChild(buttonElem);
  }
}
//after click counter hits max clicks, the item section is wiped clear and removed with a button for viewing results added to the results section.


/* --------------------------------------------------LISTENENERS */
itemSectionElem.addEventListener('click', handleClick);
//adds an event listener to the section defined by the itemSectionElem global variable.
resultsSectionElem.addEventListener('click', handleButton);
//event listener for getting results from results button


/* --------------------------------------------------CALL FUNCTIONS */
pushCreateProduct('Star Wars Bag', './img/bag.jpg');
pushCreateProduct('Banana Slicer', './img/banana.jpg');
pushCreateProduct('Toilet Paper Multitasker', './img/bathroom.jpg');
pushCreateProduct('Fashion Boots', './img/boots.jpg');
pushCreateProduct('Ultimate Breakfast Maker', './img/breakfast.jpg');
pushCreateProduct('Real Meatball Gum', './img/bubblegum.jpg');
pushCreateProduct('Time-out Chair', './img/chair.jpg');
pushCreateProduct('Great Old One', './img/cthulhu.jpg');
pushCreateProduct('Dog in Disguise', './img/dog-duck.jpg');
pushCreateProduct('Rehydrated Dragon Meat', './img/dragon.jpg');
pushCreateProduct('Business Lunch Pen Caps', './img/pen.jpg');
pushCreateProduct('Dog Slippers', './img/pet-sweep.jpg');
pushCreateProduct('Pizza Scissors', './img/scissors.jpg');
pushCreateProduct('Shark Skin Sleeping Bag', './img/shark.jpg');
pushCreateProduct('Coral Reef Baby Costume', './img/sweep.png');
pushCreateProduct('Cozy Grey Goat Sleeping Bag', './img/tauntaun.jpg');
pushCreateProduct('Authentic Unicorn Meat', './img/unicorn.jpg');
pushCreateProduct('Mistake', './img/water-can.jpg');
pushCreateProduct('Challenging Wine Glass', './img/wine-glass.jpg');

selectThreeProducts();
showThreeProducts();
