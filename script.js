let timerID;

//on language change the input is translated
let changeLang = () =>{
    main();
}

//getting the list of languages and appending to select
let getLang = async () =>{
    const res = await fetch("https://libretranslate.de/languages");

    let data = await res.json();

    let lang = document.getElementById('lang');

    data.forEach(({code,name}) =>{
        let options = document.createElement('option');

        options.value = code;

        options.textContent = name;

        lang.append(options);
    });

    // console.log(data);
}
getLang();

// main fucntion where the output is shown
let main = async () =>{
    let input = document.getElementById('input').value;

    let lang = document.getElementById('lang').value;

    let diff = await getChangeLang(input,lang);

    if(diff === undefined){
        return false;
    }

    let output = document.getElementById('output');

    output.textContent = diff;
}

//input language is translated
let getChangeLang = async (i,l) =>{
    const res = await fetch("https://libretranslate.de/translate", {
	    method: "POST",
	    body: JSON.stringify({
		    q: `${i}`,
		    source: "en",
		    target: `${l}`,
	    }),
	    headers: { "Content-Type": "application/json" }
    });

    let data = await res.json();

    // console.log(data);

    return data.translatedText;
}

//delay time for api call
let wait = (f,t) =>{
    if(timerID){
        clearTimeout(timerID);
    }

    timerID = setTimeout(() =>{
        f();
    },t)
}