// 🌈 五彩缤纷鼠标特效
class ColorfulCursor {
    constructor() {
        this.trail = [];
        this.maxTrailLength = 20;
        this.colors = [
            '#ff6b6b', '#4ecdc4', '#45b7d1', '#ffbe0b', 
            '#fb5607', '#8338ec', '#3a86ff', '#ff006e',
            '#06d6a0', '#118ab2', '#073b4c', '#ef476f'
        ];
        this.init();
    }
    
    init() {
        this.createCanvas();
        this.bindEvents();
        this.animate();
    }
    
    createCanvas() {
        this.canvas = document.createElement('canvas');
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.pointerEvents = 'none';
        this.canvas.style.zIndex = '9999';
        this.ctx = this.canvas.getContext('2d');
        document.body.appendChild(this.canvas);
        this.resize();
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    bindEvents() {
        document.addEventListener('mousemove', (e) => {
            this.addTrailPoint(e.clientX, e.clientY);
        });
        
        document.addEventListener('click', (e) => {
            this.createExplosion(e.clientX, e.clientY);
        });
        
        window.addEventListener('resize', () => {
            this.resize();
        });
    }
    
    addTrailPoint(x, y) {
        this.trail.push({
            x,
            y,
            size: Math.random() * 8 + 4,
            color: this.colors[Math.floor(Math.random() * this.colors.length)],
            life: 1,
            velocity: {
                x: (Math.random() - 0.5) * 4,
                y: (Math.random() - 0.5) * 4
            }
        });
        
        if (this.trail.length > this.maxTrailLength) {
            this.trail.shift();
        }
    }
    
    createExplosion(x, y) {
        for (let i = 0; i < 20; i++) {
            this.trail.push({
                x,
                y,
                size: Math.random() * 12 + 6,
                color: this.colors[Math.floor(Math.random() * this.colors.length)],
                life: 1,
                velocity: {
                    x: (Math.random() - 0.5) * 10,
                    y: (Math.random() - 0.5) * 10
                }
            });
        }
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        for (let i = 0; i < this.trail.length; i++) {
            const point = this.trail[i];
            
            // 更新位置
            point.x += point.velocity.x;
            point.y += point.velocity.y;
            point.life -= 0.02;
            
            // 应用重力
            point.velocity.y += 0.1;
            
            // 绘制粒子
            this.ctx.globalAlpha = point.life;
            this.ctx.fillStyle = point.color;
            this.ctx.beginPath();
            this.ctx.arc(point.x, point.y, point.size * point.life, 0, Math.PI * 2);
            this.ctx.fill();
            
            // 移除死亡粒子
            if (point.life <= 0) {
                this.trail.splice(i, 1);
                i--;
            }
        }
        
        requestAnimationFrame(() => this.animate());
    }
}

// 🎨 彩虹文字效果
class RainbowText {
    constructor() {
        this.texts = document.querySelectorAll('.rainbow-text');
        this.init();
    }
    
    init() {
        this.texts.forEach(text => {
            this.applyRainbowEffect(text);
        });
    }
    
    applyRainbowEffect(element) {
        const text = element.textContent;
        element.innerHTML = '';
        
        for (let i = 0; i < text.length; i++) {
            const span = document.createElement('span');
            span.textContent = text[i];
            span.style.display = 'inline-block';
            span.style.animation = `rainbowLetter 2s infinite`;
            span.style.animationDelay = `${i * 0.1}s`;
            element.appendChild(span);
        }
    }
}

// 🌟 浮动星星效果
class FloatingStars {
    constructor() {
        this.stars = [];
        this.starCount = 30;
        this.init();
    }
    
    init() {
        this.createStars();
        this.animate();
    }
    
    createStars() {
        for (let i = 0; i < this.starCount; i++) {
            const star = document.createElement('div');
            star.style.position = 'fixed';
            star.style.width = `${Math.random() * 3 + 1}px`;
            star.style.height = star.style.width;
            star.style.backgroundColor = 'white';
            star.style.borderRadius = '50%';
            star.style.boxShadow = '0 0 10px white';
            star.style.pointerEvents = 'none';
            star.style.zIndex = '9998';
            star.style.left = `${Math.random() * 100}%`;
            star.style.top = `${Math.random() * 100}%`;
            star.style.animation = `twinkle ${Math.random() * 3 + 2}s infinite`;
            star.style.animationDelay = `${Math.random() * 5}s`;
            document.body.appendChild(star);
            this.stars.push(star);
        }
    }
    
    animate() {
        this.stars.forEach(star => {
            // 缓慢移动星星
            const currentLeft = parseFloat(star.style.left);
            const newLeft = currentLeft + (Math.random() - 0.5) * 0.1;
            star.style.left = `${Math.max(0, Math.min(100, newLeft))}%`;
        });
        
        setTimeout(() => this.animate(), 1000);
    }
}

// 🚀 页面加载特效
document.addEventListener('DOMContentLoaded', () => {
    // 初始化所有特效
    new ColorfulCursor();
    new RainbowText();
    new FloatingStars();
    
    // 添加页面加载动画
    const loader = document.createElement('div');
    loader.innerHTML = `
        <div style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(45deg, #667eea, #764ba2);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
            transition: opacity 1s ease;
        ">
            <div style="
                text-align: center;
                color: white;
                font-size: 2rem;
                font-weight: bold;
            ">
                <div style="margin-bottom: 20px;">🌟</div>
                <div>欢迎来到创意空间</div>
                <div style="font-size: 1rem; margin-top: 10px; opacity: 0.8;">
                    正在加载五彩世界...
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(loader);
    
    // 3秒后隐藏加载动画
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.remove();
        }, 1000);
    }, 3000);
});

// 添加 CSS 动画样式
const style = document.createElement('style');
style.textContent = `
    @keyframes rainbowLetter {
        0%, 100% { 
            color: #ff6b6b;
            transform: translateY(0) rotate(0deg);
        }
        16% { color: #4ecdc4; }
        32% { color: #45b7d1; }
        48% { color: #ffbe0b; }
        64% { color: #fb5607; }
        80% { color: #8338ec; }
        96% { 
            color: #3a86ff;
            transform: translateY(-10px) rotate(5deg);
        }
    }
    
    @keyframes twinkle {
        0%, 100% { opacity: 0.2; transform: scale(1); }
        50% { opacity: 1; transform: scale(1.5); }
    }
    
    /* 鼠标悬停特效 */
    .hover-glow {
        transition: all 0.3s ease;
    }
    
    .hover-glow:hover {
        transform: scale(1.05);
        filter: drop-shadow(0 0 10px currentColor);
    }
`;
document.head.appendChild(style);