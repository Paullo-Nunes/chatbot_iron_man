const btn = document.querySelector(".talk");
const content = document.querySelector(".content");

function speak(text) {
  const text_speak = new SpeechSynthesisUtterance(text); //enunciado de síntese de fala

  text_speak.rate = 1; //rate => taxa de velocidade da fala
  text_speak.volume = 1;
  text_speak.pitch = 1; //pitch => campo de texto

  window.speechSynthesis.speak(text_speak);
}

//wishMe => desejo-me

function wishMe() {
  var day = new Date(); //data do dia
  var hour = day.getHours(); //hora no momento

  if (hour >= 0 && hour < 12) {
    speak("Bom dia!");
  } else if (hour >= 12 && hour < 18) {
    speak("Boa Tarde!");
  } else {
    speak("Boa noite!");
  }
};

window.addEventListener("load", () => {
  speak("Inicializando Iron Man...");
  wishMe();
});

//Comandos do usuário

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.onresult = (event) => {
    const currentIndex = event.resultIndex;
    const transcript = event.results[currentIndex][0].transcript;
    content.textContent = transcript;
    takeCommand(transcript.toLowerCase());
};

btn.addEventListener('click', () => {
    content.textContent = "Ouvindo...";
    recognition.lang = "pt-br";
    recognition.start();
});

function takeCommand(message) {
    if (message.includes('ei') || message.includes('olá')) {
        speak("Olá, Como posso ajudá-lo?");
    } else if (message.includes("abrir bing")) {
        window.open("https://www.bing.com", "_blank");
        speak("abrindo Bing");
    } else if (message.includes("abrir youtube")) {
        window.open("https://youtube.com.br", "_blank");
        speak("abrindo youtube");
    } else if (message.includes("abrir facebook")) {
        window.open("https://www.facebook.com", "_blank");
        speak("abrindo Facebook");
    } else if (message.includes('o que é') || message.includes('quem é') || message.includes('o que são')) {
        window.open(`https://www.bing.com/search?q=${message.replace(" ", "+")}`, "_blank");
        const finalText = "Isso é o que eu encontrei na internet a respeito" + message;
        speak(finalText);
    } else if (message.includes('wikipedia')) {
        window.open(`https://pt.wikipedia.org/wiki/${message.replace("wikipedia", " ").trim()}`, "_blank");
        const finalText = "Isto é o que eu encontrei na Wikipédia a respeito" + message;
        speak(finalText);
    } else if (message.includes('hora')) {
        const hora = new Date().toLocaleString(undefined, { hour: "numeric", minute: "numeric" });
        const finalText = "O momento atual é" + hora;
        speak(finalText);
    } else if (message.includes('data')) {
        const data = new Date().toLocaleString(undefined, { month: "short", day: "numeric" });
        const finalText = "A data de hoje é" + data;
        speak(finalText);
    } else if (message.includes("abrir Calculadora")) {
        window.open('Calculadora');
        const finalText = "abrindo Calculadora";
        speak(finalText);
    } else {
        window.open(`https://www.bing.com/search?q=${message.replace(" ", "+")}`, "_blank");
        const finalText = "Encontrei algumas informações para" + message;
        speak(finalText);
    }
}
