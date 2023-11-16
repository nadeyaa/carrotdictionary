function searchWord() {
  // Get the value of the input field with the id 'Word'
  const Word = document.getElementById('Word').value;

  // Construct the API endpoint using the entered word
  const endpoint = `https://api.dictionaryapi.dev/api/v2/entries/en/${Word}`;

  // Use the Fetch API to make a network request to the dictionary API
  fetch(endpoint)
    .then(response => {
      // Check if the response is not OK (HTTP status code outside the range 200-299)
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      // Parse the response as JSON and return it
      return response.json();
    })
    .then(data => {
      // Check if the returned data is an array and has at least one entry
      if (Array.isArray(data) && data.length > 0) {
        // Extract relevant information from the first entry in the data array
        const wordData = data[0];
        const word = wordData.word;
        const meanings = wordData.meanings;

        // Initialize an empty string to store the HTML output
        let definitionOutput = '';

        // Loop through each meaning of the word
        meanings.forEach(meaning => {
          // Extract part of speech and definitions for each meaning
          const partOfSpeech = meaning.partOfSpeech;
          const definitions = meaning.definitions;

          // Loop through each definition for the current meaning
          definitions.forEach(definition => {
            // Extract information for each definition
            const meaningText = definition.definition;
            const antonymsArray = definition.antonyms;
            const antonyms = antonymsArray && antonymsArray.length > 0 ? antonymsArray.join(', ') : 'N/A';
            const example = definition.example || 'N/A';
            const soundUrl = wordData.phonetics && wordData.phonetics.length > 0 ?
              wordData.phonetics[0].audio : 'N/A';

            // Build the HTML output for each definition
            definitionOutput += `
              <h3>${word} (${partOfSpeech})</h3>
              <p>Meaning: ${meaningText}</p>
              <p>Antonyms: ${antonyms}</p>
              <p>Example: ${example}</p>
              <audio controls>
                <source src="${soundUrl}" type="audio/mpeg">
              </audio>
            `;
          });
        });

        // Set the HTML output in the element with the id 'definition'
        document.getElementById("definition").innerHTML = definitionOutput;
      } else {
        // If no definition is found, display a message
        document.getElementById("definition").innerHTML = `No definition found for the word "${Word}".`;
      }
    })
    .catch(error => {
      // Handle errors that occur during the fetch operation
      console.error('Error:', error);
      document.getElementById("definition").innerHTML = 'An error occurred while fetching the definition.';
    });
}
