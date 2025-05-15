async function showAllTileSectionsDynamically() {
    // Select all clickable tile links
    const tileLinks = document.querySelectorAll('ul.tiles > li.tile.tile-clickable > a.tile-link');

    if (!tileLinks.length) {
        console.log('Moodle Tiles Extension: No tile links found. Ensure you are on a Moodle course page with the Tiles format.');
        alert('Moodle Tiles Extension: No tile links found. Are you on the correct Moodle course page?');
        return;
    }

    console.log(`Moodle Tiles Extension: Found ${tileLinks.length} tiles. Attempting to click each one to load its content...`);
    // Optional: Add a visual indicator that the process has started
    let indicator = document.createElement('div');
    indicator.textContent = `Loading ${tileLinks.length} sections... Please wait.`;
    indicator.style.position = 'fixed';
    indicator.style.top = '10px';
    indicator.style.left = '10px';
    indicator.style.backgroundColor = 'rgba(0,0,0,0.7)';
    indicator.style.color = 'white';
    indicator.style.padding = '10px';
    indicator.style.zIndex = '10000';
    indicator.style.borderRadius = '5px';
    document.body.appendChild(indicator);


    for (let i = 0; i < tileLinks.length; i++) {
        const link = tileLinks[i];
        const sectionNumber = link.dataset.section || (i + 1); // Get section identifier

        indicator.textContent = `Loading section ${i + 1} of ${tileLinks.length}...`;
        console.log(`Moodle Tiles Extension: Clicking tile for section ${sectionNumber}...`);
        link.click(); // Simulate a click on the tile's link

        // Wait for a short period. Adjust this delay (in milliseconds) if needed.
        await new Promise(resolve => setTimeout(resolve, 1200)); // Increased slightly
    }

    indicator.textContent = 'Processing final display...';
    console.log('Moodle Tiles Extension: Finished attempting to click all tiles. Now trying to make all section content areas visible.');

    const sectionContents = document.querySelectorAll('li.section.main.moveablesection');

    if (sectionContents.length > 0) {
        sectionContents.forEach(function(sectionContent) {
            sectionContent.style.display = 'block'; // Force display
            sectionContent.classList.remove('hidden');

            const innerContent = sectionContent.querySelector('.content');
            if (innerContent) {
                const summaryElement = innerContent.querySelector('.summary');
                if (summaryElement) {
                    summaryElement.style.display = 'block';
                }
                const sectionUl = innerContent.querySelector('ul.section');
                if (sectionUl) {
                    sectionUl.style.display = 'block';
                }
            }
        });
        console.log(`Moodle Tiles Extension: ${sectionContents.length} section content area(s) processed for visibility.`);
    } else {
        console.log('Moodle Tiles Extension: No section content areas (li.section.main.moveablesection) found after clicking tiles.');
    }

    document.body.removeChild(indicator); // Remove indicator
    alert(`Moodle Tiles Extension: Attempted to load and display all sections. Please scroll to check.`);
    console.log('Moodle Tiles Extension: Script execution finished.');
}

// This function will be called when the popup button is clicked (or automatically if configured differently)
showAllTileSectionsDynamically();