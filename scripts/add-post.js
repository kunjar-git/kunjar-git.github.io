#!/usr/bin/env node

/**
 * 添加新日记的自动化脚本
 * 用法：node scripts/add-post.js
 */

const fs = require('fs');
const path = require('path');

// 配置
const POSTS_DIR = path.join(__dirname, '..', 'posts');
const INDEX_FILE = path.join(POSTS_DIR, 'posts-index.json');
const TIMELINE_FILE = path.join(POSTS_DIR, 'timeline-data.json');

// 标签映射
const TAG_LABELS = {
    life: '生活',
    thoughts: '思考',
    tech: '技术',
    travel: '旅行'
};

// 读取命令行参数
const args = process.argv.slice(2);
if (args.length < 4) {
    console.log('用法：node scripts/add-post.js <日期> <标题> <标签> <摘要>');
    console.log('示例：node scripts/add-post.js 2026-03-26 "今天的一天" life,thoughts "简短摘要"');
    process.exit(1);
}

const [date, title, tagsStr, excerpt] = args;
const tags = tagsStr.split(',').map(t => t.trim());
const id = `${date}-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;

console.log(`\n📝 创建新日记:`);
console.log(`  ID: ${id}`);
console.log(`  标题：${title}`);
console.log(`  日期：${date}`);
console.log(`  标签：${tags.join(', ')}`);
console.log(`  摘要：${excerpt}\n`);

// 读取现有数据
let postsIndex = [];
let timelineData = [];

if (fs.existsSync(INDEX_FILE)) {
    const data = JSON.parse(fs.readFileSync(INDEX_FILE, 'utf-8'));
    postsIndex = data.posts || [];
}

if (fs.existsSync(TIMELINE_FILE)) {
    const data = JSON.parse(fs.readFileSync(TIMELINE_FILE, 'utf-8'));
    timelineData = data.timeline || [];
}

// 添加新日记到索引
postsIndex.unshift({
    id,
    title,
    date,
    tags,
    excerpt,
    content: `## ${title}\n\n（内容待编辑）`
});

// 添加新日记到时间线
const dateObj = new Date(date);
const weekdays = ['日', '一', '二', '三', '四', '五', '六'];
const dateDisplay = `${dateObj.getFullYear()}年${String(dateObj.getMonth() + 1).padStart(2, '0')}月${String(dateObj.getDate()).padStart(2, '0')}日 星期${weekdays[dateObj.getDay()]}`;

timelineData.push({
    id,
    date,
    dateDisplay,
    title,
    description: excerpt,
    tags,
    link: `posts/${id}.html`
});

// 按日期排序时间线（最新的在前）
timelineData.sort((a, b) => new Date(b.date) - new Date(a.date));

// 写回文件
fs.writeFileSync(INDEX_FILE, JSON.stringify({ posts: postsIndex }, null, 2), 'utf-8');
fs.writeFileSync(TIMELINE_FILE, JSON.stringify({ timeline: timelineData }, null, 2), 'utf-8');

console.log('✅ 已更新 posts-index.json 和 timeline-data.json');
console.log('\n下一步:');
console.log(`1. 创建日记 HTML 文件：posts/${id}.html`);
console.log(`2. 运行：git add . && git commit -m "Add: ${title}" && git push`);
console.log(`3. 等待 1-2 分钟，网站自动更新\n`);
