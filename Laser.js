function Laser(sPos, angle) {
    this.pos = createVector(sPos.x, sPos.y);
    this.vel = p5.Vector.fromAngle(angle);
    this.vel.mult(10);

    this.update = function() {
        this.pos.add(this.vel);
    }
    this.render = function() {
        push();
        stroke(255);
        strokeWeight(4);
        point(this.pos.x, this.pos.y);
        pop();
    }

    this.hits = function(asteroid) {
        var d = dist(this.pos.x, this.pos.y, asteroid.pos.x, asteroid.pos.y);
        return ((d - asteroid.r) <= 0);
    }

    this.offscreen = function() {
        var offscreen = false;
        if (this.pos.x > canvas.width || this.pos.x < 0 || this.pos.y > canvas.height || this.pos.y < 0) {
            offscreen = true;
        }
        return offscreen;
    }
}
