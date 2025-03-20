import { createClient } from '@supabase/supabase-js';

// **🚀 推荐使用环境变量（防止 API Key 直接暴露）**
const supabaseUrl = 'https://dgatlpvxudpeubuqsanp.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRnYXRscHZ4dWRwZXVidXFzYW5wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIyMDY4NDcsImV4cCI6MjA1Nzc4Mjg0N30.qyPE2oKkI_rYY4bXKMNR03AloNuYlXgzKK1DUIvPslc';  // 你的 anon public key

const supabase = createClient(supabaseUrl, supabaseAnonKey);

document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signup-form');
    const errorMessage = document.getElementById('error-message');
    const submitButton = signupForm.querySelector('button[type="submit"]');

    signupForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        
        // **禁用按钮，防止重复提交**
        submitButton.disabled = true;
        submitButton.textContent = '注册中...';

        const email = signupForm.email.value.trim();
        const password = signupForm.password.value;
        const confirmPassword = signupForm['confirm-password'].value;

        // **📌 1. 检查邮箱格式**
        if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
            errorMessage.textContent = '请输入有效的邮箱地址';
            resetButton();
            return;
        }

        // **📌 2. 确保密码一致**
        if (password !== confirmPassword) {
            errorMessage.textContent = '两次输入的密码不一致';
            resetButton();
            return;
        }

        // **📌 3. 密码长度检查（Supabase 允许最短 6 位）**
        if (password.length < 6) {
            errorMessage.textContent = '密码必须至少 6 位';
            resetButton();
            return;
        }

        // **📌 4. 使用 Supabase 进行注册**
        const { error } = await supabase.auth.signUp({
            email: email,
            password: password,
        });

        if (error) {
            errorMessage.textContent = `❌ 注册失败：${error.message}`;
        } else {
            errorMessage.textContent = '✅ 注册成功！请检查您的邮箱以验证账户。';
            signupForm.reset();
        }

        resetButton();
    });

    function resetButton() {
        submitButton.disabled = false;
        submitButton.textContent = '注册';
    }
});
