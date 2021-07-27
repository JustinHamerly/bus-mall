/* --------------------------------------------------GLOBAL VARIABLES */
let itemSectionElem = document.getElementById('ItemDisplay');
//reference to the HTML section for displaying three items
let resultsSectionElem = document.getElementById('results');
//reference to the HTML section for results
let firstImgElem = document.getElementById('imgOne');
let secondImgElem = document.getElementById('imgTwo');
let thirdImgElem = document.getElementById('imgThree');
let firstH2Elem = document.getElementById('labelOne');
let secondH2Elem = document.getElementById('labelTwo');
let thirdH2Elem = document.getElementById('labelThree');
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
  Product.allProducts.push(this);
}
//Creates new Products and adds them to the array of products.
Product.allProducts = [];
//the array of products
console.log(Product.allProducts);


/* --------------------------------------------------CONSTRUCTOR METHODS */
Product.prototype.renderProduct = function (img, h2){
  img.src = this.imgPath;
  h2.textContent = this.productName;
  this.shown ++;
};
//prototype method that takes the img location and h2 location as arguments, and changes the img elements source and the h2 elements text.  It then increments the products shown property by one.


/* --------------------------------------------------GLOBAL FUNCTIONS */
function selectThreeProducts(){
  let firstIndex = Math.floor(Math.random() * Product.allProducts.length);
  firstProduct = Product.allProducts[firstIndex];
  let secondIndex = Math.floor(Math.random() * Product.allProducts.length);
  secondProduct = Product.allProducts[secondIndex];
  let thirdIndex = Math.floor(Math.random() * Product.allProducts.length);
  thirdProduct = Product.allProducts[thirdIndex];
  while(secondProduct === null || secondProduct === firstProduct){
    let secondIndex = Math.floor(Math.random() * Product.allProducts.length);
    secondProduct = Product.allProducts[secondIndex];
  }
  while (thirdProduct === null || thirdProduct === firstProduct || thirdProduct === secondProduct){
    let thirdIndex = Math.floor(Math.random() * Product.allProducts.length);
    thirdProduct = Product.allProducts[thirdIndex];
  }
}
//selects three products and assigns them to the global variables ensuring the second doesn't match the first and the third doesn't match the first or second.
function showThreeProducts(){
  firstProduct.renderProduct(firstImgElem, firstH2Elem);
  secondProduct.renderProduct(secondImgElem, secondH2Elem);
  thirdProduct.renderProduct(thirdImgElem, thirdH2Elem);
}
//renders the three products on the page using the renderProduct method by taking the img element and h2 element locations.
function renderResults(){
  for(let product of Product.allProducts){
    let h2Elem = document.createElement('h2');
    h2Elem.textContent = `${product.productName} has been viewed ${product.shown} times and picked ${product.votes} times.`;
    resultsSectionElem.appendChild(h2Elem);
  }
}
//function to append h2 elements to the section with the results.
function handleButton(e){
  let buttonClicked = e.target.id;
  if (buttonClicked === 'resultsbutton'){
    itemSectionElem.textContent = '';
    renderResults();
    itemSectionElem.removeEventListener('click', handleButton);
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
    let buttonElem = document.createElement('div');
    buttonElem.id = 'resultsbutton';
    buttonElem.textContent = 'VIEW RESULTS';
    itemSectionElem.appendChild(buttonElem);
  }
}
//after click counter hits max clicks, the item section is wiped clear and removed with a button for viewing results.



/* --------------------------------------------------LISTENENER */
itemSectionElem.addEventListener('click', handleClick);
//adds an event listener to the section defined by the itemSectionElem global variable.
itemSectionElem.addEventListener('click', handleButton);
//event listener for getting results from results button


/* --------------------------------------------------CALL FUNCTIONS */
new Product('Star Wars Bag', './img/bag.jpg');
new Product('Banana Slicer', './img/banana.jpg');
new Product('Toilet Paper Multitasker', './img/bathroom.jpg');
new Product('Fashion Boots', './img/boots.jpg');
new Product('Ultimate Breakfast Maker', './img/breakfast.jpg');
new Product('Real Meatball Gum', './img/bubblegum.jpg');
new Product('Time-out Chair', './img/chair.jpg');
new Product('Great Old One', './img/cthulhu.jpg');
new Product('Dog in Disguise', './img/dog-duck.jpg');
new Product('Rehydrated Dragon Meat', './img/dragon.jpg');
new Product('Business Lunch Pen Caps', './img/pen.jpg');
new Product('Dog Slippers', './img/pet-sweep.jpg');
new Product('Pizza Scissors', './img/scissors.jpg');
new Product('Shark Skin Sleeping Bag', './img/shark.jpg');
new Product('Coral Reef Baby Costume', './img/sweep.png');
new Product('Cozy Grey Goat Sleeping Bag', './img/tauntaun.jpg');
new Product('Authentic Unicorn Meat', './img/unicorn.jpg');
new Product('Mistake', './img/water-can.jpg');
new Product('Challenging Wine Glass', './img/wine-glass.jpg');

selectThreeProducts();
showThreeProducts();
