
/**
 * Find the starting index of the language name from the title of a video.
 * @param {title} Full title of video from YouTube JSON.
 * @return {startindex} Starting index in title where language name begins. 
 */
export function getTitleStartIndex(title) {

    let startindex = '';
    // FIRST check the rest of the string after 'speaking ' is the language(s).
    let findindex = title.lastIndexOf('peaking ');
    if (findindex !== -1) {
        startindex = title.lastIndexOf('peaking ') + 7;
    } else {
        // SECOND since speaking or Speaking is not present, check for signing or Signing:
        // the rest of the string after 'signing ' is the language(s).
        findindex = title.lastIndexOf('igning ');
        if (findindex !== -1) {
            startindex = title.lastIndexOf('igning ') + 6; 
        }
    }

    return startindex;

}


