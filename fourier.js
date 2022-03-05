class Complex {
    constructor(a, b) {
        this.re = a;
        this.im = b;
    }

    add(c) {
        this.re += c.re
        this.im += c.im
    }

    mult(c) {
        let re = c.re * this.re - this.im * c.im
        let im = this.re * c.im + this.im * c.re
        return new Complex(re, im)
    }
}

function dft(x) {
    let N = x.length;
    let X = []
    for (let k = 0; k < N; k++) {
        let sum = new Complex(0, 0);
        for (let n = 0; n < N; n++) {
            let phi = 2 * Math.PI * k * n / N
            const c = new Complex(Math.cos(phi), -Math.sin(phi))
            sum.add(x[n].mult(c))
        }
        sum.re /= N
        sum.im /= N
        let amp = Math.sqrt(sum.re ** 2 + sum.im ** 2)
        let freq = k
        let phase = Math.atan2(sum.im, sum.re)
        X[k] = { re: sum.re, im: sum.im, amp, freq, phase }
    }
    return X;
}


class Transform {
    constructor() {
        this.fourier = []
        this.points = []
        this.path = []
        this.angle = 0
    }

    calculateFourier() {
        this.fourier = dft(this.points).sort((a, b) => b.amp - a.amp)
    }
    reset() {
        this.points = []
        this.fourier = []
        this.angle = 0
        this.path = []
    }
    draw(p) {
        p.background(0);
        let x = 0;
        let y = 0;
        p.translate(p.width / 2, p.height / 2)
        for (let i = 0; i < this.fourier.length; i++) {
            let { amp, freq, phase, im, re } = this.fourier[i];
            p.stroke(100);
            p.strokeWeight(3);
            p.noFill();
            let prevX = x;
            let prevY = y;
            p.ellipse(x, y, amp * 2)
            x += amp * p.cos(freq * this.angle + phase)
            y += amp * p.sin(freq * this.angle + phase)
            p.line(prevX, prevY, x, y)
        }
        p.noStroke();
        p.fill('#F7567c')
        p.ellipse(x, y, 20)
        this.path.push({ x, y })
        p.noFill();
        p.beginShape();
        p.stroke(255);
        p.strokeWeight(1);
        for (let j = 0; j < this.path.length; j++) {
            p.vertex(this.path[j].x, this.path[j].y)
        }
        p.endShape();
        if (this.angle == p.TWO_PI) {
            this.angle = 0
            this.path = []
        }
        else {
            this.angle += p.TWO_PI / this.fourier.length
        }
    }
}