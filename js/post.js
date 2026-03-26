// ===== 日记详情页逻辑 =====

document.addEventListener('DOMContentLoaded', () => {
    loadPost();
});

function loadPost() {
    const postId = getUrlParam('id');
    
    if (!postId) {
        showNotFound();
        return;
    }
    
    const post = journalPosts.find(p => p.id === postId);
    
    if (!post) {
        showNotFound();
        return;
    }
    
    renderPost(post);
    updatePageTitle(post);
}

function renderPost(post) {
    const container = document.getElementById('post-content');
    if (!container) return;
    
    const tagLabels = {
        life: '生活',
        thoughts: '思考',
        tech: '技术',
        travel: '旅行'
    };
    
    const tagsHtml = post.tags.map(tag => 
        `<span class="post-tag ${tag}">${tagLabels[tag] || tag}</span>`
    ).join('');
    
    // 简单的 Markdown 转 HTML
    const contentHtml = convertMarkdownToHtml(post.content);
    
    container.innerHTML = `
        <div class="post-header">
            <h1>${post.title}</h1>
            <div class="post-meta-large">
                <span>📅 ${formatDate(post.date)}</span>
                <div class="post-tags">${tagsHtml}</div>
            </div>
        </div>
        <div class="post-body">
            ${contentHtml}
        </div>
    `;
}

// 简单的 Markdown 转换（支持基础语法）
function convertMarkdownToHtml(markdown) {
    let html = markdown;
    
    // 标题
    html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
    html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');
    
    // 粗体
    html = html.replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>');
    
    // 斜体
    html = html.replace(/\*(.*)\*/gim, '<em>$1</em>');
    
    // 引用
    html = html.replace(/^> (.*$)/gim, '<blockquote>$1</blockquote>');
    
    // 列表
    html = html.replace(/^\- (.*$)/gim, '<li>$1</li>');
    html = html.replace(/^\* (.*$)/gim, '<li>$1</li>');
    html = html.replace(/^\d+\. (.*$)/gim, '<li>$1</li>');
    
    // 包裹列表项
    html = html.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');
    
    // 代码块
    html = html.replace(/```([\s\S]*?)```/gim, '<pre><code>$1</code></pre>');
    
    // 行内代码
    html = html.replace(/`([^`]+)`/gim, '<code>$1</code>');
    
    // 链接
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/gim, '<a href="$2" target="_blank">$1</a>');
    
    // 图片
    html = html.replace(/!\[([^\]]+)\]\(([^)]+)\)/gim, '<img src="$2" alt="$1" style="max-width: 100%; border-radius: 12px; margin: 1rem 0;">');
    
    // 水平线
    html = html.replace(/^---$/gim, '<hr style="border: 0; border-top: 2px solid var(--border-color); margin: 2rem 0;">');
    
    // 换行
    html = html.replace(/\n/gim, '<br>');
    
    // 清理多余的 <br>
    html = html.replace(/<\/(h[1-6]|ul|ol|li|blockquote|pre)>/gim, match => match.replace('<br>', ''));
    
    return html;
}

function updatePageTitle(post) {
    document.title = `${post.title} - 个人日记`;
}

function showNotFound() {
    const container = document.getElementById('post-content');
    if (!container) return;
    
    container.innerHTML = `
        <div style="text-align: center; padding: 4rem 2rem;">
            <h2 style="font-size: 2rem; margin-bottom: 1rem;">😕 日记未找到</h2>
            <p style="color: var(--text-secondary); margin-bottom: 2rem;">
                这篇日记可能已被删除或链接有误
            </p>
            <a href="index.html" class="btn btn-primary">返回日记列表</a>
        </div>
    `;
}

function getUrlParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}年${month}月${day}日 ${hours}:${minutes}`;
}
