'use strict';
/* ----------------------------------------------------------------------------------------------------GLOBAL VARIABLES */
const itemSectionElem = document.getElementById('ItemDisplay');
//reference to the HTML section for displaying three items

const resultsSectionElem = document.getElementById('results');
//reference to the HTML section for results

const listSectionElem = document.getElementById('list');

const firstImgElem = document.getElementById('imgOne');
const secondImgElem = document.getElementById('imgTwo');
const thirdImgElem = document.getElementById('imgThree');
//references to the IMG for the three displayed items

let firstProduct = null;
let secondProduct = null;
let thirdProduct = null;
//variables for the three products set to null before they are assigned objects through the selectThreeProducts function

let clickCounter = 0;
//creates click counter and sets it to 0.  Will be increased through the handleClick function.

let seenProductsArray = [];
//creates array of the objects that have been seen on the page





/* ----------------------------------------------------------------------------------------------------CONSTRUTOR FUNCTION */
function Product(productName, imgPath, votes, shown){
  this.productName = productName;
  this.imgPath = imgPath;
  this.votes = votes;
  this.shown = shown;
}
//Creates new instances of Products.

Product.allProducts = [];
//the array of products

console.log(Product.allProducts);





/* ----------------------------------------------------------------------------------------------------CONSTRUCTOR METHODS */
Product.prototype.renderProduct = function (img){
  img.src = this.imgPath;
  img.alt = this.productName;
  this.shown ++;
};
//prototype method that takes the img location and h2 location as arguments, and changes the img elements source and the h2 elements text.  It then increments the products shown property by one.





/* ----------------------------------------------------------------------------------------------------GLOBAL FUNCTIONS */
function pushCreateProduct(productName, imgPath, votes, shown){
  Product.allProducts.push(new Product(productName, imgPath, votes, shown));
}
//Creates a product through the constructor function, and pushes that function to an array.

function selectThreeProducts(){
  if (seenProductsArray.length === 19){
    seenProductsArray = [];
  }
  if (seenProductsArray.length <= 16){
    let firstIndex = getNextIndex();
    firstProduct = Product.allProducts[firstIndex];
    let secondIndex = getNextIndex();
    secondProduct = Product.allProducts[secondIndex];
    let thirdIndex = getNextIndex();
    thirdProduct = Product.allProducts[thirdIndex];
  } else if (seenProductsArray.length === 17){
    let firstIndex = getNextIndex();
    firstProduct = Product.allProducts[firstIndex];
    let secondIndex = getNextIndex();
    secondProduct = Product.allProducts[secondIndex];
    seenProductsArray = [];
    seenProductsArray.push(firstIndex);
    seenProductsArray.push(secondIndex);
    let thirdIndex = getNextIndex();
    thirdProduct = Product.allProducts[thirdIndex];
  } else if (seenProductsArray.length === 18){
    let firstIndex = getNextIndex();
    firstProduct = Product.allProducts[firstIndex];
    seenProductsArray = [];
    seenProductsArray.push(firstIndex);
    let secondIndex = getNextIndex();
    secondProduct = Product.allProducts[secondIndex];
    let thirdIndex = getNextIndex();
    thirdProduct = Product.allProducts[thirdIndex];
  }
}
//selects three objects making sure all objects have been seen.

function getNextIndex(){
  let index = Math.floor(Math.random() * Product.allProducts.length);
  while (seenProductsArray.indexOf(index) > -1){
    index = Math.floor(Math.random() * Product.allProducts.length);
  }
  seenProductsArray.push(index);
  return index;
}
//checks if index number is in the array.  If it is it will find a number not in the array and return that number.

function showThreeProducts(){
  firstProduct.renderProduct(firstImgElem);
  secondProduct.renderProduct(secondImgElem);
  thirdProduct.renderProduct(thirdImgElem);
}
//renders the three products on the page using the renderProduct method by taking the img element and h2 element locations.

function renderResults(){
  const ulElem = document.createElement('ul');
  listSectionElem.appendChild(ulElem);
  for(let product of Product.allProducts){
    const liElem = document.createElement('li');
    liElem.textContent = `${product.productName}: Views:${product.shown} Picks:${product.votes}`;
    ulElem.appendChild(liElem);
  }
}
//function to create unordered list and append each items results as list items in the UL.

