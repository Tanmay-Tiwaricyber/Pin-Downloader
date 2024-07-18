async function downloadPost() {
    const url = document.getElementById('pinterestUrl').value;
    const feedback = document.getElementById('feedback');
    const result = document.getElementById('result');
    
    feedback.innerHTML = '';
    result.innerHTML = '';
  
    if (!url) {
      feedback.innerHTML = 'Please enter a URL';
      return;
    }
  
    try {
      const response = await fetch(`/download?url=${encodeURIComponent(url)}`);
      const data = await response.json();
  
      if (response.ok) {
        result.innerHTML = `
          <h2>${data.title}</h2>
          <p>${data.description}</p>
          <img src="${data.imageUrl}" alt="Pinterest Post">
          <a href="${data.imageUrl}" download>Download Image</a>
        `;
      } else {
        feedback.innerHTML = data.error || 'Error downloading the post';
      }
    } catch (error) {
      console.error(error);
      feedback.innerHTML = 'Error downloading the post';
    }
  }
  