document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('showSectionsBtn').addEventListener('click', function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      if (tabs[0]) {
        chrome.scripting.executeScript({
          target: {tabId: tabs[0].id},
          files: ['content.js']
        }, (injectionResults) => {
          if (chrome.runtime.lastError || !injectionResults || !injectionResults.length) {
            console.error("Script injection failed: ", chrome.runtime.lastError);
            // Optionally, inform the user via an alert in the popup,
            // or by changing text in popup.html
            // For example: document.body.innerHTML = "<p>Error injecting script. Make sure you are on a Moodle page.</p>";
          }
        });
      } else {
        console.error("Could not find active tab.");
      }
    });
  });
});