function makeResultsChart(){
  const canvasElem1 = document.getElementById('resultsChart').getContext('2d');
  // const canvasElem2 = document.getElementById('percentageChart').getContext('2d');
  //variables referencing the two DOM locations for the Canvas tag elements
  let productNames = [];
  let productVotes = [];
  let productViews = [];
  let clickPercent = [];
  //declaring variables for the data arrays

  for (let product of Product.allProducts){
    productNames.push(product.productName);
    productVotes.push(product.votes);
    productViews.push(product.shown);
    clickPercent.push(product.votes / product.shown * 100);
  }
  //generates the four data arrays

  // const myChart1 = new Chart(canvasElem2, {
  //   type: 'bar',
  //   data: {
  //     labels: productNames,
  //     datasets: [{
  //       label: 'Percentage of Clicks per Views',
  //       data: clickPercent,
  //       backgroundColor: 'rgba(107,178,140,.2)',
  //       borderColor: 'rgb(107,178,140)',
  //       borderWidth: 1,
  //     }]
  //   },
  //   options: {
  //     scales: {
  //       y: {
  //         beginAtZero: true
  //       }
  //     }
  //   }
  // });
  // //myChart1 is a variable housing the bar chart for percentage data
  const myChart2 = new Chart(canvasElem1, {
    type: 'bar',
    data: {
      labels: productNames,
      datasets: [{
        label: '# of Votes',
        data: productVotes,
        backgroundColor: 'rgba(120,28,129,.2)',
        borderColor: 'rgb(120,28,129)',
        borderWidth: 1,
      }, {
        label: '# of Views',
        data: productViews,
        backgroundColor: 'rgba(210,179,63,.2)',
        borderColor: 'rgb(210,179,63)',
        borderWidth: 1,
      }]
    },
  });
  //myChart2 is a radar graph showing the number of votes and # of views for each Product
}
//RENDERS THE DATA TABLE

function newPushAndcreate(){
  if (Product.allProducts.length === 0){
    pushCreateProduct('Star Wars Bag', './img/bag.jpg', 0, 0);
    pushCreateProduct('Banana Cutter', './img/banana.jpg', 0, 0);
    pushCreateProduct('Bathroom Multitasker', './img/bathroom.jpg', 0, 0);
    pushCreateProduct('Fashion \'Rain\' Boots', './img/boots.jpg', 0, 0);
    pushCreateProduct('Ultimate Breakfast Maker', './img/breakfast.jpg', 0, 0);
    pushCreateProduct('Meat Gum', './img/bubblegum.jpg', 0, 0);
    pushCreateProduct('Time-Out Chair', './img/chair.jpg', 0, 0);
    pushCreateProduct('Cthulhu', './img/cthulhu.jpg', 0, 0);
    pushCreateProduct('Dog in Disguise', './img/dog-duck.jpg', 0, 0);
    pushCreateProduct('Rehydrated Dragon Meat', './img/dragon.jpg', 0, 0);
    pushCreateProduct('Business Lunch Pen Caps', './img/pen.jpg', 0, 0);
    pushCreateProduct('Dog Slippers', './img/pet-sweep.jpg', 0, 0);
    pushCreateProduct('Pizza Scissors', './img/scissors.jpg', 0, 0);
    pushCreateProduct('Shark Food Sleeping Bag', './img/shark.jpg', 0, 0);
    pushCreateProduct('70\'s Fringe Baby', './img/sweep.png', 0, 0);
    pushCreateProduct('Cozy Grey Goat Bag', './img/tauntaun.jpg', 0, 0);
    pushCreateProduct('Authentic Unicorn Meat', './img/unicorn.jpg', 0, 0);
    pushCreateProduct('A Factory Mistake', './img/water-can.jpg', 0, 0);
    pushCreateProduct('Challenging Wine Glass', './img/wine-glass.jpg', 0, 0);
  }
}
//pushes and creates products if the page has no memory of previous results.

function putResultsInStorage(){
  let resultsArrayString = JSON.stringify(Product.allProducts);
  localStorage.setItem('results', resultsArrayString);
}
//takes the product.allproducts array and converts it to a string, and then puts the stringified results into storage.

function getResultsFromStorage(){
  let storageProducts = localStorage.getItem('results');
  //pulls item with key name 'results' from storage and assigns the string to storageProducts
  if (storageProducts){
    let parsedResults = JSON.parse(storageProducts);
    //checks that storageProducts isn't empty, and if it isn't it parses the string retrieved into objects.
    for (let object of parsedResults){
      let newProduct = new Product(object.productName, object.imgPath, object.votes, object.shown);
      Product.allProducts.push(newProduct);
    }
    //cycles through the array of parsedReslts, and creates and pushes a new product into the string of all Products.
  }
}
//pulls the item 'results' from storage and if there is a 'results' package it will parse teh results and create new Products using the saved and parsed objects




/* ----------------------------------------------------------------------------------------------------HANDLER FUNCTIONS */
function handleButton(e){
  let buttonClicked = e.target.id;
  if (buttonClicked === 'resultsbutton'){
    renderResults();
    resultsSectionElem.removeEventListener('click', handleButton);
    makeResultsChart();
    putResultsInStorage();
    document.getElementById('resultsbutton').style.display = 'none';
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





/* ----------------------------------------------------------------------------------------------------LISTENENERS */
itemSectionElem.addEventListener('click', handleClick);
//adds an event listener to the section defined by the itemSectionElem global variable.

resultsSectionElem.addEventListener('click', handleButton);
//event listener for getting results from results button





/* ----------------------------------------------------------------------------------------------------CALL FUNCTIONS */
getResultsFromStorage();
newPushAndcreate();
selectThreeProducts();
showThreeProducts();
