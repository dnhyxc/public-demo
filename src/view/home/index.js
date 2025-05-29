import React, { useState, useEffect, useRef } from 'react';

const ChatInput = () => {
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef(null);
  const footerRef = useRef(null);

  // 样式方案（关键）
  const styles = {
    container: {
      position: 'relative',
      height: '100%',
      paddingBottom: 'calc(50px + env(safe-area-inset-bottom))', // 为底部区域预留空间
    },
    content: {
      paddingBottom: 60, // 大于底部输入框高度
    },
    footer: {
      position: 'absolute', // 改为 absolute
      bottom: 0,
      left: 0,
      right: 0,
      height: '50px',
      paddingBottom: 'env(safe-area-inset-bottom)', // iOS 安全区域
      background: '#fff',
      borderTop: '1px solid #eee',
      display: 'flex',
      alignItems: 'center',
      padding: '0 10px',
    },
    input: {
      flex: 1,
      height: '36px',
      border: '1px solid #ddd',
      borderRadius: '18px',
      padding: '0 15px',
      fontSize: '16px',
    }
  };

  // 监听键盘弹出/收起
  useEffect(() => {
    const handleFocus = () => {
      setTimeout(() => {
        // 滚动到输入框位置（兼容 iOS）
        inputRef.current.scrollIntoView({
          block: 'center'
        });
      }, 300); // 等待键盘动画完成
    };

    const inputEl = inputRef.current;
    inputEl.addEventListener('focus', handleFocus);

    return () => {
      inputEl.removeEventListener('focus', handleFocus);
    };
  }, []);

  // 处理窗口大小变化（Android 键盘触发）
  // useEffect(() => {
  //   const handleResize = () => {
  //     if (document.activeElement === inputRef.current) {
  //       window.scrollTo(0, document.body.scrollHeight);
  //     }
  //   };

  //   window.addEventListener('resize', handleResize);
  //   return () => window.removeEventListener('resize', handleResize);
  // }, []);

  return (
    <div style={styles.container}>
      {/* 页面内容区域 */}
      <div style={styles.content}>{/* 其他内容 */}</div>
      {/* 底部输入框 */}
      <div
        ref={footerRef}
        style={styles.footer}
      >
        <input
          ref={inputRef}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          style={styles.input}
          placeholder="输入消息..."
        />
      </div>
    </div>
  );
};

export default ChatInput;
