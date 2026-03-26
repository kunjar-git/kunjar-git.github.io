# 🌐 个人网站 - GitHub Pages

现代清新风格的个人网站，支持日记、时间线、搜索功能。

## 📁 文件结构

```
github-io-site/
├── index.html              # 主页
├── about.html              # 关于我
├── timeline.html           # 时间线（新增）
├── journal/
│   └── index.html          # 日记列表页
├── posts/
│   ├── posts-index.json    # 日记索引
│   └── *.html              # 独立日记文件
├── css/
│   ├── style.css           # 全局样式
│   └── journal.css         # 日记样式
└── js/
    ├── journal.js          # 日记逻辑
    └── journal-search.js   # 搜索功能
```

## 🚀 部署

```bash
cd github-io-site
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/kunjar-git/kunjar-git.github.io.git
git push -u origin main
```

访问：https://kunjar-git.github.io

## ✏️ 添加日记

**两种方式：**

### 方式 1: 告诉我内容（推荐）

直接说："帮我添加一篇日记，标题 xxx，内容 xxx"

我帮你创建文件并推送！

### 方式 2: 手动添加

1. 在 `posts/` 创建 `YYYY-MM-DD-title.html`
2. 更新 `posts/posts-index.json`
3. `git push`

详见 `添加日记模板.md`

## 🎨 功能列表

✅ 响应式设计（手机/平板/电脑）
✅ 全文搜索（标题、内容、标签）
✅ 标签筛选（生活/思考/技术/旅行）
✅ 统计面板（日记数、标签数、记录天数）
✅ 时间线视图（按时间顺序展示）
✅ Markdown 支持（日记内容自动渲染）
✅ 动画效果（流畅交互体验）

## 📝 标签说明

| 标签 | 用途 | 颜色 |
|------|------|------|
| life | 生活日常 | 绿色 |
| thoughts | 思考感悟 | 粉色 |
| tech | 技术分享 | 青色 |
| travel | 旅行见闻 | 橙色 |

---

**祝你使用愉快！** 🎉
