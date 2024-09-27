function formatAIResponse(response) {
    // Define patterns to identify sections like headers and lists
    const headerPatterns = ["Past:", "Present:", "Future:", "Overall Interpretation", "Recommendations"];
    
    // Split response into individual lines
    const lines = response.split('\n').filter(line => line.trim() !== ""); // Remove empty lines
  
    let formattedHTML = '';  // String to store the formatted HTML
    let inList = false;      // Flag to check if we are in a list
  
    lines.forEach((line) => {
      const trimmedLine = line.trim();
  
      // Check for headers (e.g., "Past:", "Present:", etc.)
      if (headerPatterns.some(header => trimmedLine.startsWith(header))) {
        // If we are inside a list, close the list tag
        if (inList) {
          formattedHTML += '</ul>';
          inList = false;
        }
  
        // Add a heading for sections
        formattedHTML += `<h3>${trimmedLine}</h3>`;
      
      // Check for bullet points (lines starting with '*')
      } else if (trimmedLine.startsWith('*')) {
        if (!inList) {
          formattedHTML += '<ul>';
          inList = true;
        }
  
        // Add list items for recommendations or bullet points
        formattedHTML += `<li>${trimmedLine.substring(1).trim()}</li>`;
      
      // Treat other lines as paragraphs
      } else {
        if (inList) {
          formattedHTML += '</ul>';  // Close list tag if we hit a non-list item
          inList = false;
        }
  
        // Add normal paragraphs for any other text
        formattedHTML += `<p>${trimmedLine}</p>`;
      }
    });
  
    // If we're still in a list at the end, close it
    if (inList) {
      formattedHTML += '</ul>';
    }
  
    return formattedHTML;
  }
  
  // Example usage with the AI response (this would be dynamically generated)
  const aiResponse = `## Tarot Reading: Finding Your Intern
  You've drawn three cards: **Ten of Pentacles Reversed, Queen of Pentacles Reversed, and Death Reversed**. This spread will explore your past, present, and future in relation to finding your intern.
  **Past: Ten of Pentacles Reversed**
  This card signifies a disrupted sense of stability and security in the past. You may have experienced challenges with previous interns, had trouble finding the right fit, or faced unforeseen issues that disrupted your workflow. This reversed card also suggests there might be a lack of trust or a feeling of being taken advantage of in your past experiences with interns.
  **Present: Queen of Pentacles Reversed**
  This card signifies a lack of abundance and control in your present situation. You may feel overwhelmed, lack resources, or be struggling to manage your workload effectively, making finding a capable intern challenging. This card also hints at potential issues with communication or a lack of clarity in your expectations for the internship.
  **Future: Death Reversed**
  The Death card reversed signifies a period of stagnation or delay. While this card usually represents transformation, in its reversed form, it suggests that finding an intern might be slower than you anticipate. This could mean experiencing a period of waiting, encountering roadblocks, or facing unexpected delays in the hiring process.
  **Overall Interpretation**
  The cards suggest that finding an intern might require some patience and perseverance. You've faced challenges in the past, and the present situation feels difficult and overwhelming. While the future indicates delays, remember that the Death card reversed also signifies renewal and change.
  **Recommendations**
  * Address past issues: Reflect on your past experiences and identify what went wrong. This will help you avoid repeating the same mistakes.
  * Clarify expectations: Clearly outline the responsibilities and expectations of the internship to avoid miscommunication.
  * Focus on building trust: Create a supportive and collaborative environment to foster a trusting relationship with your intern.
  * Be patient and persistent: Finding the right intern takes time. Don't get discouraged by initial delays.`;
  
  // Convert the AI response to formatted HTML
  document.getElementById('ai-output').innerHTML = formatAIResponse(aiResponse);
  