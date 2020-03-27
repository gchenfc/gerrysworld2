
// const axios = require('axios');

const MAX_IMAGE_SIZE = 100000;

    // name: 's3uploader',
    // data () {
    // return {
    //     image: '',
    //     uploadURL: ''
    // }
    // },
image = '';
uploadURL = '';

function test() {
    console.log('test');
}

var fileTypes = ['bib', 'jpg'];  //acceptable file types

function    onFileChange (e) {
        let files = e.files
        if (!files.length) return
        createImage(files[0])
    }
function    createImage (file) {
        // var image = new Image()
        let reader = new FileReader()
        reader.onload = (e) => {
        console.log('length: ', e.total)
        // if (!e.target.result.includes('data:application/octet-stream')) {
        //     return alert('Wrong file type - bib only, "octet-stream".')
        // }
        // if (!e.target.result.includes('data:image/jpeg')) {
        //     return alert('Wrong file type - JPG only.')
        //   }
        if (e.target.result.length > MAX_IMAGE_SIZE) {
            return alert('Image is loo large - 100kb maximum')
        }
        image = e.target.result
        }
        var extension = file.name.split('.').pop().toLowerCase();  //file extension from input file
        console.log(extension)
        if (fileTypes.indexOf(extension) > -1) {
            reader.readAsDataURL(file)
            console.log('file choose success')
            document.getElementById("removeimgbutton").hidden = false;
            document.getElementById("uploadimgbutton").hidden = false;

        } else {
            removeImage();
            alert('Wrong file type - .bib only');
        }

    }

function    removeImage (e) {
        console.log('Remove clicked')
        image = ''
        document.getElementById('inputfile').value = '';
        document.getElementById("removeimgbutton").hidden = true;
        document.getElementById("uploadimgbutton").hidden = true;
    }
async function    uploadImage (e) {
        console.log('Upload clicked')
        document.getElementById('result').innerHTML = "<h3>Uploading...</h3>";
        // Get the presigned URL
        const response = await axios({
        method: 'GET',
        url: `https://ffrx6e59wf.execute-api.us-east-2.amazonaws.com/default/bibFileUploader`
        })  
        let key = response.data.filename;
        console.log('Response: ', response.data)
        console.log('Uploading: ', image)
        let binary = atob(image.split(',')[1])
        let array = []
        for (var i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i))
        }
        let blobData = new Blob([new Uint8Array(array)], {type: 'application/octet-stream'})
        console.log('Uploading to: ', response.data.uploadURL)
        const result = await fetch(response.data.uploadURL, {
        method: 'PUT',
        body: blobData
        })
        console.log('Result: ', result)
        // Final URL for the user doesn't need the query string params
        uploadURL = response.data.uploadURL.split('?')[0]
        document.getElementById('result').innerHTML = "<h3>Converting...</h3>";
        convertImage(e, key);
    }

async function convertImage(e, key) {
    var url = new URL("https://3tgc1pad0b.execute-api.us-east-2.amazonaws.com/default/bib2html2"),
        params = {key:key}
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))   
    
    const response = await axios.get(url);
    const response2 = await axios(response.data.Location);

    document.getElementById('htmllink').href = response.data.Location;
    document.getElementById('htmllink').hidden = false;
    document.getElementById('result').innerHTML = response2.data;
    document.getElementById('uploadcontainer').style.cssFloat = 'none';
    document.getElementById('resultcontainer').style.cssFloat = 'none';
}
    // }
// }
