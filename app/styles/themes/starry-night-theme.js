/**
 * Starry Night Theme Effects - Dynamic elements for Van Gogh inspired theme
 */

(function() {
    'use strict';
    
    // Add CSS to ensure content panels are above background effects
    function addContentPanelStyles() {
        var styleEl = document.createElement('style');
        styleEl.id = 'starry-night-content-fix';
        styleEl.textContent = `
            /* Ensure content panels are above the starry background */
            .mdl-layout__content > * {
                position: relative;
                z-index: 10;
            }
            .mdl-card, .mdl-grid {
                position: relative;
                z-index: 10;
            }
        `;
        document.head.appendChild(styleEl);
    }
    
    // Call this immediately
    addContentPanelStyles();
    
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
        // New huge stars configuration
        hugeStars: {
            count: 8,          // Number of huge stars
            minSize: 25,       // Minimum size in pixels
            maxSize: 45,       // Maximum size in pixels
            glowEffect: true,  // Whether to add glowing rings
            minSpeed: 20,      // Minimum movement speed (seconds for one cycle)
            maxSpeed: 50,      // Maximum movement speed (seconds for one cycle)
            glowSize: 4,       // Multiplier for glow size relative to star size
            movementRange: 180 // Maximum pixel range for movement
        },
        // New moon configuration
        moon: {
            size: 180,         // Size of the moon in pixels
            glowSize: 60,      // Size of the glow effect
            topOffset: 100,    // Distance from the top (after header)
            rightOffset: 100   // Distance from the right edge
        },
        swirls: {
            count: 6,          // Number of swirling patterns
            minSize: 100,      // Minimum swirl size in pixels
            maxSize: 300       // Maximum swirl size in pixels
        },
        shootingStars: {
            count: 6,          // Initial number of shooting stars
            interval: 3000,    // Milliseconds between random shooting stars
            chance: 0.4,       // Probability (0-1) of new shooting star at each interval
            
            // Shooting star direction and movement
            direction: 'multi-position',  // 'left-to-right', 'right-to-left', 'multi-position', or 'random'
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
            count: 80,         // Number of firefly particles
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
        zIndex: {              
            container: -100,        // Extreme negative value
            background: -90,        // Background effects
            moon: -80,              // Moon
            brushstrokes: -70,      // Brush strokes
            swirls: -60,            // Swirling patterns
            stars: -50,             // Regular stars
            hugeStars: -40,         // Huge stars
            fireflies: 15,          // Firefly particles (above content)
            shootingStars: 20       // Shooting stars (above content)
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
    
    // Keep track of the number of active shooting stars
    var activeShootingStars = 0;

    // Global window function for theme initialization
    window.initStarryNightTheme = initStarryNightTheme;
    
    /**
     * Initialize the Starry Night theme elements
     */
    function initStarryNightTheme() {
        // Add listener to adjust for page resizing
        window.addEventListener('resize', function() {
            setTimeout(function() {
                clearStarryNightEffects();
                initStarryNightTheme();
            }, 200);
        });
        
        // Check if we're on a mobile device and adjust effects accordingly
        if (isMobileDevice()) {
            reduceEffectsForMobile();
        }
        
        // Create the starry night container elements
        createContainers();
        
        // Add CSS animations
        createAnimationStyles();
        
        // Create background elements
        var container = document.getElementById('starry-night-container');
        if (!container) return;
        
        // Create the moon (before stars so it's in the background)
        createMoon();
        
        // Create other elements
        createStars(starryNightConfig.stars.count);
        createHugeStars(starryNightConfig.hugeStars.count);
        createSwirls(starryNightConfig.swirls.count);
        createShootingStars(starryNightConfig.shootingStars.count);
        createFireflies(starryNightConfig.fireflies.count);
        createBrushStrokes(starryNightConfig.brushStrokes ? starryNightConfig.brushStrokes.count : 0);
        
        // Set up random effects to happen over time
        scheduleRandomEffects();
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
        container.style.cssText = `
            position: fixed; 
            top: 0; 
            left: 0; 
            width: 100%; 
            height: 100%; 
            pointer-events: none; 
            z-index: ${starryNightConfig.zIndex.container};
        `;
        
        // Insert at the beginning of body instead of appending
        if (document.body.firstChild) {
            document.body.insertBefore(container, document.body.firstChild);
        } else {
            document.body.appendChild(container);
        }
        
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
    
    /**
     * Create animation styles for the starry night elements
     */
    function createAnimationStyles() {
        // Remove any existing animation styles to prevent duplicates
        var existingStyles = document.getElementById('starry-night-animations');
        if (existingStyles) {
            existingStyles.parentNode.removeChild(existingStyles);
        }
        
        // Create style element for animations
        var styleEl = document.createElement('style');
        styleEl.id = 'starry-night-animations';
        
        // Define animations
        var css = `
            @keyframes starry-night-twinkle {
                0%, 100% { opacity: 1; transform: scale(1); }
                50% { opacity: 0.5; transform: scale(0.7); }
            }
            
            @keyframes starry-night-float {
                0% { transform: translateY(0px); }
                50% { transform: translateY(-20px); }
                100% { transform: translateY(0px); }
            }
            
            @keyframes starry-night-swirl {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
            
            @keyframes starry-night-swell {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.2); }
            }
            
            @keyframes starry-night-firefly {
                0%, 100% { opacity: 0.2; transform: scale(0.6); }
                50% { opacity: 1; transform: scale(1); }
            }
            
            @keyframes huge-star-movement-1 {
                0% { transform: translate(0, 0); }
                25% { transform: translate(140px, 80px); }
                50% { transform: translate(70px, 180px); }
                75% { transform: translate(-80px, 120px); }
                100% { transform: translate(0, 0); }
            }
            
            @keyframes huge-star-movement-2 {
                0% { transform: translate(0, 0); }
                25% { transform: translate(-100px, 140px); }
                50% { transform: translate(-180px, 20px); }
                75% { transform: translate(-60px, -120px); }
                100% { transform: translate(0, 0); }
            }
            
            @keyframes huge-star-movement-3 {
                0% { transform: translate(0, 0); }
                33% { transform: translate(120px, -80px); }
                66% { transform: translate(-120px, -160px); }
                100% { transform: translate(0, 0); }
            }
            
            @keyframes huge-star-movement-4 {
                0% { transform: translate(0, 0); }
                25% { transform: translate(180px, 120px); }
                50% { transform: translate(100px, 200px); }
                75% { transform: translate(-140px, 90px); }
                100% { transform: translate(0, 0); }
            }
            
            @keyframes huge-star-pulse {
                0%, 100% { transform: scale(1); filter: brightness(1); }
                50% { transform: scale(1.3); filter: brightness(1.5); }
            }
            
            @keyframes huge-star-glow {
                0%, 100% { opacity: 0.5; box-shadow: 0 0 35px 10px rgba(255, 255, 200, 0.7); }
                50% { opacity: 0.7; box-shadow: 0 0 60px 20px rgba(255, 250, 160, 0.9); }
            }
            
            @keyframes moon-glow {
                0%, 100% { box-shadow: 0 0 80px 10px rgba(255, 252, 170, 0.6); }
                50% { box-shadow: 0 0 100px 20px rgba(255, 252, 170, 0.8); }
            }
        `;
        
        // Add shooting star keyframe animations
        css += createShootingStarKeyframes();
        
        // Add the CSS to the style element
        styleEl.textContent = css;
        document.head.appendChild(styleEl);
    }
    
    function createShootingStarKeyframes() {
        // Create keyframes for shooting stars with the configured angle
        var angle = starryNightConfig.shootingStars.angle;
        
        // Calculate end position based on angle
        // For a 45 degree angle, we need to move the same distance in X and Y
        // For other angles, we calculate the X and Y components
        var radians = angle * Math.PI / 180;
        var distance = Math.max(window.innerWidth, window.innerHeight) * 1.5; // Ensure stars move completely off screen
        var dx = Math.cos(radians) * distance;
        var dy = Math.sin(radians) * distance;
        
        // Create the keyframes based on direction
        var keyframes = '';
        
        // Add multiple keyframe sets for different fade points (75% to 90%)
        for (var fadePoint = 75; fadePoint <= 90; fadePoint += 5) {
            if (starryNightConfig.shootingStars.direction === 'left-to-right' || 
                starryNightConfig.shootingStars.direction === 'random' ||
                starryNightConfig.shootingStars.direction === 'multi-position') {
                keyframes += `
                    @keyframes starry-night-shooting-star-ltr-fade-${fadePoint} {
                        0% { transform: translate(0, 0) rotate(${angle}deg) scale(0.5); opacity: 0; }
                        10% { transform: translate(${dx * 0.1}px, ${dy * 0.1}px) rotate(${angle}deg) scale(1); opacity: 1; }
                        ${fadePoint}% { transform: translate(${dx * fadePoint/100}px, ${dy * fadePoint/100}px) rotate(${angle}deg) scale(1); opacity: 1; }
                        100% { transform: translate(${dx}px, ${dy}px) rotate(${angle}deg) scale(0.5); opacity: 0; }
                    }
                `;
            }
            
            if (starryNightConfig.shootingStars.direction === 'right-to-left' || 
                starryNightConfig.shootingStars.direction === 'random' ||
                starryNightConfig.shootingStars.direction === 'multi-position') {
                // For right-to-left, we invert the X movement and adjust the angle
                var rtlAngle = 180 - angle;
                var rtlRadians = rtlAngle * Math.PI / 180;
                var rtlDx = Math.cos(rtlRadians) * distance;
                var rtlDy = Math.sin(rtlRadians) * distance;
                
                keyframes += `
                    @keyframes starry-night-shooting-star-rtl-fade-${fadePoint} {
                        0% { transform: translate(0, 0) rotate(${rtlAngle}deg) scale(0.5); opacity: 0; }
                        10% { transform: translate(${rtlDx * 0.1}px, ${rtlDy * 0.1}px) rotate(${rtlAngle}deg) scale(1); opacity: 1; }
                        ${fadePoint}% { transform: translate(${rtlDx * fadePoint/100}px, ${rtlDy * fadePoint/100}px) rotate(${rtlAngle}deg) scale(1); opacity: 1; }
                        100% { transform: translate(${rtlDx}px, ${rtlDy}px) rotate(${rtlAngle}deg) scale(0.5); opacity: 0; }
                    }
                `;
            }
            
            if (starryNightConfig.shootingStars.direction === 'multi-position') {
                // For top-to-bottom, we use a downward angle (135 degrees)
                var ttbAngle = 135;
                var ttbRadians = ttbAngle * Math.PI / 180;
                var ttbDx = Math.cos(ttbRadians) * distance;
                var ttbDy = Math.sin(ttbRadians) * distance;
                
                keyframes += `
                    @keyframes starry-night-shooting-star-ttb-fade-${fadePoint} {
                        0% { transform: translate(0, 0) rotate(${ttbAngle}deg) scale(0.5); opacity: 0; }
                        10% { transform: translate(${ttbDx * 0.1}px, ${ttbDy * 0.1}px) rotate(${ttbAngle}deg) scale(1); opacity: 1; }
                        ${fadePoint}% { transform: translate(${ttbDx * fadePoint/100}px, ${ttbDy * fadePoint/100}px) rotate(${ttbAngle}deg) scale(1); opacity: 1; }
                        100% { transform: translate(${ttbDx}px, ${ttbDy}px) rotate(${ttbAngle}deg) scale(0.5); opacity: 0; }
                    }
                `;
            }
        }
        
        // Also keep the original animations as fallbacks
        if (starryNightConfig.shootingStars.direction === 'left-to-right' || 
            starryNightConfig.shootingStars.direction === 'random' ||
            starryNightConfig.shootingStars.direction === 'multi-position') {
            keyframes += `
                @keyframes starry-night-shooting-star-ltr {
                    0% { transform: translate(0, 0) rotate(${angle}deg) scale(0.5); opacity: 0; }
                    10% { transform: translate(${dx * 0.1}px, ${dy * 0.1}px) rotate(${angle}deg) scale(1); opacity: 1; }
                    90% { transform: translate(${dx * 0.9}px, ${dy * 0.9}px) rotate(${angle}deg) scale(1); opacity: 1; }
                    100% { transform: translate(${dx}px, ${dy}px) rotate(${angle}deg) scale(0.5); opacity: 0; }
                }
            `;
        }
        
        if (starryNightConfig.shootingStars.direction === 'right-to-left' || 
            starryNightConfig.shootingStars.direction === 'random' ||
            starryNightConfig.shootingStars.direction === 'multi-position') {
            // For right-to-left, we invert the X movement and adjust the angle
            var rtlAngle = 180 - angle;
            var rtlRadians = rtlAngle * Math.PI / 180;
            var rtlDx = Math.cos(rtlRadians) * distance;
            var rtlDy = Math.sin(rtlRadians) * distance;
            
            keyframes += `
                @keyframes starry-night-shooting-star-rtl {
                    0% { transform: translate(0, 0) rotate(${rtlAngle}deg) scale(0.5); opacity: 0; }
                    10% { transform: translate(${rtlDx * 0.1}px, ${rtlDy * 0.1}px) rotate(${rtlAngle}deg) scale(1); opacity: 1; }
                    90% { transform: translate(${rtlDx * 0.9}px, ${rtlDy * 0.9}px) rotate(${rtlAngle}deg) scale(1); opacity: 1; }
                    100% { transform: translate(${rtlDx}px, ${rtlDy}px) rotate(${rtlAngle}deg) scale(0.5); opacity: 0; }
                }
            `;
        }
        
        if (starryNightConfig.shootingStars.direction === 'multi-position') {
            // For top-to-bottom, we use a downward angle (135 degrees)
            var ttbAngle = 135;
            var ttbRadians = ttbAngle * Math.PI / 180;
            var ttbDx = Math.cos(ttbRadians) * distance;
            var ttbDy = Math.sin(ttbRadians) * distance;
            
            keyframes += `
                @keyframes starry-night-shooting-star-ttb {
                    0% { transform: translate(0, 0) rotate(${ttbAngle}deg) scale(0.5); opacity: 0; }
                    10% { transform: translate(${ttbDx * 0.1}px, ${ttbDy * 0.1}px) rotate(${ttbAngle}deg) scale(1); opacity: 1; }
                    90% { transform: translate(${ttbDx * 0.9}px, ${ttbDy * 0.9}px) rotate(${ttbAngle}deg) scale(1); opacity: 1; }
                    100% { transform: translate(${ttbDx}px, ${ttbDy}px) rotate(${ttbAngle}deg) scale(0.5); opacity: 0; }
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
        
        // Limit the number of stars to a maximum of 10
        var starsToCreate = Math.min(count, 10 - activeShootingStars);
        if (starsToCreate <= 0) return;
        
        for (var i = 0; i < starsToCreate; i++) {
            // Determine direction for this star
            var direction = starryNightConfig.shootingStars.direction;
            if (direction === 'random') {
                direction = Math.random() > 0.5 ? 'left-to-right' : 'right-to-left';
            }

            // For multi-position, randomly choose between top-to-bottom and right-to-left
            if (direction === 'multi-position') {
                direction = Math.random() > 0.4 ? 'right-to-left' : 'top-to-bottom';
            }
            
            var shootingStar = document.createElement('div');
            var x, y, gradientDirection, animationName;
            
            // Duration and delay
            var duration = randomBetween(starryNightConfig.shootingStars.minDuration, starryNightConfig.shootingStars.maxDuration);
            var delay = randomBetween(0, 3);
            
            // Add variation to size
            var thicknessVariation = Math.random() * 0.6 + 0.4; // 40% to 100% of configured thickness
            var thickness = Math.round(starryNightConfig.shootingStars.thickness * thicknessVariation);
            var length = Math.round(starryNightConfig.shootingStars.length * (thicknessVariation * 0.8 + 0.2)); // Size affects length but less dramatically
            
            // Add variation to fade timing - round to nearest 5 for animation names
            var fadeStartPoint = Math.round(randomBetween(75, 90) / 5) * 5; // 75, 80, 85, or 90
            
            // Calculate starting position based on direction
            if (direction === 'left-to-right') {
                // Start from left edge of screen within the configured start area
                x = randomBetween(0, window.innerWidth * (starryNightConfig.shootingStars.startSidePosition / 100));
                y = randomBetween(
                    window.innerHeight * (starryNightConfig.shootingStars.startAreaTop / 100),
                    window.innerHeight * (starryNightConfig.shootingStars.startAreaBottom / 100)
                );
                gradientDirection = '90deg'; // Left to right gradient
                animationName = `starry-night-shooting-star-ltr-fade-${fadeStartPoint}`;
            } else if (direction === 'top-to-bottom') {
                // Start from top edge of screen across the full width
                x = randomBetween(0, window.innerWidth);
                y = randomBetween(0, window.innerHeight * (starryNightConfig.shootingStars.startSidePosition / 100));
                gradientDirection = '180deg'; // Top to bottom gradient
                animationName = `starry-night-shooting-star-ttb-fade-${fadeStartPoint}`;
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
                animationName = `starry-night-shooting-star-rtl-fade-${fadeStartPoint}`;
            }
            
            shootingStar.className = 'starry-night-shooting-star';
            shootingStar.style.cssText = `
                position: absolute;
                width: ${length}px;
                height: ${thickness}px;
                left: ${x}px;
                top: ${y}px;
                background: linear-gradient(${gradientDirection}, 
                    ${starryNightConfig.shootingStars.headColor} 0%, 
                    ${starryNightConfig.shootingStars.trailColor} 50%, 
                    ${starryNightConfig.shootingStars.fadeColor} 100%);
                box-shadow: 0 0 ${thickness}px ${Math.ceil(thickness/2)}px rgba(255, 230, 128, 0.5);
                border-radius: 100px;
                animation: ${animationName} ${duration}s ${delay}s 1 linear forwards;
                z-index: ${starryNightConfig.zIndex.shootingStars};
            `;
            
            container.appendChild(shootingStar);
            activeShootingStars++;
            
            // Remove the shooting star when the animation completes
            var removalTime = (duration + delay) * 1000;
            setTimeout(function() {
                if (shootingStar.parentNode) {
                    shootingStar.parentNode.removeChild(shootingStar);
                    activeShootingStars--;
                }
            }, removalTime);
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
            if (activeShootingStars < 10 && Math.random() > (1 - starryNightConfig.shootingStars.chance)) {
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

    /**
     * Create the moon element in the top right corner
     */
    function createMoon() {
        var container = document.getElementById('starry-night-container');
        if (!container) return;
        
        var moon = document.createElement('div');
        var moonSize = starryNightConfig.moon.size;
        var topOffset = starryNightConfig.moon.topOffset;
        var rightOffset = starryNightConfig.moon.rightOffset;
        
        // Style the moon
        moon.className = 'starry-night-moon';
        moon.style.position = 'absolute';
        moon.style.top = topOffset + 'px';
        moon.style.right = rightOffset + 'px';
        moon.style.width = moonSize + 'px';
        moon.style.height = moonSize + 'px';
        moon.style.borderRadius = '50%';
        moon.style.background = 'radial-gradient(circle at 30% 30%, #fffce3, #ffed91 40%, #ffd25b 70%)';
        moon.style.boxShadow = '0 0 80px 10px rgba(255, 252, 170, 0.6)';
        moon.style.zIndex = starryNightConfig.zIndex.moon;
        moon.style.animation = 'moon-glow 15s ease-in-out infinite';
        
        // Add some texture to the moon to look like craters
        var moonTexture = document.createElement('div');
        moonTexture.style.position = 'absolute';
        moonTexture.style.top = '15%';
        moonTexture.style.left = '25%';
        moonTexture.style.width = '30%';
        moonTexture.style.height = '30%';
        moonTexture.style.borderRadius = '50%';
        moonTexture.style.background = 'rgba(229, 220, 180, 0.3)';
        moon.appendChild(moonTexture);
        
        var moonTexture2 = document.createElement('div');
        moonTexture2.style.position = 'absolute';
        moonTexture2.style.top = '55%';
        moonTexture2.style.left = '20%';
        moonTexture2.style.width = '40%';
        moonTexture2.style.height = '25%';
        moonTexture2.style.borderRadius = '50%';
        moonTexture2.style.background = 'rgba(229, 220, 180, 0.2)';
        moon.appendChild(moonTexture2);
        
        var moonTexture3 = document.createElement('div');
        moonTexture3.style.position = 'absolute';
        moonTexture3.style.top = '40%';
        moonTexture3.style.left = '60%';
        moonTexture3.style.width = '25%';
        moonTexture3.style.height = '25%';
        moonTexture3.style.borderRadius = '50%';
        moonTexture3.style.background = 'rgba(229, 220, 180, 0.3)';
        moon.appendChild(moonTexture3);
        
        // Add to container
        container.appendChild(moon);
    }
    
    /**
     * Create huge stars that move around
     */
    function createHugeStars(count) {
        var container = document.getElementById('starry-night-container');
        if (!container) return;
        
        var windowWidth = window.innerWidth;
        var windowHeight = Math.max(document.body.scrollHeight, window.innerHeight);
        
        // Create each huge star
        for (var i = 0; i < count; i++) {
            // Create a wrapper for the star and its glow to move together
            var starWrapper = document.createElement('div');
            var size = randomBetween(starryNightConfig.hugeStars.minSize, starryNightConfig.hugeStars.maxSize);
            
            // Calculate position (avoiding top header area and very bottom)
            var headerHeight = 120; // Approximate header height
            var x = randomBetween(100, windowWidth - 200);
            var y = randomBetween(headerHeight + 100, windowHeight - 300);
            
            // Style the wrapper to handle the movement
            starWrapper.className = 'starry-night-huge-star-wrapper';
            starWrapper.style.position = 'absolute';
            starWrapper.style.left = x + 'px';
            starWrapper.style.top = y + 'px';
            starWrapper.style.width = size + 'px';
            starWrapper.style.height = size + 'px';
            starWrapper.style.zIndex = starryNightConfig.zIndex.hugeStars;
            
            // Add movement animation to the wrapper
            var movementDuration = randomBetween(starryNightConfig.hugeStars.minSpeed, starryNightConfig.hugeStars.maxSpeed);
            var movementType = (i % 4) + 1; // Get one of 4 movement patterns
            starWrapper.style.animation = `huge-star-movement-${movementType} ${movementDuration}s ease-in-out infinite`;
            
            // Create the actual star inside the wrapper
            var star = document.createElement('div');
            star.className = 'starry-night-huge-star';
            star.style.position = 'absolute';
            star.style.width = '100%';
            star.style.height = '100%';
            star.style.borderRadius = '50%';
            star.style.background = 'radial-gradient(circle at 30% 30%, #ffffff, #fffce3 30%, #ffd25b 70%)';
            star.style.boxShadow = '0 0 35px 10px rgba(255, 255, 200, 0.7)';
            star.style.animation = 'huge-star-pulse 5s ease-in-out infinite, huge-star-glow 7s ease-in-out infinite';
            
            // Create a strong glow effect around the star
            var glow = document.createElement('div');
            var glowSize = size * starryNightConfig.hugeStars.glowSize;
            glow.className = 'starry-night-huge-star-glow';
            glow.style.position = 'absolute';
            glow.style.width = glowSize + 'px';
            glow.style.height = glowSize + 'px';
            glow.style.left = -((glowSize - size) / 2) + 'px';
            glow.style.top = -((glowSize - size) / 2) + 'px';
            glow.style.borderRadius = '50%';
            glow.style.background = 'radial-gradient(circle at center, rgba(255, 250, 150, 0.4) 0%, rgba(255, 240, 110, 0.2) 40%, rgba(255, 230, 100, 0) 70%)';
            glow.style.zIndex = '-1';
            
            // Add subtle rotation to the glow
            var rotateSpeed = randomBetween(30, 60);
            glow.style.animation = `starry-night-swirl ${rotateSpeed}s linear infinite`;
            
            // Add star and glow to the wrapper
            starWrapper.appendChild(glow);
            starWrapper.appendChild(star);
            
            // Add to container
            container.appendChild(starWrapper);
            
            // Add subtle rings like the small stars have
            var ringCount = randomBetween(2, 4);
            for (var r = 0; r < ringCount; r++) {
                var ring = document.createElement('div');
                var ringSize = size * (1.5 + (r * 0.5)); // Increasing sizes for each ring
                var rotateSpeed = randomBetween(40, 80);
                
                ring.className = 'starry-night-huge-star-ring';
                ring.style.position = 'absolute';
                ring.style.width = ringSize + 'px';
                ring.style.height = ringSize + 'px';
                ring.style.left = (size - ringSize) / 2 + 'px';
                ring.style.top = (size - ringSize) / 2 + 'px';
                ring.style.borderRadius = '50%';
                ring.style.border = '1px solid rgba(255, 250, 150, ' + (0.3 - (r * 0.07)) + ')';
                ring.style.filter = 'blur(1px)';
                ring.style.animation = `starry-night-swirl ${rotateSpeed}s linear infinite ${r * 3}s`;
                ring.style.zIndex = '-1';
                
                starWrapper.appendChild(ring);
            }
            
            // Add more subtle rays to make the star more van Gogh-like
            var rayCount = randomBetween(5, 8);
            for (var j = 0; j < rayCount; j++) {
                var ray = document.createElement('div');
                var rayLength = size * randomBetween(1.0, 1.5); // Shorter rays
                var rayWidth = size * 0.08; // Thinner rays
                var rayRotation = (j * (360 / rayCount)) + randomBetween(-10, 10);
                
                ray.className = 'starry-night-huge-star-ray';
                ray.style.position = 'absolute';
                ray.style.width = rayLength + 'px';
                ray.style.height = rayWidth + 'px';
                ray.style.left = (size / 2) + 'px';
                ray.style.top = (size / 2 - rayWidth / 2) + 'px';
                ray.style.transformOrigin = '0 50%';
                ray.style.transform = `rotate(${rayRotation}deg)`;
                ray.style.background = 'linear-gradient(90deg, rgba(255, 250, 150, 0.5) 0%, rgba(255, 230, 100, 0.1) 60%, rgba(255, 220, 80, 0) 100%)';
                ray.style.borderRadius = `${rayWidth/2}px`;
                ray.style.zIndex = '-1';
                ray.style.filter = 'blur(1px)'; // Add slight blur for softness
                
                starWrapper.appendChild(ray);
            }
        }
    }
})(); 