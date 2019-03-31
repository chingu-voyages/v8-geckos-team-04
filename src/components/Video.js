import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import { useGlobal } from 'reactn';

function Video() {
  // Variable initialVideo & initialVideoTitle for testing only, can be deleted when the function is done
  const initialVideo = 'https://www.youtube.com/embed/3FGc0zaIg2k';
  const initialVideoTitle = 'English Speaking Vid';

  // const [videoId, setVideoId] = useState(0);
  const [videoSrc, setVideoSrc] = useState(initialVideo);
  const [videoTitle, setVideoTitle] = useState(initialVideoTitle);  
  const [choice1, setChoice1] = useState('choice1'); // initial value for testing only
  const [choice2, setChoice2] = useState('choice2'); // initial value for testing only
  const [choice3, setChoice3] = useState('choice3'); // initial value for testing only
  const [answer, setAnswer] = useState('choice2'); // initial value for testing only
  const [feedback, setFeedback] = useState();
  const [clicked, setClicked] = useState(false);
  const [global, setGlobal] = useGlobal();

  // next and submit button
  const nextButton = <button className='next-btn' onClick={() => handleNext()}>Next</button>
  const submitButton = <Route render={({history}) => (
        <button onClick={() => { handleSubmit(); history.push('/score') }}>
          Submit
        </button>
      )} />
  const [next, setNext] = useState(); 

  // get localStorage data
  const scores = [];
  const localStorageKey = 'usrName_localScores';
  if (!localStorage.getItem(localStorageKey)) {
    localStorage.setItem(localStorageKey, JSON.stringify(scores));
  }
  const localScores = JSON.parse(localStorage.getItem(localStorageKey));

  // A function is needed to choose video src, choices and answer
  function chooseAVideo() {

    var uniq = {};
    let uniquelanguages = global.languages.filter(obj => !uniq[obj.language] && (uniq[obj.language] = true));

    let randomvideos = [];
    for (let i = 0; i < 3; i++) {
      let rand = uniquelanguages[Math.floor(Math.random() * uniquelanguages.length)];
      randomvideos.push(rand);
    }
    
    // Out of the 3 videos chosen at random from the data set, select 1 random one to show and be the correct answer.
    let chosenindex = Math.floor(Math.random() * randomvideos.length);

    let chosen = randomvideos[chosenindex];

    // setVideoId(chosen.id);
    setVideoSrc(chosen.url);
    setVideoTitle(chosen.language);
    setChoice1(randomvideos[0].language);
    setChoice2(randomvideos[1].language);
    setChoice3(randomvideos[2].language);
    setAnswer(chosen.language);
  }

  function handleUserChoice(e) {
    setClicked(true);
    // Show next/submit button
    // Switch from next button to submit button when qNum hits 10
    if (global.qNum === 10) {
      setNext(submitButton)
    }
    else {
      setNext(nextButton);
    }

    // Show feedback
    if (e.target.id === answer) {
      setFeedback('You are correct!');
      setGlobal({score: global.score + 10});
    }
    else {
      setFeedback('Oops! The answer was ' + answer);
    }
  }

  function handleNext() { 
    setNext();
    setFeedback(); // Hide feedback div
    setClicked(false); // Enable choice buttons

    // Reset chosen video and choices to defaults to clear.
    setVideoSrc();
    setVideoTitle();
    setChoice1();
    setChoice2();
    setChoice3();
    setAnswer();

    chooseAVideo(); // Select the next random video.
    setGlobal({qNum: global.qNum + 1});  
  }

  function handleSubmit() {
    const newScore = {
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
      score: global.score
    }
    localScores.push(newScore);
    localStorage.setItem(localStorageKey, JSON.stringify(localScores));
  }

  return (
    <div className="video">
      <p className='video-title'>What language do you think it is?</p>
      <div className="youtube-video-wrapper">
        <iframe width="560" height="349" className='youtube-video-iframe' 
          title={videoTitle} src={videoSrc+'?start=5&end=120&autoplay=1&mute=1'}></iframe>
      </div>
      <div className='choices'>
        <button id={choice1} onClick={(e) => {handleUserChoice(e)}} disabled={clicked}>{choice1}</button>
          <button id={choice2} onClick={(e) => {handleUserChoice(e)}} disabled={clicked}>{choice2}</button>
            <button id={choice3} onClick={(e) => {handleUserChoice(e)}} disabled={clicked}>{choice3}</button>
      </div>
      <div className='feedback'>
        {feedback}
      </div>
      {next}
    </div>
  );
}

export default Video;
