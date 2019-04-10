//declaring vaiable to store data
var getkeyChracter = null;
var keyPressTime = null;
var timeDifference = null;
var lastPressTime = null;
var currentKeyPress = null;
var lastKeyPress = null;
var timeDelay = 1;
var counter = null;
var timeForNumberValue = null;

/* using concept of event delegation add event listner one parent
and avoid to add many event listeners to specific nodes */
var parentNode = document.getElementById('phone');

//store the refrence of input field to show pressed key character or number
var showResult = document.getElementById('result');

//listen event on parentnode only
parentNode.addEventListener('mousedown',function(e){
    // store the reference of closest button target
    var clickedButton = e.target.closest('button');

    // get childelememt of target node(button)
    var childElement = clickedButton.childNodes;

    //store showresult value in another variable
    var inputFieldData = showResult.value;
    
    //check childelement length if greater then 1 show select span tag text
    if(childElement.length > 1){
        //get chracter in form of array
        getkeyChracter = childElement[1].innerText.split(" ");
    }else{
        //if button node have only text data 
        getkeyChracter = clickedButton.innerText.split("");
    }
    //check timedifferece if its greater to delay time so user is clicked on another key 
    keyPressTime = (new Date).getTime();
    timeDifference = Math.floor((keyPressTime - lastPressTime) / 1000) > timeDelay;
    console.log(timeDifference);

    //store data-value of currentkey pressed
    currentKeyPress = clickedButton.getAttribute("data-value");

    //if the keydown will be more then 1 second then numeric value displayed in inputfield
    clickedButton.addEventListener('mouseup',function(){
        let updatedTime = (new Date).getTime();
        timeForNumberValue = Math.floor((updatedTime-keyPressTime)/1000);
        if(timeForNumberValue > 0.5){
            let numberValue = clickedButton.getAttribute('data-value');
            showResult.value = inputFieldData + numberValue;
        }       
    })

    /*if time difference is greater than delay time or currentkey not 
    equal to laskkey show first character form span tag */ 
    if (timeDifference || (currentKeyPress != lastKeyPress)) {
            counter = 0;
            showResult.value = inputFieldData + getkeyChracter[counter];
    }else{
        //if time difference is less then one get other character in span tag on basis of counter
       counter = counter % getkeyChracter.length;
       inputFieldData =  inputFieldData.split("").join("");
       inputFieldData =  inputFieldData.substring(0,inputFieldData.length - 1);
       showResult.value = inputFieldData + getkeyChracter[counter];
    } 
    //assign updated value 
    lastPressTime = keyPressTime;
    lastKeyPress = currentKeyPress;
    counter++;
})