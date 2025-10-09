// 🏆 SEO Achievement System
class SEOAchievements {
    constructor() {
        this.achievements = {
            'seo-master': { name: '🎯 SEO Master', desc: 'Perfect 6/6 SEO score', unlocked: false },
            'speed-demon': { name: '⚡ Speed Demon', desc: 'Load time under 2s', unlocked: false },
            'mobile-first': { name: '📱 Mobile Champion', desc: 'Perfect mobile experience', unlocked: false },
            'social-butterfly': { name: '🦋 Social Butterfly', desc: 'All social tags present', unlocked: false },
            'accessibility-hero': { name: '♿ Accessibility Hero', desc: 'All images have alt text', unlocked: false }
        };
        this.init();
    }

    init() {
        this.checkAchievements();
        this.createAchievementUI();
        this.startRealTimeMonitoring();
    }

    checkAchievements() {
        // Check SEO Master
        const seoScore = JSON.parse(localStorage.getItem('seo_score') || '{}');
        if (seoScore.score === 100) {
            this.unlock('seo-master');
        }

        // Check Speed Demon
        const navigation = performance.getEntriesByType('navigation')[0];
        if (navigation && navigation.loadEventEnd - navigation.fetchStart < 2000) {
            this.unlock('speed-demon');
        }

        // Check Social Butterfly
        if (document.querySelector('meta[property="og:title"]') && 
            document.querySelector('meta[name="twitter:card"]')) {
            this.unlock('social-butterfly');
        }

        // Check Accessibility Hero
        const images = [...document.images].filter(img => img.src && !img.src.includes('data:'));
        if (images.length > 0 && images.every(img => img.alt && img.alt.trim().length > 0)) {
            this.unlock('accessibility-hero');
        }

        // Check Mobile First
        if (window.innerWidth <= 768 && this.achievements['seo-master'].unlocked) {
            this.unlock('mobile-first');
        }
    }

    unlock(achievementId) {
        if (!this.achievements[achievementId].unlocked) {
            this.achievements[achievementId].unlocked = true;
            this.showAchievementNotification(achievementId);
            this.saveProgress();
        }
    }

    showAchievementNotification(achievementId) {
        const achievement = this.achievements[achievementId];
        const notification = document.createElement('div');
        notification.className = 'achievement-notification';
        notification.innerHTML = `
            <div class="achievement-content">
                <h3>🎉 Achievement Unlocked!</h3>
                <p><strong>${achievement.name}</strong></p>
                <p>${achievement.desc}</p>
            </div>
        `;
        
        // Add styles
        notification.style.cssText = `
            position: fixed; top: 20px; right: 20px; z-index: 9999;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white; padding: 20px; border-radius: 10px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            transform: translateX(400px); transition: all 0.5s ease;
            max-width: 300px; font-family: Arial, sans-serif;
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => notification.style.transform = 'translateX(0)', 100);
        
        // Remove after 4 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => notification.remove(), 500);
        }, 4000);
    }

    createAchievementUI() {
        const achievementPanel = document.createElement('div');
        achievementPanel.id = 'achievement-panel';
        achievementPanel.innerHTML = `
            <div class="achievement-toggle">🏆</div>
            <div class="achievement-list">
                <h3>🎯 SEO Achievements</h3>
                ${Object.entries(this.achievements).map(([id, achievement]) => `
                    <div class="achievement-item ${achievement.unlocked ? 'unlocked' : 'locked'}">
                        <span class="achievement-icon">${achievement.unlocked ? '✅' : '🔒'}</span>
                        <div>
                            <strong>${achievement.name}</strong>
                            <p>${achievement.desc}</p>
                        </div>
                    </div>
                `).join('')}
                <div class="achievement-progress">
                    Progress: ${Object.values(this.achievements).filter(a => a.unlocked).length}/5
                </div>
            </div>
        `;
        
        achievementPanel.style.cssText = `
            position: fixed; bottom: 20px; left: 20px; z-index: 1000;
        `;
        
        // Add CSS
        const style = document.createElement('style');
        style.textContent = `
            #achievement-panel .achievement-toggle {
                width: 50px; height: 50px; border-radius: 50%;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                display: flex; align-items: center; justify-content: center;
                font-size: 24px; cursor: pointer; box-shadow: 0 4px 15px rgba(0,0,0,0.2);
                transition: transform 0.3s ease;
            }
            #achievement-panel .achievement-toggle:hover { transform: scale(1.1); }
            #achievement-panel .achievement-list {
                position: absolute; bottom: 60px; left: 0;
                background: white; border-radius: 10px; padding: 15px;
                box-shadow: 0 10px 30px rgba(0,0,0,0.2);
                min-width: 280px; display: none;
            }
            #achievement-panel.open .achievement-list { display: block; }
            .achievement-item {
                display: flex; align-items: center; gap: 10px;
                padding: 8px 0; border-bottom: 1px solid #eee;
            }
            .achievement-item.locked { opacity: 0.5; }
            .achievement-item p { margin: 0; font-size: 12px; color: #666; }
            .achievement-progress {
                text-align: center; margin-top: 10px; font-weight: bold;
                color: #667eea;
            }
        `;
        document.head.appendChild(style);
        
        document.body.appendChild(achievementPanel);
        
        // Toggle functionality
        achievementPanel.querySelector('.achievement-toggle').onclick = () => {
            achievementPanel.classList.toggle('open');
        };
    }

    startRealTimeMonitoring() {
        // Monitor scroll depth for engagement
        let maxScroll = 0;
        window.addEventListener('scroll', () => {
            const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
            maxScroll = Math.max(maxScroll, scrollPercent);
            
            if (maxScroll > 80 && this.achievements['seo-master'].unlocked) {
                this.unlock('accessibility-hero');
            }
        });
        
        // Monitor resize for mobile check
        window.addEventListener('resize', () => {
            if (window.innerWidth <= 768 && this.achievements['seo-master'].unlocked) {
                this.unlock('mobile-first');
            }
        });
    }

    saveProgress() {
        localStorage.setItem('seo_achievements', JSON.stringify(this.achievements));
    }

    loadProgress() {
        const saved = localStorage.getItem('seo_achievements');
        if (saved) {
            this.achievements = { ...this.achievements, ...JSON.parse(saved) };
        }
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new SEOAchievements());
} else {
    new SEOAchievements();
}