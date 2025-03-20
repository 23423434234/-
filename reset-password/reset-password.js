import { createClient } from '@supabase/supabase-js';

// 替换为你的 Supabase 项目 URL 和 Anon Key
const supabaseUrl = 'https://dgatlpvxudpeubuqsanp.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRnYXRscHZ4dWRwZXVidXFzYW5wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIyMDY4NDcsImV4cCI6MjA1Nzc4Mjg0N30.qyPE2oKkI_rYY4bXKMNR03AloNuYlXgzKK1DUIvPslc';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

document.addEventListener('DOMContentLoaded', () => {
    const resetPasswordForm = document.getElementById('reset-password-form');
    const errorMessage = document.getElementById('error-message');
    const submitButton = resetPasswordForm.querySelector('button[type="submit"]');

    resetPasswordForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        // 禁用提交按钮，防止重复提交
        submitButton.disabled = true;
        submitButton.textContent = '正在发送...';

        const email = resetPasswordForm.email.value.trim();

        // 📌 邮箱格式验证
        if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
            errorMessage.textContent = '请输入有效的邮箱地址';
            resetButton();
            return;
        }

        // 📌 使用 Supabase 的 resetPasswordForEmail 方法
        const { data, error } = await supabase.auth.resetPasswordForEmail(email);

        if (error) {
            errorMessage.textContent = `❌ 错误：${error.message}`;
        } else {
            errorMessage.textContent = '✅ 重置密码邮件已发送，请检查您的邮箱。';
        }

        resetButton();
    });

    function resetButton() {
        // 重置按钮状态
        submitButton.disabled = false;
        submitButton.textContent = '发送重置密码邮件';
    }
});
