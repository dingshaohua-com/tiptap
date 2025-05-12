// 自动添加图片前缀
export function autoPrefixImageHost(html: string, host = 'https://gil-test.oss-cn-beijing.aliyuncs.com') {
  return html.replace(/<img\s+[^>]*src=["'](?!https?:\/\/|data:)([^"']+)["']/g, (match, relativeSrc) => match.replace(relativeSrc, host + '/' + relativeSrc.replace(/^\/+/, '')));
}

// 将行内公式转换为math-field
export function convertInlineLatexToMathField(html: string): string {
  return html.replace(/\\\((.+?)\\\)/g, (_, content) => {
    return `<math-field>${content}</math-field>`;
  });
}

// 特殊处理内容中的一些数据
export function handleOldData(data: any) {
  let newData = data;
  if (newData) {
    newData = convertInlineLatexToMathField(newData);
    newData = autoPrefixImageHost(newData);
  }
  return newData;
}
