import React from 'react'

class PhotoInput extends React.Component {
    render() {

        return (
            <div>
                <form action="/upload" method="post" encType="multipart/form-data" id='form'>
                    <input type="file" name="photo" id='photo' onChange={async () => {
                        fetch('/upload', {
                            method: "POST",
                            headers: localStorage.authToken ? { Authorization: 'Bearer ' + localStorage.authToken } : {},
                            body: new FormData(document.getElementById('form'))
                        }).then(res => res.json())
                            .then(response => console.log(JSON.stringify(response.url)))
                    }}
                    />
                </form>
            </div>
        )
    }
}

export default PhotoInput