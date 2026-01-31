# 个人学术网站

基于 React + TypeScript + Vite + Tailwind CSS 构建的简洁学术主页。

## 在线预览

🌐 [https://yourusername.github.io](https://yourusername.github.io)

## 功能特点

- 📱 响应式设计，支持桌面和移动端
- 📑 单页应用，Tab 导航（About / News / Publications / Projects / CV）
- 🎨 简洁优雅的学术风格
- ⚡ 快速加载，SEO 友好

## 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build
```

## 部署到 GitHub Pages

### 步骤 1：创建 GitHub 仓库

1. 在 GitHub 创建新仓库，命名为 `yourusername.github.io`
2. 将代码推送到该仓库

### 步骤 2：配置 GitHub Pages

1. 进入仓库的 **Settings** → **Pages**
2. **Source** 选择 "GitHub Actions"

### 步骤 3：自动部署

每次推送到 `main` 分支时，GitHub Actions 会自动构建并部署网站。

## 自定义内容

编辑 `src/sections/` 目录下的文件来修改内容：

| 文件 | 内容 |
|------|------|
| `About.tsx` | 个人简介、研究兴趣 |
| `News.tsx` | 最新动态 |
| `Publications.tsx` | 论文发表 |
| `Projects.tsx` | 研究项目 |
| `CV.tsx` | 简历信息 |

## 技术栈

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Lucide React (图标)

## 许可

MIT License
