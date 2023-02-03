let darkMode = localStorage.getItem('darkMode')
const toggleBtn = document.querySelector(".toggle-mode");
const body = document.querySelector("body");

const header = document.querySelector(".title");
const phonetic = document.querySelector('.phonetic')
const pos = document.querySelector('.pos')
const def = document.querySelector('.definition')
const example = document.querySelector('.example')
const syns = document.querySelector('.syns')
const source = document.querySelector('.source')
const define = document.getElementById("define");

const enableDarkMode = () => {
  body.classList.add('dark-mode')
  localStorage.setItem('darkMode', 'enabled')
  toggleBtn.innerHTML = "light";
}

const disableDarkMode = () => {
  body.classList.remove('dark-mode')
  localStorage.setItem('darkMode', null)
  toggleBtn.innerHTML = "dark";
}

if (darkMode === 'enabled') {
  enableDarkMode()
}


toggleBtn.addEventListener("click", () => {

  darkMode = localStorage.getItem('darkMode')

  if (darkMode !== 'enabled') {
    enableDarkMode()
  } else {
    disableDarkMode()
  }

});

async function getDefinition() {
  const word = document.getElementById("word").value;
  const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    console.log(data);

    if (data[0]) {
      const title = data[0].word;
      const definition = data[0].meanings[0].definitions[0].definition;
      const phone = data[0].phonetic
      const partOfSpeech = data[0].meanings[0].partOfSpeech
      header.textContent = `${title}`;
      phonetic.textContent = `${phone}`
      pos.textContent = `${partOfSpeech}`
      def.textContent = `${definition}`;
      if (data[0].meanings[0].definitions[0].example) {
        const exam = data[0].meanings[0].definitions[0].example
        example.textContent = `'${exam}'`
      } else {
        example.textContent = 'No examples available'
      }
      const synonyms = data[0].meanings[0].synonyms
      for (let i = 0; i < synonyms.length; i++) {
        syns.textContent += `${synonyms[i]}, \n`
      }

      const src = data[0].sourceUrls[0]
      source.href = `${src}`
      source.textContent = `${src} `

    } else {
      header.textContent = "No definition found";
    }
  } catch (error) {
    console.error(`Error fetching definition: ${error}`);
  }

  document.getElementById("word").value = "";
}
