import { createClient } from '@supabase/supabase-js';

// 替换为你的 Supabase 项目 URL 和 Anon Key
const supabaseUrl = 'YOUR_SUPABASE_URL';
const supabaseAnonKey = 'YOUR_SUPABASE_ANON_KEY';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const errorMessage = document.getElementById('error-message');

    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const email = loginForm.email.value;
        const password = loginForm.password.value;
        const rememberMe = loginForm['remember-me'].checked;

        // 使用 Supabase 的 signInWithPassword 方法
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        });

        if (error) {
            errorMessage.textContent = error.message; // Supabase 会提供详细的错误信息
        } else {
            // 登录成功
            if (rememberMe) {
                // Supabase 默认会在 localStorage 中存储 session
                // 你不需要手动处理
            } else {
                // 如果不记住，Supabase 会在 sessionStorage 中存储 session
            }

            // 跳转到主页
            window.location.href = 'index\index.html';
        }
    });
});