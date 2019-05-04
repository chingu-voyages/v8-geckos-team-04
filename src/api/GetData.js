import axios from 'axios'; 

export default async function GetData() {
  const API_URL = 'https://still-taiga-98730.herokuapp.com/api/videos/next';
  const VIDEO_URL = 'https://www.youtube.com/embed/';

  // Clear localStorage
  // localStorage.clear();
  const localStorageKey = 'stored_languages';
  let new_languages = []; 

  try {
    const response = await axios.get(API_URL, { crossdomain: true })
    // console.log(response.data.next_videos);
    // console.log(response.data.next_videos[0].language_video[0].quiz[0].language_choice);
    // console.log(response.data.next_videos[0].youtube_video.youtube_uuid);
    if (response) {
      let url = '';
      for (let i = 0; i < 10; i++) {
          url = VIDEO_URL + response.data.next_videos[i].youtube_video.youtube_uuid;
          new_languages.push({
            id: i,
            url: url,
            start_time: response.data.next_videos[i].language_video[0].start_time,
            end_time: response.data.next_videos[i].language_video[0].end_time,
            language: response.data.next_videos[i].language_video[0].quiz[0].language_choice
          });
      }
      // Store new_language array in localStorage
      localStorage.setItem(localStorageKey, JSON.stringify(new_languages));
      // console.log(new_languages)
    }
  } catch(error) {
    console.error(error);
  }
}