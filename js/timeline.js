// ===== 时间线页面逻辑 =====

document.addEventListener('DOMContentLoaded', async () => {
    await loadTimeline();
});

async function loadTimeline() {
    const container = document.getElementById('timeline-container');
    
    try {
        const response = await fetch('posts/timeline-data.json');
        const data = await response.json();
        
        // 按日期排序（最新的在前）
        const timeline = data.timeline.sort((a, b) => new Date(b.date) - new Date(a.date));
        
        container.innerHTML = timeline.map(item => createTimelineItem(item)).join('');
    } catch (error) {
        console.error('加载时间线失败:', error);
        container.innerHTML = `
            <div class="loading">
                😕 加载失败，请稍后刷新重试
            </div>
        `;
    }
}

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
