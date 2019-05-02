import React, { useState, useEffect, memo } from 'react';
import { Route } from 'react-router-dom';
import { useGlobal } from 'reactn';

function Video() {

  const [videoId, setVideoId] = useState();
  const [videoTitle, setVideoTitle] = useState();
  const [videoSrc, setVideoSrc] = useState();
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  const [choices, setChoices] = useState([]);
  const [answer, setAnswer] = useState();
  const [feedback, setFeedback] = useState();
  const [clicked, setClicked] = useState(false);
  const [global, setGlobal] = useGlobal();

  // get localStorage data
  const localStorageScoreKey = 'usrName_localScores';
  const localStorageLanguagesKey = 'stored_languages';
  if (!localStorage.getItem(localStorageScoreKey)) {
    localStorage.setItem(localStorageScoreKey, JSON.stringify([]));
  }
  const localScores = JSON.parse(localStorage.getItem(localStorageScoreKey));
  const localLanguages = JSON.parse(localStorage.getItem(localStorageLanguagesKey));
  const [languageIndex, setlanguageIndex] = useState(0);
  //console.log(local_languages)

  // next and submit button
  const nextButton = <button className='next-btn' onClick={() => handleNext()}>Next</button>
  const submitButton = <Route render={({history}) => (
        <button onClick={() => { handleSubmit(); history.push('/score') }}>
          Submit
        </button>
      )} />
  const [nextBtn, setNextBtn] = useState(); 

  // Use useEffect to get an initial video to start the game.
  useEffect(() => {
    return handleNext(); 
  },[]);

  function handleUserChoice(e) {
    setClicked(true);
    // Show next/submit button
    // Switch from next button to submit button when qNum hits 10
    if (global.qNum === 10) {
      setNextBtn(submitButton)
    }
    else {
      setNextBtn(nextButton);
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
    // When a game ends, if user click back button from the browser, 
    // a new game starts and score will be reset to 0.
    if (global.qNum === 0) {
      setGlobal({score: 0});
    }
    setNextBtn(); // Hide next button
    setFeedback(); // Hide feedback div
    setClicked(false); // Enable choice buttons
    setChoices([]); // Clear previous choices

    setVideoId(languageIndex);
    setVideoTitle('Language_' + languageIndex);
    setVideoSrc(localLanguages[languageIndex].url);
    setStartTime(localLanguages[languageIndex].start_time);
    setEndTime(localLanguages[languageIndex].end_time);

    let newChoices = [];
    for (let i = 0; i < localLanguages[languageIndex].language.length; i++) {
        newChoices.push(localLanguages[languageIndex].language[i].language.name);
        if (localLanguages[languageIndex].language[i]['correct?']) {
          setAnswer(newChoices[i]);
        }
    }
    setChoices(newChoices);
    setlanguageIndex(languageIndex + 1); // go to the next item in localLanguage array
    setGlobal({qNum: global.qNum + 1}); // Increase question number by 1
  }

  function handleSubmit() {
    const newScore = {
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
      score: global.score
    }
    localScores.push(newScore);
    localStorage.setItem(localStorageScoreKey, JSON.stringify(localScores));
    setGlobal({qNum: 0});
  }

  const choiceBtns = choices.map((item) => 
    <button id={item} key={item} onClick={(e) => {handleUserChoice(e)}} disabled={clicked}>{item}</button>);

  return (
    <div className="video">
      <div className="youtube-video-wrapper">
        <div className='title-blocker'>
          <img id='imagehidestitle' src='./images/titlecover.jpg' alt='' />
        </div>
        <div id='whatlanguage'>
          What language do you think it is?
        </div>
        <iframe id={videoId} width="560" height="349" className='youtube-video-iframe' 
          title={videoTitle} src={videoSrc+'?start='+startTime+'&end='+endTime+'&autoplay=1'}></iframe>
      </div>
      <div className='choices'>
        {choiceBtns}
      </div>
      <div className='feedback'>
        {feedback}
      </div>
      {nextBtn}
    </div>
  );
}

export default memo(Video);