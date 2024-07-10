(function() {
    let scrollSpeed = 50;
    let scrolling = false;
    let scrollFrame;
    let erraticScrolling = false;

    // Variables for fine-tuning the erratic scrolling
    let minJump = 50;
    let maxJump = 170;
    let minDownward = 10;
    let maxDownward = 1000;
    let upwardProbability = 0.2;
    let scrollDelayMin = 100;
    let scrollDelayMax = 5000;
    let minSmoothness = 5; // Minimum number of frames for smooth scrolling
    let maxSmoothness = 50; // Maximum number of frames for smooth scrolling

    function startScroll() {
        if (!scrolling) {
            scrolling = true;
            erraticScrolling ? erraticScroll() : smoothScroll();
        }
    }

    function stopScroll() {
        scrolling = false;
        cancelAnimationFrame(scrollFrame);
    }

    function smoothScroll() {
        if (scrolling) {
            window.scrollBy(0, scrollSpeed / 60);
            scrollFrame = requestAnimationFrame(smoothScroll);
        }
    }

    function erraticScroll() {
        if (scrolling) {
            const direction = Math.random() < upwardProbability ? -1 : 1; // Probability to scroll up
            const jumpDistance = Math.random() * (maxJump - minJump) + minJump;
            const downwardDistance = Math.random() * (maxDownward - minDownward) + minDownward;
            const distance = direction === 1 ? downwardDistance : -jumpDistance;
            const smoothnessFactor = Math.floor(Math.random() * (maxSmoothness - minSmoothness)) + minSmoothness; // Random smoothness factor
            smoothScrollTo(distance, smoothnessFactor);

            const delay = Math.random() * (scrollDelayMax - scrollDelayMin) + scrollDelayMin; // Random delay
            setTimeout(() => {
                scrollFrame = requestAnimationFrame(erraticScroll);
            }, delay);
        }
    }

    function smoothScrollTo(distance, frames) {
        const increment = distance / frames;
        let count = 0;

        function step() {
            if (count < frames && scrolling) {
                window.scrollBy(0, increment);
                count++;
                scrollFrame = requestAnimationFrame(step);
            }
        }
        step();
    }

    window.gogo = function(newSpeed=100, erratic=false) {
        scrollSpeed = newSpeed;
        erraticScrolling = erratic;
        startScroll();
        return 'Scroller moving at ' + newSpeed + (erratic ? ' in erratic mode' : '');
    };

    window.stop = function() {
        stopScroll();
        return 'Scroller stopped';
    };

    // Functions to adjust the erratic scrolling parameters
    window.setErraticParams = function(minJ, maxJ, minD, maxD, upProb, delayMin, delayMax, minSmooth, maxSmooth) {
        minJump = minJ;
        maxJump = maxJ;
        minDownward = minD;
        maxDownward = maxD;
        upwardProbability = upProb;
        scrollDelayMin = delayMin;
        scrollDelayMax = delayMax;
        minSmoothness = minSmooth;
        maxSmoothness = maxSmooth;
        return 'Erratic scrolling parameters updated';
    };

    console.log("Auto scroll functions loaded. Start scrolling with 'gogo(speed, erratic)' and stop with 'stop()'. Adjust erratic parameters with 'setErraticParams(minJump, maxJump, minDownward, maxDownward, upwardProbability, scrollDelayMin, scrollDelayMax, minSmoothness, maxSmoothness)'.");
})();
