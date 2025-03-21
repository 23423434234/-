document.addEventListener('DOMContentLoaded', () => {
    const messageList = document.getElementById('messages');
    const messageForm = document.getElementById('message-form');
    const errorDisplay = document.getElementById('error-display'); // 用于显示错误消息的元素
  
    // 渲染留言列表
    async function renderMessages() {
      try {
        const response = await fetch('/api/messages');
        if (!response.ok) {
          throw new Error(`HTTP 错误: ${response.status}`);
        }
        const messages = await response.json();
  
        messageList.innerHTML = '';
        messages.forEach(message => {
          const messageElement = document.createElement('div');
          messageElement.classList.add('message');
          messageElement.innerHTML = `
            <strong>${message.name}</strong>
            <p>${message.content}</p>
            <small>${new Date(message.timestamp).toLocaleString()}</small>
          `;
          messageList.appendChild(messageElement);
        });
      } catch (error) {
        console.error('获取留言失败:', error);
        errorDisplay.textContent = '获取留言失败，请稍后重试。';
      }
    }
  
    // 提交新留言
    messageForm.addEventListener('submit', async (e) => {
      e.preventDefault();
  
      const name = document.getElementById('name').value.trim();
      const content = document.getElementById('content').value.trim();
  
      if (!name || !content) {
        errorDisplay.textContent = '请填写姓名和留言内容！';
        return;
      }
  
      errorDisplay.textContent = ''; // 清除之前的错误消息
  
      try {
        const response = await fetch('/api/messages', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, content }),
        });
  
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || '提交留言失败');
        }
  
        // 清空表单
        messageForm.reset();
  
        // 刷新留言列表
        renderMessages();
      } catch (error) {
        console.error('提交留言失败:', error);
        errorDisplay.textContent = error.message;
      }
    });
  
    // 页面加载时渲染留言
    renderMessages();
  });