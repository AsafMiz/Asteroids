function Asteroid(pos, r) {
    if (pos) {
        this.pos = pos.copy();
    } else {
        this.pos = createVector(random(canvas.width), random(canvas.height));
    }
    this.vel = p5.Vector.random2D();
    if (r) {
        this.r = r * 0.5;
    } else {
        this.r = 70;
    }
    this.total = floor(random(5, 8))
    this.offset = [];
    for (var i = 0; i < this.total; i++) {
        this.offset[i] = 0;
        //this.offset[i] = random(-this.r, this.r) * 0.9;

    }

    this.render = function() {
        push();
        translate(this.pos.x, this.pos.y);
        fill(0);
        stroke(255);
        //var boss = (level + 1) % 2;
        if (this.r > 35) {
            image(bossArt[level % 3], 0, 0, this.r * 2, this.r * 2);
        } else if (this.r >= 20) {
            //var tmp = floor(random(0, 3));
            image(rickArt[level % 4], 0, 0, this.r * 2, this.r * 2);
        } else {
            //var tmp = floor(random(0, 2));
            image(mortyArt[level % 2], 0, 0, this.r * 2, this.r * 2);
        }

        // beginShape();
        // for (var i = 0; i < this.total; i++) {
        //     var angle = map(i, 0, this.total, 0, TWO_PI);
        //     var tempR = this.r + this.offset[i];
        //     var x = tempR * cos(angle);
        //     var y = tempR * sin(angle);
        //     vertex(x, y);
        // }
        // endShape(CLOSE);
        pop();
    }

    this.update = function() {
        this.pos.add(this.vel);


    }

    this.edges = function() {
        if (this.pos.x > canvas.width + this.r) {
            this.pos.x = -this.r;
        } else if (this.pos.x < -this.r) {
            this.pos.x = canvas.width + this.r;
        }
        if (this.pos.y > canvas.height + this.r) {
            this.pos.y = -this.r;
        } else if (this.pos.y < -this.r) {
            this.pos.y = canvas.height + this.r;
        }
    }

    this.breakup = function() {
        var newAsteroids = [];
        newAsteroids[0] = new Asteroid(this.pos, this.r);
        newAsteroids[1] = new Asteroid(this.pos, this.r);
        return newAsteroids;
    }
}
