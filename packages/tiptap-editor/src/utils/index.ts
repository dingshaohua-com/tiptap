import { Feature } from './enum';

const autoPrefixImageHost = (html: string, host = 'https://gil-test.oss-cn-beijing.aliyuncs.com') => {
  return html.replace(/<img\s+[^>]*src=["'](?!https?:\/\/|data:)([^"']+)["']/g, (match, relativeSrc) => match.replace(relativeSrc, host + '/' + relativeSrc.replace(/^\/+/, '')));
};

const convertInlineLatexToMathField = (html: string): string => {
  const latexRegex = /\\\(([\s\S]+?)\\\)|\$\$([\s\S]+?)\$\$|\\\[([\s\S]+?)\\\]|\$(?!\$)([\s\S]+?)\$/g;

  return html.replace(latexRegex, (_, group1, group2, group3, group4) => {
    // 哪个组匹配到就用哪个
    const content = group1 || group2 || group3 || group4 || '';
    return `<math-field>${content.trim()}</math-field>`;
  });
};

// 特殊处理旧的富文本内容中的一些数据(自动添加图片前缀, 正则替换)
export const handleOldData = (data: any) => {
  let newData = data;
  if (newData) {
    newData = convertInlineLatexToMathField(newData);
    newData = autoPrefixImageHost(newData);
  }
  return newData;
};

/**
 * 从 URL 中提取文件名（可选择是否包含扩展名）
 * @param {string} url - 文件的 URL 地址
 * @param {boolean} withExtension - 是否包含扩展名，默认 false
 * @returns {string|null} - 文件名，匹配不到则返回 null
 */
export const getFilename = (url: string, withExtension = false) => {
  if (typeof url !== 'string') return null;

  // 提取完整文件名（含扩展名）
  const match = url.match(/\/([^\/?#]+)(?=$|[?#])/);
  if (!match) return null;

  const filenameWithExt = match[1];

  if (withExtension) {
    return filenameWithExt;
  } else {
    const dotIndex = filenameWithExt.lastIndexOf('.');
    return dotIndex !== -1 ? filenameWithExt.substring(0, dotIndex) : filenameWithExt;
  }
};

/**
 * 获取文件链接的后缀名（正则表达式版）
 * @param {string} fileUrl 文件链接或文件名
 * @returns {string} 文件后缀名（小写），如果没有后缀则返回空字符串
 */
export const getFileExtension = (fileUrl: string) => {
  if (!fileUrl || typeof fileUrl !== 'string') return '';

  // 正则表达式匹配后缀名
  // 1. [^?#]* 匹配除了?和#以外的所有字符（处理查询参数和哈希）
  // 2. \. 匹配点号
  // 3. ([^?#/.]*) 匹配后缀名（不包含点号、斜杠、?和#）
  const match = fileUrl.match(/[^?#]*\.([^?#/.]*)(?:[?#].*)?$/i);

  return match ? match[1].toLowerCase() : '';
};

// 计算最终编辑器的功能（工具栏菜单）列表
export const calculateFeatures = (includeFeatures?: Feature[], excludeFeatures?: Feature[]): Feature[] => {
  let features: Feature[] = [];
  if (includeFeatures && !excludeFeatures) {
    features = includeFeatures;
  }
  if (!includeFeatures && excludeFeatures) {
    features = Object.values(Feature).filter((feature) => !excludeFeatures.includes(feature));
  }

  if (includeFeatures && excludeFeatures) {
    features = includeFeatures.filter((feature) => !excludeFeatures.includes(feature));
  }

  if (!includeFeatures && !excludeFeatures) {
    features = Object.values(Feature);
  }

  return features;
};

/**
 * 将 PascalCase 转换为 camelCase
 * @param str - 输入的大驼峰字符串
 * @returns 转换后的小驼峰字符串
 */
export const pascalToCamel = (str: string): string => {
  if (!str) return '';
  return str[0].toLowerCase() + str.slice(1);
};

// 移除最外层节点
export const stripOuterNode = (html: string): string => {
  const wrapper = document.createElement('div');
  wrapper.innerHTML = html.trim();

  // 如果只有一个子节点并且是 Element，则返回其 innerHTML
  if (wrapper.childNodes.length === 1 && wrapper.firstChild instanceof HTMLElement) {
    return wrapper.firstChild.innerHTML;
  }

  return html;
};
