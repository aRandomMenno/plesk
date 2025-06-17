document.addEventListener('DOMContentLoaded', () => {
    const toggleElements = ['_oef1', '_oef2', '_oef3', '_spdo'];
    
    const toggleVisibility = (elementId) => {
        const link = document.getElementById(elementId);
        const content = document.getElementById(elementId.substring(1));
        
        link.style.color = link.style.color === 'green' ? 'red' : 'green';
        content.hidden = !content.hidden;
    };

    toggleElements.forEach(id => {
        document.getElementById(id).addEventListener('click', () => toggleVisibility(id));
    });
});
