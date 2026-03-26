# 🌐 个人网站 - GitHub Pages 部署指南

这是一个现代清新风格的个人网站模板，支持日记功能和全文搜索。

## 📁 文件结构

```
github-io-site/
├── index.html          # 主页
├── about.html          # 关于我页面
├── journal/
│   ├── index.html      # 日记列表页
│   └── post.html       # 日记详情页
├── css/
│   ├── style.css       # 全局样式
│   └── journal.css     # 日记页面样式
└── js/
    ├── main.js         # 主页逻辑
    ├── journal-data.js # 日记数据（在这里添加新日记）
    ├── journal-search.js # 搜索功能
    └── journal.js      # 日记页面逻辑
```

## 🚀 快速部署

### 步骤 1: 创建 GitHub 仓库

1. 登录 GitHub
2. 创建新仓库，命名为：`你的用户名.github.io`
   - 例如：你的用户名是 `zhangsan`，仓库名就是 `zhangsan.github.io`
3. 仓库设为公开（Public）

### 步骤 2: 上传文件

**方法 A: 使用 Git 命令行（推荐）**

```bash
# 进入项目目录
cd github-io-site

# 初始化 Git
git init

# 添加所有文件
git add .

# 提交
git commit -m "Initial commit: 个人网站"

# 添加远程仓库（替换为你的仓库地址）
git remote add origin https://github.com/你的用户名/你的用户名.github.io.git

# 推送
git branch -M main
git push -u origin main
```

**方法 B: 使用 GitHub 网页上传**

1. 打开你的 GitHub 仓库
2. 点击 "Add file" → "Upload files"
3. 拖拽所有文件到上传区域
4. 点击 "Commit changes"

### 步骤 3: 等待部署

- GitHub Pages 会在 1-2 分钟内自动部署
- 访问：`https://你的用户名.github.io`

## ✏️ 添加新日记

打开 `js/journal-data.js`，在 `journalPosts` 数组中添加新条目：

```javascript
{
    id: "2026-03-26-my-new-post",  // 唯一 ID（建议用日期 + 标题）
    title: "日记标题",
    date: "2026-03-26",            // 格式：YYYY-MM-DD
    tags: ["life", "thoughts"],    // 标签：life/thoughts/tech/travel
    excerpt: "简短摘要，显示在列表中",
    content: `
## 日记正文

支持 Markdown 语法：

- **粗体**
- *斜体*
- > 引用
- 列表项
- [链接](https://example.com)
- \`代码\`
`
}
```

添加后保存，推送到 GitHub 即可自动更新。

## 🎨 自定义内容

### 修改个人信息

1. **主页标题** - 编辑 `index.html` 中的 `.hero-title`
2. **关于我页面** - 编辑 `about.html` 中的内容
3. **社交链接** - 在所有页面的 footer 中修改 GitHub/Twitter/Email

### 修改配色方案

编辑 `css/style.css` 顶部的 CSS 变量：

```css
:root {
    --primary-color: #6366f1;      /* 主色调 */
    --secondary-color: #ec4899;    /* 辅助色 */
    --accent-color: #06b6d4;       /* 强调色 */
}
```

### 添加新标签

1. 在 `js/journal-data.js` 中添加新标签到日记的 `tags` 数组
2. 在 `journal/index.html` 中添加对应的筛选按钮
3. 在 `css/journal.css` 中添加标签颜色样式

## 🌍 绑定自定义域名

1. 购买域名（如：yourname.com）
2. 在域名服务商处添加 CNAME 记录：
   - 主机记录：`www`
   - 记录值：`你的用户名.github.io`
3. 在项目根目录创建 `CNAME` 文件，内容：
   ```
   yourname.com
   www.yourname.com
   ```
4. 推送到 GitHub
5. 在 GitHub 仓库 → Settings → Pages → Custom domain 中填写你的域名

## 📊 功能特性

✅ 响应式设计（手机/平板/电脑完美适配）
✅ 全文搜索（支持标题、内容、标签搜索）
✅ 标签筛选（快速分类浏览）
✅ 统计面板（日记数量、标签数量、记录天数）
✅ Markdown 支持（日记内容自动渲染）
✅ 动画效果（流畅的交互体验）
✅ SEO 友好（语义化 HTML 结构）

## 🛠️ 进阶定制

### 添加更多页面

复制 `about.html` 作为模板，创建新页面如 `projects.html`、`portfolio.html` 等。

### 添加评论功能

集成 Disqus 或 Giscus（基于 GitHub Issues 的评论系统）：

```html
<!-- 在 post.html 的 post-body 后添加 -->
<div id="giscus-comments"></div>
<script src="https://giscus.app/client.js"
        data-repo="你的用户名/你的用户名.github.io"
        data-repo-id="xxx"
        data-category="Announcements"
        data-category-id="xxx"
        data-mapping="pathname"
        data-strict="0"
        data-reactions-enabled="1"
        data-emit-metadata="0"
        data-input-position="bottom"
        data-theme="light"
        data-lang="zh-CN"
        crossorigin="anonymous"
        async>
</script>
```

### 添加访问统计

集成 Umami 或 Google Analytics 跟踪访问量。

## 📝 更新日志

- **v1.0** - 初始版本
  - 主页、关于我、日记列表、日记详情
  - 全文搜索和标签筛选
  - 现代清新设计风格

## 📄 许可证

MIT License - 自由使用、修改、分发

---

**祝你使用愉快！** 🎉

如有问题，欢迎在 GitHub 提 Issue 或邮件联系。
