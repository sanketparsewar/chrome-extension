let myLeads = [];
const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const ulEL = document.getElementById("ul-el");
const deleteBtn = document.getElementById("delete-btn");
const tabBtn=document.getElementById("tab-btn")
// this is used to store the data into local storage
// localStorage.setItem("myLeads","google.com")

//this is used to get the data stored in localstorage using key
// localStorage.getItem("myLeads")

// this will clear the data inside the localstorage
// localStorage.clear()

// In local storage we cannot store the array so we have to conver the string to array using JSON.parse
// myLeads=JSON.parse(myLeads)
// console.log(typeof myLeads)

const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));

if (leadsFromLocalStorage) {
  myLeads = leadsFromLocalStorage;
  render(myLeads);
}

// this is use to access the url of the current opened tab in chrome
tabBtn.addEventListener("click",function(){
  chrome.tabs.query({active:true,currentWindow:true},function(tabs){
    myLeads.push(tabs[0].url)
    localStorage.setItem("myLeads",JSON.stringify(myLeads))
    render(myLeads)

})

 
  
})

// ---------we can use this also but low performance------
// log the elements from myLeads
// for(let i=0;i<myLeads.length;i++){
// here we are using innerHtml to render the html tags that we have used inside with the data inside double quotes
// ulEL.innerHTML+="<li>"+myLeads[i]+"</li>"
// console.log(myLeads[i])

// here we have an alternative way to use
// create element
// set text content
// append to ul
// const Li=document.createElement("li")
// Li.textContent=myLeads[i]
// ulEL.append(Li)
// }

// ------this is used to increase performance
function render(leads) {
  let listItems = "";
  for (let i = 0; i < leads.length; i++) {
    // here we are adding items to the listItems variable instead of the ulEL.innerHTML

    // listItems+="<li><a target=_'blank' href='"+myLeads[i]+"'>"+myLeads[i]+"</a></li>"

    // to reduce complexity we are creating template string using back tik
    listItems += `
            <li>
            <a target=_'blank' href="${leads[i]}">${leads[i]}</a>
            </li>`;
  }
  ulEL.innerHTML = listItems;
}

inputBtn.addEventListener("click", function () {
  // here we are getting the value from the input field
  myLeads.push(inputEl.value);
//   console.log(myLeads);
  // after geeting the value we are seting input filed to empty
  inputEl.value = "";
  // now we want to store th key value in local storage so
  localStorage.setItem("myLeads", JSON.stringify(myLeads));
  render(myLeads);
  // to check the value is stored in local storage or not
  // console.log(localStorage.getItem("myLeads"))
});
// here dbclick is use for listen to double click
deleteBtn.addEventListener("dblclick", function () {
  localStorage.clear();
  myLeads = [];
  render(myLeads);
});

// In local storage we cannot store the array so we have to conver the array to string using JSON.stringify
// myLeads=JSON.stringify(myLeads)
// console.log(typeof myLeads)
