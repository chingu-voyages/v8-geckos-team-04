
/**
 * Find the starting index of the language name from the title of a video.
 * @param {title} Full title of video from YouTube JSON.
 * @return {startindex} Starting index in title where language name begins. 
 */
export function getTitleStartIndex(title) {

    let startindex = -1;
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


/**
 * Find the language(s) for the video from the start index of the title string.
 * @param {title} Full title of the video from YouTube JSON.
 * @param {startindex} Starting index in title where language name begins.
 * @return {language_array} All the languages used in this particular video. 
 */
export function getLanguageFromTitleStartIndex(startindex, title) {

    let language = title.slice(startindex);
    // Check to see if "language" variable contains multiple languages. First delimit languages in
    // the title sentence with '|' character.
    let delimit_languages = language.replace(/(\s+&\s+|,\s+and\s+|\s+and\s+|,\s+)/gi,'|');
    // now create an array of languages from splitting them between the delimiter.
    let language_array = delimit_languages.split('|');

    return language_array;

}


/**
 * Sort the languages array.
 * @param {propName} The property of the languages we want to sort by.
 * @return The sorted languages array. 
 */ 
export function sortLanguages(propName) {

    return (a, b) => a[propName] === b[propName] ? 0 : a[propName] < b[propName] ? -1 : 1;

}

