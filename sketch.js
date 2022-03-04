var selfDrawTransform = new Transform();

function reset() {
    selfDrawTransform.reset()
}

var selfDraw = function (p) {

    p.setup = function () {
        var canvas = p.createCanvas(400, 400);
        canvas.parent('selfDraw')
    }

    p.draw = function () {
        p.background(0);
        if (p.mouseIsPressed && selfDrawTransform.fourier.length == 0) {
            for (let i = 1; i < selfDrawTransform.points.length; i++) {
                p.stroke(255);
                let { re: x1, im: y1 } = selfDrawTransform.points[i - 1]
                let { re: x2, im: y2 } = selfDrawTransform.points[i]
                p.line(p.width / 2 + x1, p.height / 2 + y1, p.width / 2 + x2, p.height / 2 + y2)
            }
        }
        else {
            if (selfDrawTransform.fourier.length == 0) {
                selfDrawTransform.calculateFourier()
            }
            else {
                selfDrawTransform.draw(p)
            }
        }
    }

    p.mouseDragged = function () {
        if ((p.mouseX > 0 && p.mouseX < p.width) && (p.mouseY > 0 && p.mouseX < p.height)) {
            selfDrawTransform.points.push(new Complex(p.mouseX - p.width / 2, p.mouseY - p.height / 2))
        }
    }
}

var myp5 = new p5(selfDraw, 'selfDraw')