import React, { useEffect } from 'react';

const TranslateComponent = () => {
  useEffect(() => {
    // Include the Google Translate script
    const script = document.createElement('script');
    script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    document.head.appendChild(script);

    // Initialize the Google Translate element
    script.onload = () => {
      // Define googleTranslateElementInit within the component scope
      window.googleTranslateElementInit = () => {
        new window.google.translate.TranslateElement({ pageLanguage: 'en' }, 'google_translate_element');
      };

      // Call the function once the script is loaded
      window.googleTranslateElementInit();
    };

    return () => {
      // Clean up the script on component unmount
      document.head.removeChild(script);
    };
  }, []);

  const changeLanguage = () => {
    const languageSelector = document.getElementById('languageSelector');
    const language = languageSelector.value;

    // Fetch content from Wikipedia for the selected language
    const wikipediaURL = `https://${language}.wikipedia.org/w/api.php?action=query&format=json&titles=Ayurveda&prop=extracts&exintro=true`;

    fetch(wikipediaURL)
      .then(response => response.json())
      .then(data => {
        // Extract content from Wikipedia API response
        const pageId = Object.keys(data.query.pages)[0];
        const content = data.query.pages[pageId].extract;

        // Display Wikipedia content
        displayWikipediaContent(content);
      })
      .catch(error => console.error('Error fetching Wikipedia content:', error));
  };

  const displayWikipediaContent = content => {
    const contentSection = document.getElementById('content');

    // Clear existing content
    contentSection.innerHTML = '';

    // Display Wikipedia content
    const wikipediaContent = document.createElement('div');
    wikipediaContent.innerHTML = content;
    contentSection.appendChild(wikipediaContent);
  };

  return (
    <div>
      <div id="google_translate_element"></div>
      <div>
        {/* <label htmlFor="languageSelector">Select Language: </label> */}
        <select id="languageSelector" onChange={changeLanguage}>
          {/* <option value="en">English</option>
          <option value="es">Spanish</option> */}
          {/* Add more language options as needed */}
        </select>
      </div>
      <div id="content"></div>
    </div>
  );
};

export default TranslateComponent;
