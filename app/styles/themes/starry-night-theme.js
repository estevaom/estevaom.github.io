/**
 * Starry Night Theme Effects - Dynamic elements for Van Gogh inspired theme
 */

(function() {
    'use strict';
    
    /**
     * CONFIGURATION SETTINGS
     * Adjust these values to customize the Starry Night theme effects
     */
    var starryNightConfig = {
        // Basic elements
        stars: {
            count: 100,        // Number of stars to display
            minSize: 3,        // Minimum star size in pixels
            maxSize: 12,       // Maximum star size in pixels
            glowEffect: true   // Whether to add glowing rings around stars
        },
        swirls: {
            count: 6,          // Number of swirling patterns
            minSize: 100,      // Minimum swirl size in pixels
            maxSize: 300       // Maximum swirl size in pixels
        },
        shootingStars: {
            count: 4,          // Initial number of shooting stars
            interval: 5000,    // Milliseconds between random shooting stars
            chance: 0.3,       // Probability (0-1) of new shooting star at each interval
            
            // Shooting star direction and movement
            direction: 'right-to-left',  // 'left-to-right', 'right-to-left', or 'random'
            angle: 45,                   // Angle in degrees: -45 = down-right, 45 = up-right, 135 = up-left, -135 = down-left
            minDuration: 4,              // Minimum animation duration in seconds (speed)
            maxDuration: 7,              // Maximum animation duration in seconds (speed)
            
            // Starting position (percentage of screen)
            startAreaTop: 0,             // Top position percentage (0 = top of screen)
            startAreaBottom: 70,         // Bottom position percentage (30 = 30% down the screen)
            startSidePosition: 0,        // Side position percentage (0 = left/right edge, 30 = 30% in from edge)
            
            // Visual style
            length: 300,                 // Length of shooting star in pixels
            thickness: 9,                // Thickness of shooting star in pixels
            headColor: 'rgba(255, 230, 128, 1)',  // Color at start of tail
            trailColor: 'rgba(255, 255, 255, 0.8)', // Color at head of shooting star
            fadeColor: 'rgba(255, 255, 255, 0)'    // Color at end of tail (typically transparent)
        },
        fireflies: {
            count: 20,         // Number of firefly particles
            minSize: 2,        // Minimum firefly size in pixels
            maxSize: 5         // Maximum firefly size in pixels
        },
        brushStrokes: {
            count: 8,          // Number of Van Gogh-style brush strokes
            minWidth: 80,      // Minimum width of brush strokes
            maxWidth: 250      // Maximum width of brush strokes
        },
        energyWaves: {
            interval: 3000,    // Milliseconds between random energy waves
            chance: 0.3,       // Probability (0-1) of new energy wave at each interval
            minSize: 30,       // Minimum energy wave size
            maxSize: 80        // Maximum energy wave size
        },
        
        // Advanced settings
        zIndex: {              // Z-index values for various elements
            container: 0,      // Main container
            background: 0,     // Background effects
            brushstrokes: 1,   // Brush strokes
            swirls: 1,         // Swirling patterns
            stars: 2,          // Stars
            fireflies: 2,      // Firefly particles
            shootingStars: 3   // Shooting stars
        },
        performance: {
            reduceFXonMobile: true  // Reduce effects on mobile devices
        }
    };
    
    // Initialize when document is ready
    document.addEventListener('DOMContentLoaded', function() {
        // Execute with a small delay to ensure all styles are applied
        setTimeout(initStarryNightTheme, 100);
    });
    
    // Re-initialize if theme is toggled later
    document.addEventListener('themeChanged', function(e) {
        if (e.detail && e.detail.theme === 'starry-night') {
            // Execute with a small delay to ensure all styles are applied
            setTimeout(initStarryNightTheme, 100);
        } else {
            clearStarryNightEffects();
        }
    });
    
    // Also immediately run once to catch if script loads after DOM is ready
    setTimeout(initStarryNightTheme, 100);
    
    // Keep track of intervals for effects
    var effectIntervals = [];
    
    function initStarryNightTheme() {
        // Clear any existing effects first
        clearStarryNightEffects();
        
        // Theme is applied via class on the body
        if (!document.body.classList.contains('starry-night-theme')) {
            console.log('Starry Night Theme: body does not have starry-night-theme class');
            return;
        }
        
        console.log('Initializing Starry Night Theme effects');
        
        // Apply performance settings if needed
        if (starryNightConfig.performance.reduceFXonMobile && isMobileDevice()) {
            reduceEffectsForMobile();
        }
        
        // Create containers for our effects
        createContainers();
        
        // Add the animation styles
        createAnimationStyles();
        
        // Create all the effects
        createStars(starryNightConfig.stars.count);
        createSwirls(starryNightConfig.swirls.count);
        createShootingStars(starryNightConfig.shootingStars.count);
        createFireflies(starryNightConfig.fireflies.count);
        createBrushStrokes(starryNightConfig.brushStrokes.count);
        
        // Schedule random additional effects
        scheduleRandomEffects();
        
        // Add window resize handler
        window.addEventListener('resize', function() {
            clearStarryNightEffects();
            initStarryNightTheme();
        });
    }
    
    function isMobileDevice() {
        return (window.innerWidth <= 768) || 
               (typeof window.orientation !== 'undefined') ||
               (navigator.userAgent.indexOf('Mobile') !== -1);
    }
    
    function reduceEffectsForMobile() {
        // Reduce number of elements for better performance
        starryNightConfig.stars.count = Math.floor(starryNightConfig.stars.count * 0.6);
        starryNightConfig.swirls.count = Math.floor(starryNightConfig.swirls.count * 0.5);
        starryNightConfig.shootingStars.count = Math.floor(starryNightConfig.shootingStars.count * 0.5);
        starryNightConfig.fireflies.count = Math.floor(starryNightConfig.fireflies.count * 0.5);
        starryNightConfig.brushStrokes.count = Math.floor(starryNightConfig.brushStrokes.count * 0.5);
    }
    
    function createContainers() {
        // Remove any existing container
        var existingContainer = document.getElementById('starry-night-container');
        if (existingContainer) {
            existingContainer.remove();
        }
        
        // Create main container
        var container = document.createElement('div');
        container.id = 'starry-night-container';
        container.style.cssText = `position: fixed; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: ${starryNightConfig.zIndex.container};`;
        document.body.appendChild(container);
        
        // Create specific containers for different effects
        var layers = ['stars', 'swirls', 'brushstrokes', 'fireflies', 'shooting-stars', 'energy-waves'];
        
        layers.forEach(function(layer) {
            var layerContainer = document.createElement('div');
            layerContainer.id = 'starry-night-' + layer;
            var zIndex = starryNightConfig.zIndex[layer.replace('-', '')] || 1;
            layerContainer.style.cssText = `position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: ${zIndex};`;
            container.appendChild(layerContainer);
        });
    }
    
    function clearStarryNightEffects() {
        // Clear any existing containers
        var container = document.getElementById('starry-night-container');
        if (container) {
            container.remove();
        }
        
        // Clear any existing animation styles
        var animationStyle = document.getElementById('starry-night-animations');
        if (animationStyle) {
            animationStyle.remove();
        }
        
        // Clear any interval timers
        effectIntervals.forEach(function(interval) {
            clearInterval(interval);
        });
        effectIntervals = [];
    }
    
    function createAnimationStyles() {
        if (document.getElementById('starry-night-animations')) return;
        
        // Create keyframes for different shooting star directions and angles
        var shootingStarKeyframes = createShootingStarKeyframes();
        
        var style = document.createElement('style');
        style.id = 'starry-night-animations';
        style.textContent = `
            @keyframes starry-night-star-pulse {
                0% { transform: scale(1); opacity: 0.8; }
                50% { transform: scale(1.2); opacity: 1; }
                100% { transform: scale(1); opacity: 0.8; }
            }
            
            @keyframes starry-night-star-drift {
                0% { transform: translate(0, 0); }
                25% { transform: translate(3px, 1px); }
                50% { transform: translate(0, 3px); }
                75% { transform: translate(-2px, 1px); }
                100% { transform: translate(0, 0); }
            }
            
            ${shootingStarKeyframes}
            
            @keyframes starry-night-firefly {
                0% { transform: translate(0, 0) scale(0.6); opacity: 0.2; }
                25% { transform: translate(10px, -10px) scale(1); opacity: 0.8; }
                50% { transform: translate(20px, 0) scale(0.8); opacity: 0.6; }
                75% { transform: translate(10px, 10px) scale(1.2); opacity: 0.8; }
                100% { transform: translate(0, 0) scale(0.6); opacity: 0.2; }
            }
            
            @keyframes starry-night-swirl-rotate {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
            
            @keyframes starry-night-brushstroke {
                0% { transform: scale(1) rotate(0deg); opacity: 0.6; }
                50% { transform: scale(1.1) rotate(2deg); opacity: 0.8; }
                100% { transform: scale(1) rotate(0deg); opacity: 0.6; }
            }
            
            @keyframes starry-night-wave-pulse {
                0% { transform: scale(0.8); opacity: 0.4; }
                100% { transform: scale(2.0); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
    
    function createShootingStarKeyframes() {
        // Create keyframes for shooting stars with the configured angle
        var angle = starryNightConfig.shootingStars.angle;
        
        // Calculate end position based on angle
        // For a 45 degree angle, we need to move the same distance in X and Y
        // For other angles, we calculate the X and Y components
        var radians = angle * Math.PI / 180;
        var distance = 400; // Base distance to travel
        var dx = Math.cos(radians) * distance;
        var dy = Math.sin(radians) * distance;
        
        // Create the keyframes based on direction
        var keyframes = '';
        
        if (starryNightConfig.shootingStars.direction === 'left-to-right' || 
            starryNightConfig.shootingStars.direction === 'random') {
            keyframes += `
                @keyframes starry-night-shooting-star-ltr {
                    0% { transform: translate(0, 0) rotate(${angle}deg) scale(0.5); opacity: 0; }
                    10% { transform: translate(${dx * 0.1}px, ${dy * 0.1}px) rotate(${angle}deg) scale(1); opacity: 1; }
                    100% { transform: translate(${dx}px, ${dy}px) rotate(${angle}deg) scale(0.2); opacity: 0; }
                }
            `;
        }
        
        if (starryNightConfig.shootingStars.direction === 'right-to-left' || 
            starryNightConfig.shootingStars.direction === 'random') {
            // For right-to-left, we invert the X movement and adjust the angle
            var rtlAngle = 180 - angle;
            var rtlRadians = rtlAngle * Math.PI / 180;
            var rtlDx = Math.cos(rtlRadians) * distance;
            var rtlDy = Math.sin(rtlRadians) * distance;
            
            keyframes += `
                @keyframes starry-night-shooting-star-rtl {
                    0% { transform: translate(0, 0) rotate(${rtlAngle}deg) scale(0.5); opacity: 0; }
                    10% { transform: translate(${rtlDx * 0.1}px, ${rtlDy * 0.1}px) rotate(${rtlAngle}deg) scale(1); opacity: 1; }
                    100% { transform: translate(${rtlDx}px, ${rtlDy}px) rotate(${rtlAngle}deg) scale(0.2); opacity: 0; }
                }
            `;
        }
        
        return keyframes;
    }
    
    function createStars(count) {
        var container = document.getElementById('starry-night-stars');
        if (!container) return;
        
        for (var i = 0; i < count; i++) {
            var star = document.createElement('div');
            var size = randomBetween(starryNightConfig.stars.minSize, starryNightConfig.stars.maxSize);
            var x = randomBetween(10, window.innerWidth - 10);
            var y = randomBetween(10, window.innerHeight - 10);
            var pulseDuration = randomBetween(3, 7);
            var driftDuration = randomBetween(10, 20);
            var driftDelay = randomBetween(0, 5);
            
            star.className = 'starry-night-star';
            star.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                border-radius: 50%;
                background: radial-gradient(circle at center, rgba(255, 230, 128, 1) 0%, rgba(255, 210, 30, 0.8) 40%, rgba(255, 180, 0, 0.4) 70%, transparent 100%);
                box-shadow: 0 0 20px 10px rgba(255, 230, 128, 0.3);
                animation: 
                    starry-night-star-pulse ${pulseDuration}s infinite alternate ease-in-out,
                    starry-night-star-drift ${driftDuration}s ${driftDelay}s infinite ease-in-out;
                z-index: ${starryNightConfig.zIndex.stars};
            `;
            
            container.appendChild(star);
            
            // Add star glow rings
            if (starryNightConfig.stars.glowEffect) {
                addStarGlow(star, size, x, y);
            }
        }
    }
    
    function addStarGlow(star, size, x, y) {
        var starsContainer = document.getElementById('starry-night-stars');
        var glowSize = size * 3;
        var rotateSpeed = randomBetween(20, 40);
        
        var glow = document.createElement('div');
        glow.className = 'starry-night-star-glow';
        glow.style.cssText = `
            position: absolute;
            width: ${glowSize}px;
            height: ${glowSize}px;
            left: ${x - (glowSize - size) / 2}px;
            top: ${y - (glowSize - size) / 2}px;
            border-radius: 50%;
            border: 1px solid rgba(255, 230, 128, 0.2);
            filter: blur(1px);
            animation: starry-night-swirl-rotate ${rotateSpeed}s linear infinite;
            transform-origin: center center;
            z-index: ${starryNightConfig.zIndex.stars - 1};
        `;
        
        starsContainer.appendChild(glow);
    }
    
    function createSwirls(count) {
        var container = document.getElementById('starry-night-swirls');
        if (!container) return;
        
        for (var i = 0; i < count; i++) {
            var swirl = document.createElement('div');
            var size = randomBetween(starryNightConfig.swirls.minSize, starryNightConfig.swirls.maxSize);
            var x = randomBetween(0, window.innerWidth);
            var y = randomBetween(0, window.innerHeight);
            var duration = randomBetween(60, 180);
            var borderWidth = randomBetween(1, 3);
            var opacity = randomBetween(2, 5) / 10;
            
            // Van Gogh blue colors
            var r = randomBetween(50, 100);
            var g = randomBetween(80, 150);
            var b = randomBetween(150, 220);
            
            swirl.className = 'starry-night-swirl';
            swirl.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                border-radius: 50%;
                border: ${borderWidth}px solid rgba(${r}, ${g}, ${b}, ${opacity});
                transform-origin: center center;
                animation: starry-night-swirl-rotate ${duration}s linear infinite;
                opacity: ${opacity};
                filter: blur(1px);
                z-index: ${starryNightConfig.zIndex.swirls};
            `;
            
            container.appendChild(swirl);
            
            // Add inner swirl
            var innerSwirl = document.createElement('div');
            var innerSize = size * 0.7;
            
            innerSwirl.className = 'starry-night-swirl-inner';
            innerSwirl.style.cssText = `
                position: absolute;
                width: ${innerSize}px;
                height: ${innerSize * 0.8}px;
                left: ${(size - innerSize) / 2}px;
                top: ${(size - innerSize * 0.8) / 2}px;
                border-radius: 50%;
                border: ${borderWidth}px solid rgba(${r}, ${g+20}, ${b-20}, ${opacity});
                transform-origin: center center;
                animation: starry-night-swirl-rotate ${duration * 0.7}s linear infinite reverse;
                filter: blur(1px);
            `;
            
            swirl.appendChild(innerSwirl);
        }
    }
    
    function createShootingStars(count) {
        var container = document.getElementById('starry-night-shooting-stars');
        if (!container) return;
        
        for (var i = 0; i < count; i++) {
            // Determine direction for this star
            var direction = starryNightConfig.shootingStars.direction;
            if (direction === 'random') {
                direction = Math.random() > 0.5 ? 'left-to-right' : 'right-to-left';
            }
            
            var shootingStar = document.createElement('div');
            var x, y, gradientDirection, animationName;
            
            // Duration and delay
            var duration = randomBetween(starryNightConfig.shootingStars.minDuration, starryNightConfig.shootingStars.maxDuration);
            var delay = randomBetween(0, 15);
            
            // Calculate starting position based on direction
            if (direction === 'left-to-right') {
                // Start from left edge of screen within the configured start area
                x = randomBetween(0, window.innerWidth * (starryNightConfig.shootingStars.startSidePosition / 100));
                y = randomBetween(
                    window.innerHeight * (starryNightConfig.shootingStars.startAreaTop / 100),
                    window.innerHeight * (starryNightConfig.shootingStars.startAreaBottom / 100)
                );
                gradientDirection = '90deg'; // Left to right gradient
                animationName = 'starry-night-shooting-star-ltr';
            } else {
                // Start from right edge of screen within the configured start area
                x = randomBetween(
                    window.innerWidth * (1 - starryNightConfig.shootingStars.startSidePosition / 100),
                    window.innerWidth
                );
                y = randomBetween(
                    window.innerHeight * (starryNightConfig.shootingStars.startAreaTop / 100),
                    window.innerHeight * (starryNightConfig.shootingStars.startAreaBottom / 100)
                );
                gradientDirection = '270deg'; // Right to left gradient
                animationName = 'starry-night-shooting-star-rtl';
            }
            
            shootingStar.className = 'starry-night-shooting-star';
            shootingStar.style.cssText = `
                position: absolute;
                width: ${starryNightConfig.shootingStars.length}px;
                height: ${starryNightConfig.shootingStars.thickness}px;
                left: ${x}px;
                top: ${y}px;
                background: linear-gradient(${gradientDirection}, 
                    ${starryNightConfig.shootingStars.headColor} 0%, 
                    ${starryNightConfig.shootingStars.trailColor} 50%, 
                    ${starryNightConfig.shootingStars.fadeColor} 100%);
                box-shadow: 0 0 10px 0 rgba(255, 230, 128, 0.5);
                border-radius: 100px;
                animation: ${animationName} ${duration}s ${delay}s infinite linear;
                z-index: ${starryNightConfig.zIndex.shootingStars};
            `;
            
            container.appendChild(shootingStar);
        }
    }
    
    function createFireflies(count) {
        var container = document.getElementById('starry-night-fireflies');
        if (!container) return;
        
        for (var i = 0; i < count; i++) {
            var firefly = document.createElement('div');
            var size = randomBetween(starryNightConfig.fireflies.minSize, starryNightConfig.fireflies.maxSize);
            var x = randomBetween(10, window.innerWidth - 10);
            var y = randomBetween(window.innerHeight * 0.4, window.innerHeight * 0.9);
            var duration = randomBetween(8, 15);
            var delay = randomBetween(0, 10);
            
            firefly.className = 'starry-night-firefly';
            firefly.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                border-radius: 50%;
                background: rgba(255, 230, 128, 0.8);
                box-shadow: 0 0 ${size * 3}px ${size}px rgba(255, 230, 128, 0.6);
                animation: starry-night-firefly ${duration}s ${delay}s infinite ease-in-out;
                z-index: ${starryNightConfig.zIndex.fireflies};
            `;
            
            container.appendChild(firefly);
        }
    }
    
    function createBrushStrokes(count) {
        var container = document.getElementById('starry-night-brushstrokes');
        if (!container) return;
        
        var colors = [
            'rgba(72, 104, 173, 0.3)',
            'rgba(55, 90, 160, 0.3)',
            'rgba(90, 130, 200, 0.3)',
            'rgba(40, 70, 150, 0.3)'
        ];
        
        for (var i = 0; i < count; i++) {
            var brushstroke = document.createElement('div');
            var width = randomBetween(starryNightConfig.brushStrokes.minWidth, starryNightConfig.brushStrokes.maxWidth);
            var height = randomBetween(30, 80);
            var x = randomBetween(0, window.innerWidth - width);
            var y = randomBetween(0, window.innerHeight - height);
            var color = colors[randomBetween(0, colors.length - 1)];
            var duration = randomBetween(10, 20);
            var rotate = randomBetween(-15, 15);
            
            brushstroke.className = 'starry-night-brushstroke';
            brushstroke.style.cssText = `
                position: absolute;
                width: ${width}px;
                height: ${height}px;
                left: ${x}px;
                top: ${y}px;
                background: ${color};
                border-radius: ${height}px / ${height / 2}px;
                transform: rotate(${rotate}deg);
                filter: blur(10px);
                animation: starry-night-brushstroke ${duration}s infinite ease-in-out;
                z-index: ${starryNightConfig.zIndex.brushstrokes};
            `;
            
            container.appendChild(brushstroke);
        }
    }
    
    function createEnergyWave(starElement) {
        var wavesContainer = document.getElementById('starry-night-energy-waves');
        if (!wavesContainer) return;
        
        // Get position from the star element
        var rect = starElement.getBoundingClientRect();
        var centerX = rect.left + rect.width / 2;
        var centerY = rect.top + rect.height / 2;
        
        var wave = document.createElement('div');
        var size = randomBetween(starryNightConfig.energyWaves.minSize, starryNightConfig.energyWaves.maxSize);
        var duration = randomBetween(2, 4);
        
        wave.className = 'starry-night-energy-wave';
        wave.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${centerX - size/2}px;
            top: ${centerY - size/2}px;
            border-radius: 50%;
            border: 1px solid rgba(255, 230, 128, 0.5);
            animation: starry-night-wave-pulse ${duration}s linear forwards;
            z-index: ${starryNightConfig.zIndex.stars - 1};
        `;
        
        wavesContainer.appendChild(wave);
        
        // Remove the wave when animation completes
        setTimeout(function() {
            if (wave.parentNode) {
                wave.parentNode.removeChild(wave);
            }
        }, duration * 1000);
    }
    
    function scheduleRandomEffects() {
        // Occasionally add a new shooting star
        var shootingStarInterval = setInterval(function() {
            if (Math.random() > (1 - starryNightConfig.shootingStars.chance)) {
                createShootingStars(1);
            }
        }, starryNightConfig.shootingStars.interval);
        effectIntervals.push(shootingStarInterval);
        
        // Add energy waves from random stars
        var energyWaveInterval = setInterval(function() {
            if (Math.random() > (1 - starryNightConfig.energyWaves.chance)) {
                var stars = document.getElementsByClassName('starry-night-star');
                if (stars.length > 0) {
                    var randomStar = stars[Math.floor(Math.random() * stars.length)];
                    createEnergyWave(randomStar);
                }
            }
        }, starryNightConfig.energyWaves.interval);
        effectIntervals.push(energyWaveInterval);
    }
    
    function randomBetween(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
})(); 