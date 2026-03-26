// ===== 时间线页面逻辑（侧边栏布局）=====

document.addEventListener('DOMContentLoaded', async () => {
    await loadTimeline();
});

async function loadTimeline() {
    const container = document.getElementById('timeline-container');
    const yearNav = document.getElementById('year-nav');
    
    try {
        const response = await fetch('posts/timeline-data.json');
        const data = await response.json();
        
        // 按日期排序（最新的在前）
        const timeline = data.timeline.sort((a, b) => new Date(b.date) - new Date(a.date));
        
        // 按年份分组
        const groupedByYear = groupByYear(timeline);
        
        // 渲染年份导航
        renderYearNav(yearNav, groupedByYear);
        
        // 渲染时间线
        renderTimeline(container, groupedByYear);
        
        // 设置滚动监听
        setupScrollSpy(groupedByYear);
        
    } catch (error) {
        console.error('加载时间线失败:', error);
        container.innerHTML = `
            <div class="loading">
                😕 加载失败，请稍后刷新重试
            </div>
        `;
    }
}

// 按年份分组
function groupByYear(timeline) {
    const groups = {};
    
    timeline.forEach(item => {
        const year = new Date(item.date).getFullYear();
        if (!groups[year]) {
            groups[year] = [];
        }
        groups[year].push(item);
    });
    
    return groups;
}

// 渲染年份导航
function renderYearNav(container, groupedByYear) {
    const years = Object.keys(groupedByYear).sort((a, b) => b - a);
    
    container.innerHTML = years.map((year, index) => `
        <button class="year-nav-btn ${index === 0 ? 'active' : ''}" 
                data-year="${year}"
                onclick="scrollToYear('${year}')">
            ${year}年
        </button>
    `).join('');
}

// 渲染时间线
function renderTimeline(container, groupedByYear) {
    const years = Object.keys(groupedByYear).sort((a, b) => b - a);
    
    container.innerHTML = years.map(year => `
        <div class="year-group" id="year-${year}">
            <div class="year-header">${year}年</div>
            <div class="timeline">
                ${groupedByYear[year].map(item => createTimelineItem(item)).join('')}
            </div>
        </div>
    `).join('');
}

// 创建时间线条目
function createTimelineItem(item) {
    const tagLabels = {
        life: '生活',
        thoughts: '思考',
        tech: '技术',
        travel: '旅行'
    };
    
    const tagsHtml = item.tags.map(tag => 
        `<span class="timeline-tag">${tagLabels[tag] || tag}</span>`
    ).join('');
    
    return `
        <a href="${item.link}" class="timeline-item">
            <div class="timeline-date">📅 ${item.dateDisplay}</div>
            <h3 class="timeline-title">${item.title}</h3>
            <p class="timeline-description">${item.description}</p>
            ${tagsHtml}
        </a>
    `;
}

// 滚动到指定年份
function scrollToYear(year) {
    const element = document.getElementById(`year-${year}`);
    if (element) {
        const offset = 120;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;
        
        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
        
        // 更新激活状态
        document.querySelectorAll('.year-nav-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.year === year) {
                btn.classList.add('active');
            }
        });
    }
}

// 设置滚动监听（滚动时高亮对应年份）
function setupScrollSpy(groupedByYear) {
    const years = Object.keys(groupedByYear).sort((a, b) => b - a);
    
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY + 200;
        
        for (const year of years) {
            const element = document.getElementById(`year-${year}`);
            if (element && element.offsetTop <= scrollPosition) {
                document.querySelectorAll('.year-nav-btn').forEach(btn => {
                    btn.classList.remove('active');
                    if (btn.dataset.year === year) {
                        btn.classList.add('active');
                    }
                });
                break;
            }
        }
    });
}
