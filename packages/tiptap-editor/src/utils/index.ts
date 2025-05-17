// 自动添加图片前缀
export function autoPrefixImageHost(html: string, host = 'https://gil-test.oss-cn-beijing.aliyuncs.com') {
  return html.replace(/<img\s+[^>]*src=["'](?!https?:\/\/|data:)([^"']+)["']/g, (match, relativeSrc) => match.replace(relativeSrc, host + '/' + relativeSrc.replace(/^\/+/, '')));
}

export function convertInlineLatexToMathField(html: string): string {
  const latexRegex = /\\\(([\s\S]+?)\\\)|\$\$([\s\S]+?)\$\$|\\\[([\s\S]+?)\\\]|\$(?!\$)([\s\S]+?)\$/g;

  return html.replace(latexRegex, (_, group1, group2, group3, group4) => {
    // 哪个组匹配到就用哪个
    const content = group1 || group2 || group3 || group4 || '';
    return `<math-field>${content.trim()}</math-field>`;
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
