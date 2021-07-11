let input = document.querySelector('#input');
let searchBtn = document.querySelector('#search');
let apiKey ='<YOUR-API-KEY>'
let notFound = document.querySelector('.not-found');
let definition = document.querySelector('.def')
let soundBox = document.querySelector('.audio');
let loading = document.querySelector('.loading');

searchBtn.addEventListener('click',function(e){
    e.preventDefault();
    soundBox.innerHTML='';
    notFound.innerText='';
    definition.innerText=''
    let word=input.value;
    //if input is empty
    if(word===''){
        alert('Word is required')
        return;
    }

    getData(word);
})


async function getData(word){

    loading.style.display='block';
    
    const response = await fetch(`https://www.dictionaryapi.com/api/v3/references/learners/json/${word}?key=${apiKey}`);
    const data = await response.json();
    if(!data.length){
        loading.style.display='none';
        notFound.innerText = 'No result found'
        return;
    }

    //If suggestions found
    if(typeof data[0]==='string'){
        loading.style.display='none';
        let heading = document.createElement('h3');
        heading.innerText=' Did you mean?';
        notFound.appendChild(heading);
        data.forEach(element => {
            let suggestion = document.createElement('span');
            suggestion.classList.add('suggest');
            suggestion.innerText = element;
            notFound.appendChild(suggestion);
        });
        return;
    }
    //If Result found
    loading.style.display='none';
    let define = data[0].shortdef[0];
    definition.innerText=define;

    //To display audio
    const sound = data[0].hwi.prs[0].sound.audio;
    if(!sound){
        return;
    }
  //  console.log(data);

    renderSound(sound);

}


function renderSound(sound){

    let subfolder = sound.charAt(0);
    let soundSrc = `https://media.merriam-webster.com/soundc11/${subfolder}/${sound}.wav?key=${apiKey}`;
    //console.log(soundSrc);
    let audioPlayer = document.createElement('audio');
    audioPlayer.src=soundSrc;
    audioPlayer.controls=true;
    soundBox.appendChild(audioPlayer);    
}