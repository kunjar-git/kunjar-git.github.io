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

// 从 posts 目录加载所有日记
async function loadAllPosts() {
    try {
        // 读取 posts 目录的索引文件
        const response = await fetch('../posts/posts-index.json');
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
        console.log('使用备用数据加载方式...');
        
        // 备用方案：直接内嵌数据
        allPosts = [
            {
                id: "2023-06-24-not-a-medicine-god",
                title: "我不是药神",
                date: "2023-06-24",
                tags: ["thoughts"],
                excerpt: "5 年后重温《我不是药神》，从只记得\"god bless you\"到思考人性、情法、成长...",
                content: "## 📽️ 重温发现的情节\n\n- **程勇遇到了假药贩子**，中途放弃过卖印度格列宁\n- **程勇没和思慧上床**，给思慧留下了很好的印象\n- **曹警官在情与法之间选择了情**\n\n## 💭 思考和疑问\n\n### 1️⃣ 关于扶老人\n在如今的社会，扶老人等已经是大家望而生畏的问题...\n\n### 2️⃣ 好人成佛 vs 坏人放下屠刀\n好人成佛要九九八十一难，坏人只需要放下屠刀...\n\n### 3️⃣ 人情冷暖\n关于出狱之后，没有任何人来看望程勇...\n\n### 4️⃣ 如果是我会怎么选\n我估计也会和程勇一样吧，随着年纪大了，已经没那么纯粹了...\n\n### 5️⃣ 吕受益妻子的态度\n吕受益的妻子对程勇前后的态度之大...\n\n---\n\n> 突然想起当时的自己（2018）应该只记得 **\"god bless you\"** 了...\n\n果然随着时间的变化，对同一件事物的看法会发生变化，希望自己快快成长叭！"
            },
            {
                id: "2026-03-25-first-post",
                title: "开始写日记的第一天",
                date: "2026-03-25",
                tags: ["life", "thoughts"],
                excerpt: "今天决定开始记录自己的生活，用 GitHub Pages 搭建了这个个人网站。希望这里能成为我思考的港湾...",
                content: "## 🎉 新的开始\n\n今天是我开始写日记的第一天！\n\n我决定用 GitHub Pages 搭建这个个人网站，主要出于几个考虑：\n\n1. **完全免费** - 不需要支付服务器费用\n2. **版本控制** - Git 可以帮我管理所有修改历史\n3. **自定义域名** - 以后可以绑定自己的域名\n4. **完全掌控** - 数据和内容都在自己手里\n\n### 为什么开始写日记？\n\n生活中有太多值得记录的瞬间：\n- 突然冒出的想法和灵感\n- 读过的好书和感悟\n- 遇到的有趣的人和事\n- 解决问题的过程和经验\n\n如果不记录下来，这些珍贵的片段很快就会消失在记忆的长河中。\n\n### 对未来的期待\n\n希望这个空间能：\n- 📝 记录真实的生活\n- 💡 沉淀思考的精华\n- 🌱 见证自己的成长\n- 🔗 连接志同道合的朋友\n\n---\n\n*这是第一篇日记，未来回头看一定会很有趣！*"
            },
            {
                id: "2026-03-20-book-review",
                title: "《原子习惯》读书笔记",
                date: "2026-03-20",
                tags: ["thoughts", "life"],
                excerpt: "最近读了《原子习惯》这本书，对习惯养成有了全新的认识。微小的改变，长期的坚持，会带来惊人的复利效应...",
                content: "## 📚 核心观点\n\n**原子习惯 = 微小习惯 + 复利效应**\n\n每天进步 1%，一年后你会进步 37 倍；\n每天退步 1%，一年后你会几乎归零。\n\n### 习惯养成的四大定律\n\n1. **让它显而易见** - 设计环境，让提示清晰可见\n2. **让它有吸引力** - 绑定喜好，让习惯变得诱人\n3. **让它简便易行** - 降低门槛，从两分钟规则开始\n4. **让它令人愉悦** - 即时奖励，让大脑记住快感\n\n### 我的实践计划\n\n- ✅ 每天早上写日记（已绑定到早餐后的咖啡时间）\n- ✅ 每天阅读 30 分钟（放在床头，睡前必读）\n- ✅ 每周运动 3 次（提前准备好运动装备）\n\n---\n\n*习惯不是目标，而是系统。建立好的系统，结果自然会发生。*"
            },
            {
                id: "2026-03-15-weekend-hike",
                title: "周末徒步：城市边缘的自然",
                date: "2026-03-15",
                tags: ["travel", "life"],
                excerpt: "这个周末去城郊的山里徒步，发现原来离城市不远的地方就有这么美的自然风景。远离屏幕，呼吸新鲜空气，整个人都放松了...",
                content: "## 🥾 徒步路线\n\n**地点**：城郊西山步道\n**距离**：8 公里环线\n**耗时**：约 4 小时\n**难度**：⭐⭐☆☆☆\n\n### 沿途风景\n\n早上 7 点出发，山里还有薄薄的雾气。沿着石阶往上走，两边的树木开始抽出新芽，春天的气息扑面而来。\n\n在半山腰遇到了一个小瀑布，水声潺潺，坐在旁边的石头上休息了很久。城市里的喧嚣在这里完全听不到，只有鸟鸣和风声。\n\n### 一些感悟\n\n平时生活在钢筋水泥的森林里，很容易忘记大自然的样子。其实只要愿意走出家门，自然就在不远处等着我们。\n\n**下次要带的东西**：\n- 更多水（这次带少了）\n- 防晒霜（中午太阳很晒）\n- 相机（手机拍照还是不够用）\n\n---\n\n*大自然是最好的治愈剂，建议每周至少接触一次。*"
            }
        ];
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
        updateStatsForFiltered();
    });
    
    // 按钮搜索
    if (searchBtn) {
        searchBtn.addEventListener('click', () => {
            const query = searchInput.value;
            searchEngine.search(query);
            renderPosts(searchEngine.sortByDate());
            updateStatsForFiltered();
        });
    }
    
    // 回车搜索
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const query = searchInput.value;
            searchEngine.search(query);
            renderPosts(searchEngine.sortByDate());
            updateStatsForFiltered();
        }
    });
}

// 重置统计（显示全部）
function resetStats() {
    initStats();
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
            
            // 更新统计面板（显示筛选后的数量）
            if (filter === 'all') {
                resetStats();
            } else {
                updateStatsForFiltered();
            }
            
            console.log('筛选标签:', filter, '结果数量:', searchEngine.filteredPosts.length);
        });
    });
}

// 更新统计面板（筛选后）
function updateStatsForFiltered() {
    const filteredCount = searchEngine.filteredPosts.length;
    animateNumber('total-posts', filteredCount);
    
    // 更新标签数量（筛选后的标签）
    const filteredTags = new Set();
    searchEngine.filteredPosts.forEach(post => {
        post.tags.forEach(tag => filteredTags.add(tag));
    });
    animateNumber('total-tags', filteredTags.size);
}

// 获取 URL 参数
function getUrlParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}
