 // Create an array to hold all the sounds
 let sounds = [
    { name: "cool", phonetic: "[kuːl]", meaning: "凉的", file: "sounds/cool.mp3" },
    { name: "hot", phonetic: "[hɒt]", meaning: "热的", file: "sounds/hot.mp3" },
    { name: "warm", phonetic: "[wɔːm]", meaning: "温暖的", file: "sounds/warm.mp3" },
    { name: "snowy", phonetic: "[snəʊi]", meaning: "下雪的", file: "sounds/snowy.mp3" },
    { name: "cold", phonetic: "[kəʊld]", meaning: "冷的", file: "sounds/cold.mp3" },
    { name: "sunny", phonetic: "['sʌni]", meaning: "阳光充足的", file: "sounds/sunny.mp3" },
    { name: "windy", phonetic: "['wɪndi]", meaning: "多风的", file: "sounds/windy.mp3" },
    { name: "cloudy", phonetic: "['klaʊdi]", meaning: "阴天的", file: "sounds/cloudy.mp3" },
    { name: "rainy", phonetic: "['reɪni]", meaning: "多雨的", file: "sounds/rainy.mp3" },
    { name: "outside", phonetic: "['aʊt'saɪd]", meaning: "在户外", file: "sounds/outside.mp3" },
    { name: "be careful", phonetic: "[     ]", meaning: "小心", file: "sounds/be careful.mp3" },
    { name: "weather", phonetic: "['weðə]", meaning: "天气", file: "sounds/weather.mp3" },
    { name: "New York", phonetic: "['njuːleɪd]", meaning: "天气", file: "sounds/New York.mp3" },
    { name: "how about", phonetic: "[    ]", meaning: "……怎么样", file: "sounds/how about.mp3" },
    { name: "degree", phonetic: "[dɪˈɡriː]", meaning: "度", file: "sounds/degree.mp3" },
    { name: "world", phonetic: "[wɜːld]", meaning: "世界", file: "sounds/world.mp3" },
    { name: "London", phonetic: "['lʌndən]", meaning: "伦敦", file: "sounds/London.mp3" },
    { name: "Moscow", phonetic: "[ˈmɒskəʊ]", meaning: "莫斯科", file: "sounds/Moscow.mp3" },
    { name: "Singapore", phonetic: "[ˌsɪŋgəˌpɔː]", meaning: "新加坡", file: "sounds/Singapore.mp3" },
    { name: "Sydney", phonetic: "['sɪdni]", meaning: "悉尼", file: "sounds/Sydney.mp3" },


    // Add more sounds here
];

// Get the card container
let cardContainer = document.getElementById('cards');
// Global variable to hold the currently playing audio
var currentAudio = null;

// For each sound, create a new card and add it to the container
sounds.forEach(function(sound) {
    // Create card and card-content element
    var card = document.createElement('div');
    var cardContent = document.createElement('div');
    card.className = 'card';
    cardContent.className = 'card-content';
    // Append card content to card
    card.appendChild(cardContent);

    // Create card-front and front-center element
    var cardFront = document.createElement('div');
    cardFront.className = 'front';

    var frontCenter = document.createElement('div');
    frontCenter.className = 'front-center';

    cardContent.appendChild(cardFront);
    cardFront.appendChild(frontCenter);

    // Create h2 element
    var fronth2 = document.createElement('h2');
    fronth2.className = 'card-voc';
    fronth2.textContent = sound.name;
    frontCenter.appendChild(fronth2);

    // Create h3 element
    var fronth3 = document.createElement('h3');
    fronth3.className = 'card-phonsym';
    fronth3.textContent = sound.phonetic;
    frontCenter.appendChild(fronth3);

    // Create p element
    var frontp = document.createElement('p');
    frontp.className = 'card-chin';
    frontp.textContent = sound.meaning;
    frontCenter.appendChild(frontp);

    // Create play-button element
    var playButton = document.createElement('button');
    playButton.className = 'btn play-button';
    playButton.innerHTML = '<i class="ri-volume-up-line"></i>';
    frontCenter.appendChild(playButton);
    
    // Create new audio element
    var audio = new Audio(sound.file);

    // careate play-button function
    playButton.addEventListener('click', function() {
        // If there is a currently playing audio, stop it
        if (currentAudio) {
            currentAudio.pause();
            currentAudio.currentTime = 0;
        }
        // Play the new audio
        audio.play();
        // Set the new audio as the currently playing one
        currentAudio = audio;
    });

    // Create flip button for the card front
    var flipButtonFront = document.createElement('button');
    flipButtonFront.className = 'btn flip-button-front';
    flipButtonFront.innerHTML = '反面';
    cardFront.appendChild(flipButtonFront);

    // careate flip-button for the card front function

    flipButtonFront.addEventListener('click', function() {
        // Pause the currently playing audio when flipping
        if (currentAudio) {
            currentAudio.pause();
            currentAudio.currentTime = 0;
            currentAudio = null;
        }
        card.classList.toggle('flipped');  // Add the "flipped" class to the card, or remove it if it's already there
    });

    // create card-back element and backcenter
    var cardBack = document.createElement('div');
    cardBack.className = 'back';

    var backCenter = document.createElement('div');
    backCenter.className = 'back-center';

    cardContent.appendChild(cardBack);
    cardBack.appendChild(backCenter);

    // 语音识别相关元素
    var startButton = document.createElement('button');
    startButton.className = 'btn voice-rec-start';
    startButton.textContent = '开始识别';
    var contentElement = document.createElement('div');
    contentElement.className = 'voice-rec-content';
    var feedbackElement = document.createElement('div');
    feedbackElement.className = 'voice-feedback';
    backCenter.appendChild(startButton);
    backCenter.appendChild(contentElement);
    backCenter.appendChild(feedbackElement);

    // 识别过程
    window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.interimResults = true;
    recognition.lang = 'en-US';
    let isRecording = false;

    recognition.addEventListener('result', e => {
        const transcript = Array.from(e.results)
            .map(result => result[0])
            .map(result => result.transcript)
            .join('')
        contentElement.textContent = transcript;
        if(e.results[0].isFinal) {
            if (transcript.trim().toLowerCase() === fronth2.textContent.toLowerCase()) { // Replace 'hello' with the word(s) you want to match
                feedbackElement.textContent = 'Good job!';
            } else {
                feedbackElement.textContent = 'Try again!';
            }
            // 清空识别内容区域
            // setTimeout(() => {
            //     contentElement.textContent = '';
            // }, 2000);
        }
    });

    recognition.addEventListener('end', () => {
        if (isRecording) {
            recognition.start();
        }
    });
    startButton.addEventListener('click', () => {
        if(isRecording) {
            recognition.stop();
            startButton.textContent = '开始识别';

            // setTimeout(() => {
            //     contentElement.textContent = '';
            //     feedbackElement.textContent = '';
            // }, 2000);
         } else {
            recognition.start();
            startButton.textContent = '停止识别';
        }
        isRecording = !isRecording;
    });

    // Create flip button for the card back
    var flipButtonBack = document.createElement('button');
    flipButtonBack.className = 'btn flip-button-back';
    flipButtonBack.textContent = '正面';
    cardBack.appendChild(flipButtonBack);

    // careate flip-button for the card back function

    flipButtonBack.addEventListener('click', function() {
        // If there is a currently playing audio, stop it
        if (currentAudio) {
            currentAudio.pause();
            currentAudio.currentTime = 0;
            currentAudio = null;
        }
        card.classList.toggle('flipped');  // Add the "flipped" class to the card, or remove it if it's already there
    });

    // Append card to card container
    cardContainer.appendChild(card);
});
