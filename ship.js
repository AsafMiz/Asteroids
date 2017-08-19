function ship() {
    this.pos = createVector(width / 2, height - 100);
    this.r = 20;
    this.heading = 0;
    this.rotation = 0;
    this.vel = createVector(0, 0);
    this.isBoosting = false;

    this.update = function() {
        if (this.isBoosting) {
            this.boost();
        }
        this.pos.add(this.vel);
        this.vel.mult(0.99);
    }

    this.render = function() {
        push();
        translate(this.pos.x, this.pos.y);
        rotate(this.heading + PI / 2);
        noFill();
        if (afterHit > 0) {
            strokeWeight(4);
            stroke(0, 100, afterHit);
            afterHit--;
        } else {
            noStroke();
        }
        triangle(-this.r + 5, this.r - 5, this.r - 5, this.r - 5, 0, -this.r - 10);
        image(shipArt, 0, 0, this.r * 2, this.r * 2 + 10);
        pop();
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

    this.hits = function(asteroid) {
        var d = dist(this.pos.x, this.pos.y, asteroid.pos.x, asteroid.pos.y);
        return ((d - asteroid.r) < 0);
    }

    this.setRotation = function(a) {
        this.rotation = a;
    }

    this.turn = function(angle) {
        this.heading += this.rotation;
    }

    this.boosting = function(b) {
        this.isBoosting = b;
    }
    this.boost = function() {
        var force = p5.Vector.fromAngle(this.heading);
        force.mult(0.1);
        this.vel.add(force);
    }
}
