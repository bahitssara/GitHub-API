'use strict';

const apiKey ='a4503af475c2e0deab3e1440a18fb26ac335e541';

function getRepos(searchTerm){
    const url = `https://api.github.com/users/${searchTerm}/repos`;

    const options = {
        headers: new Headers({
          "X-GitHub-OTP": apiKey})
      };

      fetch(url, options)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(response.statusText);
      })
      .then(responseJson => displayResults(responseJson))
      .catch(err => {
        $('#js-error-message').text(`Something went wrong: ${err.message}`);
      });
}

function displayResults(responseJson) {
    console.log(responseJson);
    $('.results').empty();


    responseJson.forEach(repo => {
        $('.results').append(`
            <div class = "results-section">
                <h2>${repo.name}</h2>
                <a href="${repo.clone_url}">Repository</a>
            </div>    
            `)
    });
    $('.results').removeClass('hidden');      
}


function watchForm() {
    $('form').submit(event => {
      event.preventDefault();
      const searchTerm = $('input[name="input-bar"]').val();
      getRepos(searchTerm);
    });

}

$(watchForm);


