
// When using file-based operations, creates and writes to the files passed in the array.
export const writeFiles = arr => {

    // get each filename (key) and its content (val) out of the array.
    for (let key in arr) {

        if (arr.hasOwnProperty(key)) {

            let filename = key; // key
            let content = arr[key]; // val

            if (filename) {

                let filepath = './DatabaseFiles/' + filename + '.txt';
                let file = new File([], filepath);

                file.open('w'); // open file with write access.
                file.write(content); // write the content into the file.
                file.close(); // close the file.
                
            }

        }
    }

    return;

}

// When using file-based operations, reads from the file passed.
export const readFiles = filename => {

    if (filename) {

        let filepath = './DatabaseFiles/' + filename;
        let file = new File([], filepath);

        file.open('r'); // open file with read access.
        
        let content = '';
        
        while (!file.eof) {

            // read each line in the file.
            content += file.readlin() + '\n';
        }
        
        file.close(); // close the file.
    }

    return content;

}