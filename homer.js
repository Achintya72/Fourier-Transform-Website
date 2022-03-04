var homer = (p) => {
    p.setup = () => {
        var canvas = p.createCanvas(400, 400)
        canvas.parent('homer')
    }

    p.draw = () => {
        p.background(220)
    }
} 

var Homer = new p5(homer, 'homer')