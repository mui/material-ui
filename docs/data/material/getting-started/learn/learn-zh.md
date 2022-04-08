# 学习资源

<p class="description"> Material-UI 新手? 我们为你精心准备的学习资源，可以帮助你快速入门。</p>

## 第一个组件

下面的代码片段展示了一个基本的Material UI应用，它有一个 `<Button>` 组件：

```jsx
import * as React from 'react';
import ReactDOM from 'react-dom';
import Button from '@mui/material/Button';

function App() {
  return (
    <Button variant="contained" color="primary">
      Hello World
    </Button>
  );
}

ReactDOM.render(<App />, document.querySelector('#app'));
```

在下面的交互式演示中，尝试更改代码并查看它如何影响输出。 (注：将 `varian` 更改为 `"outlined"` 并且 `color` 更改为 `"secondary"`。 了解更多选项，请参阅 [`Button` 组件页面](components/buttons/).)

{{"demo": "../usage/Usage.js", "hideToolbar": true, "bg": true}}

## 示例项目

访问 [示例项目](/getting-started/example-projects/) 页面，以了解我们如何推荐如何实现各种React库和框架，例如Next. s, Gatsby, Create React App, 等等。

## 模板

看一下 [基本模板](/getting-started/templates/) 更快地开始构建下一个应用程序。

## 推荐资源

除了官方文档外，还有无数来自社区的成员，他们创建了非常好的教程和指南指导如何使用Material UI。

以下是我们找到的一些最好的第三方学习资源，可以学习如何使用我们的组件来构建漂亮的应用。

### 免费的资源

- [**Material UI v5 Crash Course**](https://www.youtube.com/watch?v=o1chMISeTC0) by Laith Harb：使用最新版Material UI构建应用须知

- [**React + Material UI - From Zero to Hero**](https://www.youtube.com/playlist?list=PLDxCaNaYIuUlG5ZqoQzFE27CUOoQvOqnQ) by Atheast 开发者：深入浅出地介绍了从基本的搭建到高级组件的实现。

- [**Next.js 11 Setup with Material UI v5**](https://www.youtube.com/watch?v=IFaFFmPYyMI) by Leo Roese: 学习如何使用 Emode 作为样式引擎，将Material UI 整合到您的Next.js 应用。

- **Create a Responsive Navigation Bar with Material UI v5</a> by Nikhil Thadani：详细介绍Create React App脚手架下使用Material UI。</p></li> 
  
  - [**The Clever Dev**](https://www.youtube.com/channel/UCb6AZy0_D1y661PMZck3jOw) 和 [**The Smart Devterur**](https://smartdevpreneur.com/category/javascript/material-ui/) by Jon M: 几十个高质量的视频和文章深入探讨Material UI 的具体细节。</ul>
