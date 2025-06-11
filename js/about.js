//Gather all accordion items, attach a click event handler to them
// - for each accordion item when clicked, discover the child
// - "content" element and animate it to slide down or up

document.addEventListener('DOMContentLoaded', function() {
  // Get all accordion elements
  const accordians = document.querySelectorAll('.accordian');
  
  // Add click event listener to each accordion
  accordians.forEach(accordian => {
    const header = accordian.querySelector('.header');
    const content = accordian.querySelector('.content');
    
    // Initially hide all content and set up for animation
    content.style.display = 'none';
    content.style.maxHeight = '0';
    content.style.overflow = 'hidden';
    content.style.transition = 'max-height 0.3s ease-out';
    
    // Add click event to the header
    header.addEventListener('click', function() {
      // Toggle content visibility with slide animation
      if (content.style.display === 'none' || content.style.display === '') {
        // Show content first to calculate height
        content.style.display = 'block';
        content.style.maxHeight = '0';
        
        // Trigger reflow and animate
        setTimeout(() => {
          content.style.maxHeight = content.scrollHeight + 'px';
          // Rotate the caret icon when open
          header.querySelector('i').style.transform = 'rotate(180deg)';
          header.querySelector('i').style.transition = 'transform 0.3s';
        }, 10);
      } else {
        // Slide up animation
        content.style.maxHeight = '0';
        // Reset the caret icon when closed
        header.querySelector('i').style.transform = 'rotate(0deg)';
        
        // Hide after animation completes
        setTimeout(() => {
          if (content.style.maxHeight === '0px') {
            content.style.display = 'none';
          }
        }, 300); // Match the transition duration
      }
    });
  });
});
