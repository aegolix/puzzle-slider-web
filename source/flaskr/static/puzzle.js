var _createPuzzle = function createPuzzle(n, numLabels){
    const template = document.createElement('template');

    template.innerHTML = `
    <h1>Hello, World!</h1>
    <p>And all who inhabit it 
    `
    +n+
    `
     </p>
    `;

    return template
};

module.exports.createPuzzle = _createPuzzle;