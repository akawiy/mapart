self.onmessage = event => {
    let {imageData, colorPalette, dithering} = event.data;
    const [w, h] = [imageData.width, imageData.height];
    const data = imageData.data;
    let colorIDs = [];

    for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
            const i = getIndex(x, y, w, 4);
            const [ri, gi, bi, ai] = [i, i + 1, i + 2, i + 3];
            const oldColor = [data[ri], data[gi], data[bi]];

            if (data[ai] < 128) {
                data[ai] = 0;
                colorIDs.push(0);
                continue;
            } else {
                data[ai] = 255;
            }
            
            const closestColorID = findClosestColorID(oldColor, colorPalette);
            const newColor = colorPalette[closestColorID];
            [data[ri], data[gi], data[bi]] = newColor;
            colorIDs.push(+closestColorID);

            if (dithering === "Floyd-Steinberg") {
                const quantizationError = calculateQuantizationError(oldColor, newColor);

                dither(data, getIndex(x + 1, y + 0, w, 4), quantizationError, 7/16);
                dither(data, getIndex(x - 1, y + 1, w, 4), quantizationError, 3/16);
                dither(data, getIndex(x + 0, y + 1, w, 4), quantizationError, 5/16);
                dither(data, getIndex(x + 1, y + 1, w, 4), quantizationError, 1/16);
            }
        }
    }

    postMessage({width: imageData.width, height: imageData.height, buffer: imageData.data.buffer, newColorIDs: colorIDs}, [imageData.data.buffer]);
}


function calculateQuantizationError(oldColor, newColor) {
    return [
        oldColor[0] - newColor[0],
        oldColor[1] - newColor[1],
        oldColor[2] - newColor[2],
    ];
}


function dither(data, index, quantizationError, factor, multiplier = 1) {
    if (index >= data.length) return;

    for (let i = 0; i < 3; i++) {
        data[index + i] += quantizationError[i] * factor * multiplier;
    }
}


function getIndex(x, y, w, multiplier = 1) {
    return (x + y * w) * multiplier;
}


function findClosestColorID(target, colorPalette) {
    const [r, g, b, a] = target;

    const colorPaletteEntries = Object.entries(colorPalette);
    let closestColorID = 0;
    let minDistance = 255 ** 2 * 3 + 1;
    
    for (let [colorID, color] of colorPaletteEntries) {
        const distance = (color[0] - r) ** 2 + (color[1] - g) ** 2 + (color[2] - b) ** 2;

        if (distance < minDistance) {
            closestColorID = colorID;
            minDistance = distance;
        }
    }

    return +closestColorID;
}
