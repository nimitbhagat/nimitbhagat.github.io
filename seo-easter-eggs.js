// 🥚 SEO Easter Eggs & Interactive Features
class SEOEasterEggs {
    constructor() {
        this.konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // ↑↑↓↓←→←→BA
        this.konamiIndex = 0;
        this.init();
    }

    init() {
        this.addKonamiCode();
        this.addClickCounter();
        this.addSEOSecrets();
        this.addDynamicTitle();
    }

    addKonamiCode() {
        document.addEventListener('keydown', (e) => {
            if (e.keyCode === this.konamiCode[this.konamiIndex]) {
                this.konamiIndex++;
                if (this.konamiIndex === this.konamiCode.length) {
                    this.activateSEOGodMode();
                    this.konamiIndex = 0;
                }
            } else {
                this.konamiIndex = 0;
            }
        });
    }

    activateSEOGodMode() {
        // Rainbow SEO effect
        document.body.style.animation = 'rainbow 2s infinite';
        
        // Add rainbow CSS
        const style = document.createElement('style');
        style.textContent = `
            @keyframes rainbow {
                0% { filter: hue-rotate(0deg); }
                100% { filter: hue-rotate(360deg); }
            }
            .seo-god-mode {
                position: fixed; top: 50%; left: 50%;
                transform: translate(-50%, -50%);
                background: linear-gradient(45deg, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082, #9400d3);
                background-size: 400% 400%;
                animation: gradient 2s ease infinite;
                color: white; padding: 20px; border-radius: 15px;
                text-align: center; z-index: 10000;
                box-shadow: 0 0 50px rgba(255,255,255,0.5);
            }
            @keyframes gradient {
                0% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
                100% { background-position: 0% 50%; }
            }
        `;
        document.head.appendChild(style);
        
        const godMode = document.createElement('div');
        godMode.className = 'seo-god-mode';
        godMode.innerHTML = `
            <h2>🚀 SEO GOD MODE ACTIVATED! 🚀</h2>
            <p>🎯 Perfect SEO Score: 100/100</p>
            <p>⚡ Lightning Fast Loading</p>
            <p>🏆 All Achievements Unlocked</p>
            <p>🌟 You are now an SEO Master!</p>
        `;
        
        document.body.appendChild(godMode);
        
        setTimeout(() => {
            godMode.remove();
            document.body.style.animation = '';
        }, 5000);
        
        // Unlock all achievements
        if (window.seoAchievements) {
            Object.keys(window.seoAchievements.achievements).forEach(id => {
                window.seoAchievements.unlock(id);
            });
        }
    }

    addClickCounter() {
        let clicks = 0;
        const logo = document.querySelector('.logo');
        
        logo?.addEventListener('click', (e) => {
            clicks++;
            
            if (clicks === 10) {
                this.showSEOStats();
            } else if (clicks === 20) {
                this.showHiddenMessage();
            }
            
            // Add click effect
            const ripple = document.createElement('span');
            ripple.style.cssText = `
                position: absolute; border-radius: 50%;
                background: rgba(255,255,255,0.6);
                transform: scale(0); animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            const rect = logo.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = (e.clientX - rect.left - size/2) + 'px';
            ripple.style.top = (e.clientY - rect.top - size/2) + 'px';
            
            logo.style.position = 'relative';
            logo.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
        
        // Add ripple animation
        const rippleStyle = document.createElement('style');
        rippleStyle.textContent = `
            @keyframes ripple {
                to { transform: scale(4); opacity: 0; }
            }
        `;
        document.head.appendChild(rippleStyle);
    }

    showSEOStats() {
        const stats = document.createElement('div');
        stats.style.cssText = `
            position: fixed; top: 20px; left: 50%;
            transform: translateX(-50%); z-index: 9999;
            background: #2c3e50; color: #ecf0f1; padding: 20px;
            border-radius: 10px; font-family: 'Courier New', monospace;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        `;
        
        const seoScore = JSON.parse(localStorage.getItem('seo_score') || '{}');
        const navigation = performance.getEntriesByType('navigation')[0];
        
        stats.innerHTML = `
            <h3>📊 SEO Debug Console</h3>
            <p>🎯 SEO Score: ${seoScore.score || 0}/100</p>
            <p>⚡ Load Time: ${Math.round(navigation?.loadEventEnd - navigation?.fetchStart || 0)}ms</p>
            <p>🖼️ Images: ${document.images.length}</p>
            <p>🔗 Links: ${document.links.length}</p>
            <p>📱 Viewport: ${window.innerWidth}x${window.innerHeight}</p>
            <p>🌐 User Agent: ${navigator.userAgent.split(' ')[0]}</p>
        `;
        
        document.body.appendChild(stats);
        setTimeout(() => stats.remove(), 5000);
    }

    showHiddenMessage() {
        const message = document.createElement('div');
        message.style.cssText = `
            position: fixed; bottom: 20px; right: 20px; z-index: 9999;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white; padding: 15px; border-radius: 10px;
            max-width: 250px; font-size: 14px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        `;
        
        message.innerHTML = `
            <h4>🎉 Secret Unlocked!</h4>
            <p>You found the hidden SEO easter egg! This portfolio is optimized with:</p>
            <ul style="margin: 10px 0; padding-left: 20px;">
                <li>Structured Data</li>
                <li>Open Graph Tags</li>
                <li>Perfect Meta Tags</li>
                <li>Semantic HTML</li>
                <li>Performance Monitoring</li>
            </ul>
            <p style="font-size: 12px; opacity: 0.8;">Built with ❤️ by Nimit Bhagat</p>
        `;
        
        document.body.appendChild(message);
        setTimeout(() => message.remove(), 8000);
    }

    addSEOSecrets() {
        // Secret console commands
        window.seoSecrets = {
            showSchema: () => {
                const schema = document.querySelector('script[type="application/ld+json"]');
                console.log('📋 Structured Data:', JSON.parse(schema?.textContent || '{}'));
            },
            showMeta: () => {
                const meta = [...document.querySelectorAll('meta')].map(m => ({
                    name: m.name || m.property,
                    content: m.content
                }));
                console.table(meta);
            },
            seoAudit: () => {
                console.log('🔍 SEO Audit Results:');
                console.log('✅ Title Length:', document.title.length, 'chars');
                console.log('✅ Meta Description:', document.querySelector('meta[name="description"]')?.content.length, 'chars');
                console.log('✅ H1 Tags:', document.querySelectorAll('h1').length);
                console.log('✅ Images with Alt:', [...document.images].filter(img => img.alt).length, '/', document.images.length);
                console.log('✅ Internal Links:', [...document.links].filter(link => link.hostname === location.hostname).length);
            }
        };
        
        console.log('🎯 SEO Secrets Loaded! Try: seoSecrets.seoAudit()');
    }

    addDynamicTitle() {
        let originalTitle = document.title;
        let titleInterval;
        
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                let i = 0;
                const messages = ['🚀 Come back!', '⚡ SEO Master', '🎯 Perfect Score', '🏆 Achievement'];
                titleInterval = setInterval(() => {
                    document.title = messages[i % messages.length];
                    i++;
                }, 1000);
            } else {
                clearInterval(titleInterval);
                document.title = originalTitle;
            }
        });
    }
}

// Initialize
new SEOEasterEggs();