import axios from 'axios'; 
import { getTitleStartIndex, getLanguageFromTitleStartIndex, sortLanguages } from './Helpers';

export default async function GetData() {
  const API_KEY = process.env.REACT_APP_YOUTUBE_DATA_API_V3_KEY;
  const API_URL = 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=20&playlistId=UUBgWgQyEb5eTzvh4lLcuipQ&key=' + API_KEY;
  const VIDEO_URL = 'https://www.youtube.com/embed/';

  // Clear localStorage
  // localStorage.clear();
  const localStorageKey = 'stored_languages';
  let new_languages = []; 
  let nextid = 1;

  try {
    const response = await axios.get(API_URL)
    if (response) {

      let itemslength = response.data.items.length; // Number of results returned this axios call.

      let url = '', title = '';
      for (let i = 0; i < itemslength; i++) {

          url = VIDEO_URL + response.data.items[i].snippet.resourceId.videoId; // Get the url field for the video.
          title = response.data.items[i].snippet.title; // Get the title field of the video.

          let startindex = getTitleStartIndex(title); // Extract the language from the title.

          // Check if a language name still isn't present. If not, do not execute the below for this video.
          if (startindex !== -1) {

              let language_array = getLanguageFromTitleStartIndex(startindex, title);

              // Loop through the language array and add each one to new_languages.
              for (let i = 0; i < language_array.length; i++) {

                  if (language_array[i] !== '') {

                      let trimmed_language = language_array[i].replace(/^\s+/g, "");

                      new_languages.push({
                          id: nextid++,
                          url,
                          starttime: 10,
                          endtime: 120,
                          language: trimmed_language
                      });

                  }

              }
              
          }

      }
      // Sort the languages.
      new_languages.sort(sortLanguages('id'));
      localStorage.setItem(localStorageKey, JSON.stringify(new_languages));
      console.log(new_languages)
    }
  } catch(error) {
    console.error(error);
  }
}