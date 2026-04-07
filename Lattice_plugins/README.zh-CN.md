# Lattice Scholar 插件

[English](./README.md)

本仓库收录基于 Lattice Scholar Local API 构建的社区插件与扩展功能。欢迎使用、提交 PR、参与贡献。

项目主页：[Lattice Scholar](https://stringer07.github.io/Lattice_release/)

## 已有插件

### Word 插件

在 Microsoft Word 中直接搜索 Lattice Scholar 文献库、插入引用并生成参考文献列表。

- 不离开 Word 即可搜索文献
- 以内联引用的形式插入引文
- 生成格式化的参考文献列表（IEEE、APA 或自定义 CSL 样式）
- 与 Lattice Scholar 自动同步元数据

详见 [`word-addin/`](./word-addin/)。

## Local API

Lattice Scholar 运行时会暴露一组本地 HTTP API，插件通过这些接口与用户的文献库交互：

| 接口 | 说明 |
|------|------|
| `GET /api/v1/status` | 检查连接状态与应用版本 |
| `GET /api/v1/search?q=...&limit=...` | 搜索文献库中的论文 |
| `GET /api/v1/papers/:id` | 获取论文的完整元数据 |

你可以使用任何语言或平台构建插件——桌面应用、浏览器扩展、编辑器集成、命令行工具，或任何能发送 HTTP 请求的程序。

## 参与贡献

欢迎所有形式的贡献：

- 基于 Local API 开发**新插件**（任何编辑器、平台或工作流）
- 改进**现有 Word 插件**（新功能、Bug 修复等等）
- 完善**文档**与示例

详见 [CONTRIBUTING.md](./CONTRIBUTING.md)。

所有贡献者保留其作品的版权，并同等享有项目许可证的保护

## 许可证

本项目以 [PolyForm Shield 1.0.0](./LICENSE) 协议发布，属于**源码可用**（source-available）许可。

- 你可以出于任何非竞争目的自由使用、修改和再分发本软件。
- 公开再分发时须在显著位置注明 Lattice Scholar 项目出处。

本项目不是 OSI 批准的开源项目。完整说明见 [LICENSING.md](./LICENSING.md)。
