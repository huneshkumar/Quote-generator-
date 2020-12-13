const quoteContainer=document.getElementById("quote-container");
const quoteText=document.getElementById("quote");
const authorText=document.getElementById("author");
const twitterbtn=document.getElementById("twitter");
const newQuotebtn=document.getElementById("new-quote");
const loader =document.getElementById('loader');

function loading(){
    loader.hidden=false;
    quoteContainer.hidden=true;
}
function complete(){
    if(!loader.hidden){
        quoteContainer.hidden=false;
        loader.hidden=true;
    }
    else{
        quoteContainer.hidden=true;
        loader.hidden=false;
    }
}



async function getQuote(){
    loading();
    const proxyApi="https://cors-anywhere.herokuapp.com/";
    const apiUrl="http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";
    try{
        const response = await fetch(proxyApi + apiUrl);
        const data = await response.json();
        if(data.quoteAuthor===""){
            authorText.innerText="unkown";
        }
        else{
            authorText.innerText=data.quoteAuthor;
        }
        if(data.quoteText.length>50){
            quoteText.classList.add("long-quote");
        }
        else{
            quoteText.classList.remove("long-quote");
        }
       
        quoteText.innerText=data.quoteText;

        newQuotebtn.addEventListener('click',getQuote);

        complete();

    }catch(error){
        getQuote();
     

    }
}

 getQuote();


