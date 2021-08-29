// 问题一：为什么要使用 hiddenTextarea 来计算高度、最小高度，不是直接使用传入的 textarea
// 问题二：为什么 maxRows 只是用来设置 height ，而不是 maxHeigh, 
// 答：maxRows 是保证最多多少行，不出滚动条

let hiddenTextarea;

// hiddenTextarea 的样式
const HIDDEN_STYLE = `
  height:0 !important;
  visibility:hidden !important;
  overflow:hidden !important;
  position:absolute !important;
  z-index:-1000 !important;
  top:0 !important;
  right:0 !important
`;

const CONTEXT_STYLE = [
  'letter-spacing',
  'line-height',
  'padding-top',
  'padding-bottom',
  'font-family',
  'font-weight',
  'font-size',
  'text-rendering',
  'text-transform',
  'width',
  'text-indent',
  'padding-left',
  'padding-right',
  'border-width',
  'box-sizing'
];
// 计算目标节点的样式
function calculateNodeStyling(targetElement) {
  // 获取节点样式列表
  const style = window.getComputedStyle(targetElement);

  const boxSizing = style.getPropertyValue('box-sizing');

  const paddingSize = (
    
    parseFloat(style.getPropertyValue('padding-bottom')) +
    parseFloat(style.getPropertyValue('padding-top'))
  );

  const borderSize = (
    parseFloat(style.getPropertyValue('border-bottom-width')) +
    parseFloat(style.getPropertyValue('border-top-width'))
  );
  // 获取 CONTEXT_STYLE 对应的样式 拼接为字符串
  const contextStyle = CONTEXT_STYLE
    .map(name => `${name}:${style.getPropertyValue(name)}`)
    .join(';');

  return { contextStyle, paddingSize, borderSize, boxSizing };
}

export default function calcTextareaHeight(
  targetElement,
  minRows = 1,
  maxRows = null
) {
  // 创建 临时textarea 节点 用来计算高度
  if (!hiddenTextarea) {
    hiddenTextarea = document.createElement('textarea');
    document.body.appendChild(hiddenTextarea);
  }

  // 获取目标节点相关样式
  let {
    paddingSize,
    borderSize,
    boxSizing,
    contextStyle // 
  } = calculateNodeStyling(targetElement);
  // 将目标节点样式、值 赋给 临时textare 节点
  hiddenTextarea.setAttribute('style', `${contextStyle};${HIDDEN_STYLE}`);
  hiddenTextarea.value = targetElement.value || targetElement.placeholder || '';
  // scrollHeight = padding + content
  let height = hiddenTextarea.scrollHeight;
  const result = {};
  // 计算高度 border-box: contentH + paddingH + borderH
  if (boxSizing === 'border-box') {
    height = height + borderSize;
    // content-box: contentH
  } else if (boxSizing === 'content-box') {
    height = height - paddingSize;
  }

  hiddenTextarea.value = '';
  // 计算一行字的高度
  let singleRowHeight = hiddenTextarea.scrollHeight - paddingSize;
  // 根据 min、max row计算最小最大高度
  if (minRows !== null) {
    let minHeight = singleRowHeight * minRows;
    if (boxSizing === 'border-box') {
      minHeight = minHeight + paddingSize + borderSize;
    }
    height = Math.max(minHeight, height);
    result.minHeight = `${ minHeight }px`;
  }
  if (maxRows !== null) {
    let maxHeight = singleRowHeight * maxRows;
    if (boxSizing === 'border-box') {
      maxHeight = maxHeight + paddingSize + borderSize;
    }
    height = Math.min(maxHeight, height);
  }
  result.height = `${ height }px`;
  hiddenTextarea.parentNode && hiddenTextarea.parentNode.removeChild(hiddenTextarea);
  hiddenTextarea = null;
  return result;
}
