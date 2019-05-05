import axios from 'axios' // Talk to the backend endpoints.

// The base REST url for getting the videos.
const API_URL = 'https://still-taiga-98730.herokuapp.com/api/languages'
// The base URL for videos.
export const VIDEO_URL = 'https://www.youtube.com/embed/'

/**
 * Connect to endpoint and return the response for processing.
 * @httpMethod The axios http request method that maps to a CRUD operation at the backend.
 * @return The response from the axios request.
 */
export async function handleCRUD (httpMethod = '', uuid = '', name = '') {
    let url = ''
    let data = ''
    let response = ''
    const langobj = {uuid, name}
    switch (httpMethod) {
        case 'get':
            // get all the videos
            url = API_URL
            break
        case 'post':
            // add a new video
            url = API_URL
            data = langobj
            break
        case 'delete':
            // delete a video
            url = API_URL + '/' + uuid
            break
        case 'patch':
            // update a video
            url = API_URL + '/' + uuid
            data = langobj
            break
        default:
            httpMethod = ''
    }
    if (httpMethod) {
       try {
            response = await axios({
                method: httpMethod,
                url,
                data
              })
            //console.log(response)
            if (response.data.deleted_language) {
                alert('Successfully deleted video ' + uuid + ' with language ' + name) // change to show error nicely on page instead.
            }
            if (response.data.updated_language) {
                alert('Successfully updated video ' + uuid + ' with language ' + name) // change to show error nicely on page instead.
            }
            return response
       } catch (err) {
            console.log(err)
       }
    } else {
        console.log('Invalid http method')
    }
}

/**
 * Sort the array of objects by the parameter specified by the user.
 * @param {sortby} The property of the objects we want to sort by. Defaults to 'name'.
 * @return The sorted array. 
 */ 
export function sortTable (sortby) {
    if (sortby === 'name') {
        return (a, b) => a[sortby].toLowerCase() === b[sortby].toLowerCase() ? 0 : a[sortby].toLowerCase() < b[sortby].toLowerCase() ? -1 : 1
    }
    return (a, b) => a[sortby] === b[sortby] ? 0 : a[sortby] < b[sortby] ? -1 : 1
}

