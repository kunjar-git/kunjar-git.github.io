// ===== 日记搜索功能 =====

class JournalSearch {
    constructor(posts) {
        this.posts = posts;
        this.filteredPosts = [...posts];
    }

    // 搜索功能：支持标题、内容、标签
    search(query) {
        if (!query || query.trim() === '') {
            this.filteredPosts = [...this.posts];
            return this.filteredPosts;
        }

        const searchTerms = query.toLowerCase().trim().split(/\s+/);

        this.filteredPosts = this.posts.filter(post => {
            return searchTerms.every(term => {
                // 搜索标题
                if (post.title.toLowerCase().includes(term)) return true;
                
                // 搜索内容
                if (post.content.toLowerCase().includes(term)) return true;
                
                // 搜索标签
                if (post.tags.some(tag => tag.toLowerCase().includes(term))) return true;
                
                // 搜索日期
                if (post.date.includes(term)) return true;

                return false;
            });
        });

        return this.filteredPosts;
    }

    // 按标签筛选
    filterByTag(tag) {
        if (tag === 'all') {
            this.filteredPosts = [...this.posts];
        } else {
            this.filteredPosts = this.posts.filter(post => 
                post.tags.includes(tag)
            );
        }
        return this.filteredPosts;
    }

    // 获取所有唯一标签
    getAllTags() {
        const allTags = this.posts.flatMap(post => post.tags);
        return [...new Set(allTags)];
    }

    // 获取统计信息
    getStats() {
        const totalPosts = this.posts.length;
        const totalTags = this.getAllTags().length;
        
        // 从今天（2026-03-26）开始计算天数
        const startDate = new Date('2026-03-26');
        const today = new Date();
        const daysFromStart = Math.ceil((today - startDate) / (1000 * 60 * 60 * 24)) + 1;
        
        return { totalPosts, totalTags, daysFromStart };
    }

    // 按日期排序（最新的在前）
    sortByDate(descending = true) {
        this.filteredPosts.sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            return descending ? dateB - dateA : dateA - dateB;
        });
        return this.filteredPosts;
    }
}

// 导出供其他脚本使用
if (typeof module !== 'undefined' && module.exports) {
    module.exports = JournalSearch;
}
