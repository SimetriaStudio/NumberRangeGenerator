let starting = document.querySelector('#starting');
let ending = document.querySelector('#ending');
let outButton = document.querySelector('#out');
let clearButton = document.querySelector('#clear');
let copyButton = document.querySelector('#copy');
let output = document.querySelector('#output');
let select = document.querySelector('#select');
let notification = document.querySelector('#notification');

let range = [];
let exit = false;

let inputs = document.querySelectorAll('.inputGroup input');
let footerYear = document.querySelector('#year');


// --------------------------------
// ----- MAIN EVENT LISTENERS -----
// --------------------------------

// Clear Button Click Event Listener - Clear DOM
clearButton.addEventListener('click', () => {
   range = []; // clear range array
   output.innerHTML = ''; // clear output div
   starting.value = ''; // clear input field
   ending.value = ''; // clear input field
   select.value = ''; // clear select textarea
   clearButton.style.display = 'none'; // hide clear button
   copyButton.style.display = 'none'; // hide copy button
   inputs.forEach((inp) => {
      inp.classList.remove('hasValue'); // remove class from input fields
   });
});

// Output Button Click Event Listener - Run Functions
outButton.addEventListener('click', () => {
   range = []; // clear range array
   output.innerHTML = ''; // clear output div
   select.value = ''; // clear select textarea
   if(isNaN(starting.value) || isNaN(ending.value)){
      notificationFunc('error', 'You may only enter numbers in the input fields!');
      isNaN(starting.value) ? starting.focus() : ending.focus(); // auto foucs on appropriate input
      isNaN(starting.value) ? starting.value = '' : ending.value = ''; // clear appropriate input
   } else if(starting.value === '' || ending.value === ''){
      notificationFunc('error', 'You must fill out all the input fields');
      starting.value === '' ? starting.focus() : ending.focus(); // auto foucs on appropriate input
   } else {
      showLoading(output);
      setTimeout(() => {
         makeRange(starting.value, ending.value);
         placeInDom(output, range);
      }, 100);
   }
});

// Copy Button Click Event Listener - copy range to clipboard
copyButton.addEventListener('click', () => {
   select.select();
   document.execCommand('copy');
   notificationFunc('success', 'Range copied to clipboard!');
});

// click X on notification bar to remove it from view
notification.addEventListener('click', () => {
   notification.classList = '';
   notification.innerHTML = '';
});


// --------------------------------
// ----- MAIN FUNCTIONS -----------
// --------------------------------


// Show Loader
function showLoading(div){
   div.innerHTML = `<img id="loader" src="./imgs/loading.gif" />`;
}

// Make Range Function
function makeRange(starting, ending){
   if(starting >= ending){
      notificationFunc('error', 'The starting number must be smaller than the ending number!');
      exit = true;
   } else if( (ending - starting) >= 15000) {
      notificationFunc('error', 'The difference between the 2 numbers cannot be greater than 15,000');
      exit = true;
   } else {
      exit = false;
      for(let i = starting; i <= ending; i++){
         range.push(parseInt(i));
         select.value += parseInt(i) + ' \n'; // Insert into hidden textarea
      }
   }
}

// Create Ul and Lis and output in DOM
function placeInDom(div, data){
   div.innerHTML = '';
   if(exit !== true){
      let ul = document.createElement('ul');
      data.forEach((d) => {
         let li = document.createElement('li');
         li.innerHTML = d;
         ul.appendChild(li);
         div.appendChild(ul);
      });
      clearButton.style.display = 'block'; // display clear button
      copyButton.style.display = 'block'; // display copy button
   }
}

function notificationFunc(type, text){
   let cssClass;
   if(type === 'success') {
      cssClass = 'notificationShowSuccess';
   } else if(type === 'error'){
      cssClass = 'notificationShowError';
   }

   notification.classList.add(cssClass);
   notification.innerHTML = text;
   setTimeout(() => {
      notification.classList.remove(cssClass);
      notification.innerHTML = '';
   }, 6000);
}


// --------------------------------------
// ----- DOM STYLINGS SCRIPTS -----------
// --------------------------------------

// Add class to inputs if they are not blank
inputs.forEach((inp) => {
   inp.addEventListener('blur', () => {
      if(inp.value === '') {
         inp.classList.remove('hasValue');
      } else {
         inp.classList.add('hasValue');
      }
   });
});

// Add current year to footer
let dt = new Date();
let yr = dt.getFullYear();
footerYear.innerHTML = yr;
