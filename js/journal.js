// ===== 日记页面主逻辑 =====

let searchEngine = null;
let allPosts = [];

document.addEventListener('DOMContentLoaded', async () => {
    // 加载所有日记
    await loadAllPosts();
    
    // 初始化搜索
    searchEngine = new JournalSearch(allPosts);
    
    // 初始化页面
    initStats();
    renderPosts(searchEngine.sortByDate());
    setupSearch();
    setupFilters();
});

// 从 posts 目录加载所有 Markdown 文件
async function loadAllPosts() {
    try {
        // 读取 posts 目录的索引文件
        const response = await fetch('./posts-index.json');
        const postsIndex = await response.json();
        
        allPosts = postsIndex.map(post => ({
            id: post.id,
            title: post.title,
            date: post.date,
            tags: post.tags,
            excerpt: post.excerpt,
            content: post.content
        }));
    } catch (error) {
        console.error('加载日记失败:', error);
        // 如果加载失败，使用默认空数组
        allPosts = [];
    }
}

// 初始化统计信息
function initStats() {
    const stats = searchEngine.getStats();
    
    animateNumber('total-posts', stats.totalPosts);
    animateNumber('total-tags', stats.totalTags);
    animateNumber('first-post-days', stats.daysDiff);
}

// 数字动画
function animateNumber(elementId, target) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    let current = 0;
    const increment = target / 20;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 50);
}

// 渲染日记列表
function renderPosts(posts) {
    const container = document.getElementById('posts-container');
    const noResults = document.getElementById('no-results');
    
    if (!container) return;
    
    if (posts.length === 0) {
        container.style.display = 'none';
        noResults.style.display = 'block';
        return;
    }
    
    container.style.display = 'grid';
    noResults.style.display = 'none';
    
    container.innerHTML = posts.map(post => createPostCard(post)).join('');
}

// 创建日记卡片
function createPostCard(post) {
    const tagLabels = {
        life: '生活',
        thoughts: '思考',
        tech: '技术',
        travel: '旅行'
    };
    
    const tagsHtml = post.tags.map(tag => 
        `<span class="post-tag ${tag}">${tagLabels[tag] || tag}</span>`
    ).join('');
    
    return `
        <a href="../posts/${post.id}.html" class="post-card">
            <div class="post-card-header">
                <div class="post-card-date">
                    📅 ${formatDate(post.date)}
                </div>
                <h3 class="post-card-title">${post.title}</h3>
            </div>
            <div class="post-card-body">
                <p class="post-card-excerpt">${post.excerpt}</p>
                <div class="post-card-tags">
                    ${tagsHtml}
                </div>
            </div>
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

// 设置搜索功能
function setupSearch() {
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');
    
    if (!searchInput) return;
    
    // 实时搜索（输入时）
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value;
        searchEngine.search(query);
        renderPosts(searchEngine.sortByDate());
    });
    
    // 按钮搜索
    if (searchBtn) {
        searchBtn.addEventListener('click', () => {
            const query = searchInput.value;
            searchEngine.search(query);
            renderPosts(searchEngine.sortByDate());
        });
    }
    
    // 回车搜索
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const query = searchInput.value;
            searchEngine.search(query);
            renderPosts(searchEngine.sortByDate());
        }
    });
}

// 设置标签筛选
function setupFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // 移除所有激活状态
            filterBtns.forEach(b => b.classList.remove('active'));
            // 激活当前按钮
            btn.classList.add('active');
            
            // 筛选
            const filter = btn.dataset.filter;
            searchEngine.filterByTag(filter);
            renderPosts(searchEngine.sortByDate());
        });
    });
}

// 获取 URL 参数
function getUrlParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}
