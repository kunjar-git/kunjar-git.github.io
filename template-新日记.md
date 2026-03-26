# 新日记模板

复制以下内容到 `js/journal-data.js` 的 `journalPosts` 数组中：

```javascript
{
    id: "2026-03-26-post-title",
    title: "日记标题",
    date: "2026-03-26",
    tags: ["life", "thoughts"],  // 可选：life, thoughts, tech, travel
    excerpt: "简短摘要，50 字以内，显示在日记列表中",
    content: `
## 正文标题

这里是日记正文内容...

### 小标题

支持 Markdown 语法：

- **粗体文字**
- *斜体文字*
- > 引用文字
- 无序列表项
- [超链接](https://example.com)
- \`行内代码\`

\`\`\`
代码块
\`\`\`

---

*日记结尾*
`
}
```

## 标签说明

| 标签 | 用途 | 颜色 |
|------|------|------|
| `life` | 生活日常 | 绿色 |
| `thoughts` | 思考感悟 | 粉色 |
| `tech` | 技术分享 | 青色 |
| `travel` | 旅行见闻 | 橙色 |

## 发布步骤

1. 编辑 `js/journal-data.js`
2. 在 `journalPosts` 数组开头添加新条目（最新的在最前面）
3. 保存文件
4. 提交并推送到 GitHub：
   ```bash
   git add js/journal-data.js
   git commit -m "Add: 新日记 - 日记标题"
   git push
   ```
5. 等待 1-2 分钟，网站自动更新
