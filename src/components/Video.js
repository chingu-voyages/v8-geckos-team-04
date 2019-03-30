import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import { useGlobal, setGlobal } from 'reactn';

function Video() {
  // Variable initialVideo & initialVideoTitle for testing only, can be deleted when the function is done
  const initialVideo = 'https://www.youtube.com/embed/3FGc0zaIg2k';
  const initialVideoTitle = 'English Speaking Vid';

  const [videoId, setVideoId] = useState(0);
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
        <button onClick={() => { history.push('/score') }}>
          Submit
        </button>
      )} />
  const [next, setNext] = useState(); 

  // A function is needed to choose video src, choices and answer
  function chooseAVideo() {

    //console.log(global.languages); /// WTF IS THIS UNDEFINED???
    let randomvideos = [];
    for (let i = 0; i < 3; i++) {
      let rand = global.languages[Math.floor(Math.random() * global.languages.length)];
      console.log(rand);
      randomvideos.push(rand);
    }

    // Out of the 3 videos chosen at random from the data set, select 1 random one to show.
    let chosenindex = Math.floor(Math.random() * randomvideos.length);

    let chosen = randomvideos[chosenindex];

    //console.log(randomvideos[chosen]);

    setVideoId(chosen.id);
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
    chooseAVideo();
    setGlobal({qNum: global.qNum + 1});  
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
