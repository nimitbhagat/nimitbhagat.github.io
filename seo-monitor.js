// 🚀 Creative SEO Performance Monitor
class SEOMonitor {
    constructor() {
        this.metrics = {};
        this.init();
    }

    init() {
        // Track page load performance
        window.addEventListener('load', () => {
            this.trackPerformance();
            this.validateSEO();
            this.trackUserEngagement();
        });
    }

    trackPerformance() {
        const navigation = performance.getEntriesByType('navigation')[0];
        this.metrics.loadTime = Math.round(navigation.loadEventEnd - navigation.fetchStart);
        this.metrics.domReady = Math.round(navigation.domContentLoadedEventEnd - navigation.fetchStart);
        
        // SEO-friendly performance scoring
        const score = this.calculatePerformanceScore();
        console.log(`🎯 SEO Performance Score: ${score}/100`);
    }

    validateSEO() {
        const desc = document.querySelector('meta[name="description"]')?.content;
        const seoChecks = {
            title: document.title.length > 30 && document.title.length < 70,
            description: desc && desc.length > 120 && desc.length < 160,
            h1: document.querySelectorAll('h1').length === 1,
            images: [...document.images].filter(img => img.src && !img.src.includes('data:')).every(img => img.alt && img.alt.trim().length > 0),
            structuredData: !!document.querySelector('script[type="application/ld+json"]'),
            openGraph: !!document.querySelector('meta[property="og:title"]')
        };

        const passed = Object.values(seoChecks).filter(Boolean).length;
        const total = Object.keys(seoChecks).length;
        
        console.log(`✅ SEO Validation: ${passed}/${total} checks passed`);
        Object.entries(seoChecks).forEach(([check, result]) => {
            console.log(`${result ? '✅' : '❌'} ${check}: ${result}`);
        });
        
        // Store in localStorage for analytics
        localStorage.setItem('seo_score', JSON.stringify({
            score: Math.round((passed/total) * 100),
            timestamp: Date.now(),
            checks: seoChecks
        }));
    }

    trackUserEngagement() {
        let scrollDepth = 0;
        let timeOnPage = Date.now();

        window.addEventListener('scroll', () => {
            const depth = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
            scrollDepth = Math.max(scrollDepth, depth);
        });

        window.addEventListener('beforeunload', () => {
            const engagement = {
                timeOnPage: Date.now() - timeOnPage,
                scrollDepth: scrollDepth,
                timestamp: Date.now()
            };
            
            // Send to analytics (placeholder)
            console.log('📊 User Engagement:', engagement);
        });
    }

    calculatePerformanceScore() {
        let score = 100;
        if (this.metrics.loadTime > 3000) score -= 30;
        if (this.metrics.loadTime > 5000) score -= 20;
        if (this.metrics.domReady > 2000) score -= 20;
        return Math.max(0, score);
    }
}

// 🎨 Creative SEO Enhancements
class CreativeSEO {
    static addDynamicSchema() {
        const schema = {
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": document.title,
            "description": document.querySelector('meta[name="description"]')?.content,
            "url": window.location.href,
            "dateModified": new Date().toISOString(),
            "author": {
                "@type": "Person",
                "name": "Nimit Bhagat"
            }
        };

        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify(schema);
        document.head.appendChild(script);
    }

    static enhanceImages() {
        document.querySelectorAll('img[data-src]').forEach(img => {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        observer.unobserve(img);
                    }
                });
            });
            observer.observe(img);
        });
    }
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new SEOMonitor();
        CreativeSEO.addDynamicSchema();
        CreativeSEO.enhanceImages();
    });
} else {
    new SEOMonitor();
    CreativeSEO.addDynamicSchema();
    CreativeSEO.enhanceImages();
}