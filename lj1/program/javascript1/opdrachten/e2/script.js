document.addEventListener('DOMContentLoaded', function () {
    const totalBudget = 330; // Bedragen in miljarden euro's.
    const errorSound = new Audio('error.mp3');
    const inputIds = [
        'ministerie1', 'ministerie2', 'ministerie3', 'ministerie4', 'ministerie5',
        'ministerie6', 'ministerie7', 'ministerie8', 'ministerie9', 'ministerie10',
        'ministerie11', 'ministerie12', 'ministerie13', 'ministerie14', 'ministerie15'
    ];

    inputIds.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.addEventListener('input', updateBudget);
        }
    });

    function updateBudget() {
        let budgetElement = document.getElementById('resterend_budget');
        budgetElement.style.color = '#bb86fc';
        let allocatedBudget = 0;

        inputIds.forEach(id => {
            const element = document.getElementById(id);
            if (!element) {
                console.log(`Element with id ${id} not found`);
                return;
            }
            const value = parseInt(element.value.replace(/[^0-9]/g, '')) || 0;
            allocatedBudget += value;
        });

        let remainingBudget = totalBudget - allocatedBudget;
        budgetElement.innerHTML = `Totaal budget: €${totalBudget} miljard <br>Toegekend budget: €${allocatedBudget} miljard <br>Resterend budget: €${remainingBudget} miljard.`;
        if (allocatedBudget > totalBudget) {
            errorSound.play();
            budgetElement.style.color = '#ff0000';
            window.alert('Het totaal toegekende budget mag niet hoger zijn dan het totale budget!');
        }
    }
});