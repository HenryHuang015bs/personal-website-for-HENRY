# 如何运行 index.html 静态文件

## 📄 关于您的项目

您的项目中有两个部分：

1. **静态 HTML 文件**：`index.html`（纯 HTML + CSS + JavaScript）
2. **Next.js 应用**：`app/` 目录中的 React 组件

## 🚀 运行 index.html 的三种方式

### 方式 1：直接在浏览器中打开 ⚠️（有限制）

**最简单，但有局限性：**

1. 在 Finder 中双击 `index.html` 文件
2. 或在终端运行：
   ```bash
   open index.html
   ```

**问题**：
- 使用 `file://` 协议，可能遇到 CORS 问题
- 某些功能可能无法正常工作
- **Stagewise 无法正常连接**

---

### 方式 2：使用静态文件服务器 ✅（推荐）

**适合 Stagewise 使用！**

#### 选项 A：使用 `npx serve`（最简单）

```bash
# 在项目目录中运行
npx serve .
```

然后访问：`http://localhost:3000/index.html` 或 `http://localhost:3000`

#### 选项 B：使用 Python 的 http.server

```bash
# Python 3
python3 -m http.server 8000
```

然后访问：`http://localhost:8000/index.html`

#### 选项 C：使用 Node.js 的 `http-server`

```bash
# 安装（如果还没安装）
npm install -g http-server

# 运行
http-server .
```

---

### 方式 3：配置 Next.js 支持静态 HTML ✅（最佳）

如果您想同时使用 Next.js 和静态 HTML，可以配置 Next.js：

1. **将 `index.html` 移动到 `public/` 目录**
2. **或配置 Next.js 作为静态文件服务器**

---

## 🎯 推荐方案

### 如果您主要使用 `index.html`：

使用 **方式 2（静态文件服务器）**，最简单：

```bash
npx serve .
```

### 如果您想同时使用 Next.js 和 Stagewise：

使用 **Next.js 开发服务器**（但需要将 HTML 转换为 React，或配置静态文件服务）。

---

## ⚠️ 关于 Stagewise

**Stagewise 需要开发服务器才能工作！**

- ✅ 使用静态文件服务器（如 `npx serve`）可以工作
- ✅ 使用 Next.js 开发服务器（`npm run dev`）可以工作
- ❌ 直接打开 HTML 文件（`file://` 协议）**无法工作**

---

## 🔧 快速开始

### 运行静态 HTML（最简单）：

```bash
# 在项目目录中
npx serve .
```

访问：`http://localhost:3000`

### 运行 Next.js（如果要用 React 组件）：

```bash
npm run dev
```

访问：`http://localhost:3000`

---

## 💡 总结

您的 `index.html` **完全可以运行**！只需：

1. **最简单**：双击文件打开（但 Stagewise 无法连接）
2. **推荐**：使用 `npx serve .` 启动静态服务器
3. **最佳**：将 HTML 转换为 Next.js 组件（如果需要）

**对于 Stagewise**：使用 `npx serve .` 或 `npm run dev` 都可以！

