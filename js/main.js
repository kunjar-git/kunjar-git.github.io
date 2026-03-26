// ===== 主页主逻辑 =====

document.addEventListener('DOMContentLoaded', () => {
    loadLatestPosts();
});

// 加载最新文章到主页
function loadLatestPosts() {
    const container = document.getElementById('latest-posts');
    if (!container) return;
    
    // 如果 journalPosts 可用（从 journal-data.js 加载）
    if (typeof journalPosts !== 'undefined') {
        const latest = journalPosts
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, 3); // 只显示最新 3 篇
        
        container.innerHTML = latest.map(post => createPostItem(post)).join('');
    } else {
        container.innerHTML = `
            <p style="text-align: center; color: var(--text-secondary);">
                日记内容加载中... <a href="journal/index.html" style="color: var(--primary-color);">查看全部</a>
            </p>
        `;
    }
}

// 创建文章列表项
function createPostItem(post) {
    const tagLabels = {
        life: '生活',
        thoughts: '思考',
        tech: '技术',
        travel: '旅行'
    };
    
    const primaryTag = post.tags[0] || 'life';
    
    return `
        <a href="journal/post.html?id=${post.id}" class="post-item">
            <div class="post-meta">
                <span class="post-tag">${tagLabels[primaryTag] || primaryTag}</span>
                <span class="post-date">📅 ${formatDate(post.date)}</span>
            </div>
            <h3 class="post-title">${post.title}</h3>
            <p class="post-excerpt">${post.excerpt}</p>
        </a>
    `;
}

// 格式化日期
function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}年${month}月${day}日`;
}
