let inputslider = document.querySelector(".slider")
let datalengthdisplay = document.querySelector(".data-lenth")
let passwordDisplay = document.querySelector(".display")
let copyBtn = document.querySelector(".datacopy")
let copyMsg = document.querySelector(".data")
let uppercase = document.querySelector("#upercase")
let lowercase = document.querySelector("#lowercase")
let numbers = document.querySelector("#Numbers")
let symbol = document.querySelector("#symbols")
let indicator = document.querySelector(".indicator")
let generatorBTn = document.querySelector(".generatebtn")
let Allchekbox = document.querySelectorAll("input[type=checkbox]")
let sym = '~`!@#$%^&*()_-+={}[]|:;"<,>.?/';

let password = "";
let passwordlength = 10;
let chekcount = 0;
handleslider();
setindicator("#fff");


// set passwordlength
function handleslider() {
    inputslider.value = passwordlength;
    datalengthdisplay.innerText = passwordlength;
    const min = inputslider.min;
    const max = inputslider.max;
    inputslider.style.backgroundSize = ( (passwordlength - min)*100/(max - min)) + "% 100%";
}
function setindicator(color){
    indicator.style.backgroundColor = color;
}
function getInteger(min, max){
    return Math.floor(Math.random()* (max-min)) + min;
}
function generateRandomNUmber(){
    return getInteger(0,9);
}
function generateLowercase(){
    return String.fromCharCode(getInteger(97,123))
}
function generateUppercase(){
    return String.fromCharCode(getInteger(65,91))
}
function generatesymbol(){
    let rndnumber = getInteger(0,sym.length);
    return sym.charAt(rndnumber);
}

function calculatestrength(){
    let uper = false;
    let lower = false;
    let num = false;
    let hassym = false;
    if(uppercase.checked) uper = true;
    if(lowercase.checked) lower = true;
    if(numbers.checked) num = true;
    if(symbol.checked) hassym = true;
    if(uper && lower && (num || hassym) && passwordlength >=8){
        setindicator("#0f0");
    } else if((lower || uper) && (num || hassym) && passwordlength >= 6){
        setindicator("#f00");
    } else{
        setindicator("#ff0");
    }
}
async function copyContent(){
    try{
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText = "copied";
    }
    catch (e){
        copyMsg.innerText = "Failed";
    }
    copyMsg.classList.add("active");
    setTimeout( ()=>{
        copyMsg.classList.remove("active");
    },2000);
}

function shufflePassword (array){

    for(let i = array.length - 1; i>0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        // [array[i], array[j]] = [array[j], array[i]];
        const temp = array[i];
        array[i] = array[j]
        array[j] = temp
    }
    let str = "";
    array.forEach((el)=>(str += el));
    return str;
}
function handlecheckbox(){
    chekcount = 0;
    Allchekbox.forEach( (checkbox) => {
        if(checkbox.checked)
            chekcount++;
        
    });
    if( passwordlength < chekcount){
        passwordlength = chekcount;
        handleslider();
    }
}
Allchekbox.forEach( (checkbox)=>{
    checkbox.addEventListener('change', handlecheckbox);
})

inputslider.addEventListener('input', (e) =>{
    passwordlength = e.target.value;
    handleslider();
})
 copyBtn.addEventListener('click', () =>{
    if(passwordDisplay.value)
        copyContent();
 })

 generatorBTn.addEventListener('click', ()=>{
    if(chekcount == 0){
        alert("Please select at least one character type to generate a password.")
        return;
    }
    if(passwordlength<chekcount){
        passwordlength = chekcount;
        handleslider();
    }
    password = "";

    let funarr = [];
    if(uppercase.checked)
        funarr.push(generateUppercase);
    if(lowercase.checked)
        funarr.push(generateLowercase);
    if(numbers.checked)
        funarr.push(generateRandomNUmber);
    if(symbol.checked)
        funarr.push(generatesymbol);

    for(let i = 0; i<funarr.length; i++ ){
        password += funarr[i]();
    }
    console.log("addition done");

    for(let i = 0; i<passwordlength-funarr.length; i++){
        let randindex = getInteger(0, funarr.length);
        console.log("randindex" + randindex);
        password += funarr[randindex]();  
    }
    console.log("remaining done");
    password = shufflePassword(Array.from(password));
    console.log("sufferr done");
    passwordDisplay.value= password;
    // calculatestrength() 
 })