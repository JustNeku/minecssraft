const blocks = ['air', 'cobble', 'dirt', 'grass', 'glass', 'tree', 'leaves', 'wood', 'sand', 'gravel'];
const faces = ['back', 'front', 'left', 'right', 'top', 'bottom'];


const generateHtml = () => {
    for (let layer = 0; layer < 9; layer++) {
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                const blockContainer = document.createElement('div');
                blockContainer.classList.add('block-container');
                blockContainer.style.setProperty('--column', col);
                blockContainer.style.setProperty('--row', row);
                blockContainer.style.setProperty('--layer', layer);
                for (let block in blocks) {
                    const radio = document.createElement('input');
                    radio.type = 'radio';
                    radio.name = `col-${col}--row-${row}--layer-${layer}`;
                    radio.value = `col-${col}--row-${row}--layer-${layer}_${blocks[block]}`;
                    radio.id = `col-${col}--row-${row}--layer-${layer}_${blocks[block]}`;
                    radio.checked = blocks[block] == 'air' && layer > 0 || blocks[block] == 'grass' && layer == 0;
                    radio.setAttribute(`data-block`, blocks[block]);
                    blockContainer.appendChild(radio);

                    const blockElement = document.createElement('div');
                    blockElement.classList.add('block');
                    blockElement.classList.add(blocks[block]);

                    for (let face in faces) {
                        const faceElement = document.createElement('label');
                        faceElement.classList.add(faces[face]);

                        let nCol = col;
                        let nRow = row;
                        let nLayer = layer;

                        if (faces[face] == 'front') nRow = row < 8 ? row + 1 : null;
                        if (faces[face] == 'back') nRow = row > 0 ? row - 1 : null;
                        if (faces[face] == 'left') nCol = col > 0 ? col - 1 : null;
                        if (faces[face] == 'right') nCol = col < 8 ? col + 1 : null;
                        if (faces[face] == 'top') nLayer = layer < 8 ? layer + 1 : null;
                        if (faces[face] == 'bottom') nLayer = layer > 0 ? layer - 1 : null;

                        if (nCol != null && nRow != null && nLayer != null) {
                            faceElement.setAttribute('for', `col-${nCol}--row-${nRow}--layer-${nLayer}_${blocks[block]}`);
                        }
                        if(blocks[block] == 'air') {
                            faceElement.setAttribute('for', `col-${col}--row-${row}--layer-${layer}_${blocks[block]}`);
                        }
                        faceElement.addEventListener("click", () => {
                            console.log(`col-${nCol}--row-${nRow}--layer-${nLayer}_${blocks[block]}`)
                        })
                        blockElement.appendChild(faceElement);
                    }
                    blockContainer.appendChild(blockElement);
                    document.getElementById('world').appendChild(blockContainer);
                }
            }
        }
    }
}

generateHtml();