import { getUsers } from '../api/api';

interface LoginParams {
    username: string;
    password: string;
}

type LoginResult =
    | { ok: true, user: { id: string; name: string, role: string } }
    | { ok: false; error: string };

export async function login(data: LoginParams): Promise<LoginResult> {
    const { username, password } = data;
    if (!username?.trim() || !password?.trim()) {
        return { ok: false, error: '用户名/密码不能为空！' };
    }
    try {
        const users = await getUsers();
        const user = users.find((u) => u.name === username && u.password === password);
        if (!user) {
            return { ok: false, error: '用户名或密码错误！' };
        }
        return { ok: true, user: { id: user.id, name: user.name, role: user.role } };
    } catch (e: any) {
        return { ok: false, error: e.message };
    }
}