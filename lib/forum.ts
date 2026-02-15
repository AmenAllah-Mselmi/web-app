import { supabase } from '@/lib/supabase';

export interface Post {
    id: number;
    created_at: string;
    user_id: string;
    title: string;
    content: string;
    category: string;
    likes: number;
    is_verified: boolean;
    profiles?: {
        username: string;
        vulnerability_score: number;
    };
}

export interface Comment {
    id: number;
    created_at: string;
    content: string;
    user_id: string;
    profiles?: {
        username: string;
    };
}

export async function getPosts() {
    const { data, error } = await supabase
        .from('posts')
        .select(`
            *,
            profiles (username, vulnerability_score)
        `)
        .order('created_at', { ascending: false });

    if (error) throw error;
    return data as Post[];
}

export async function createPost(title: string, content: string, category: string = 'General') {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    const { data, error } = await supabase
        .from('posts')
        .insert({
            user_id: user.id,
            title,
            content,
            category
        })
        .select()
        .single();

    if (error) throw error;
    return data;
}

export async function getPost(id: string) {
    const { data, error } = await supabase
        .from('posts')
        .select(`
            *,
            profiles (username, vulnerability_score)
        `)
        .eq('id', id)
        .single();

    if (error) throw error;
    return data as Post;
}

export async function getComments(postId: string) {
    const { data, error } = await supabase
        .from('comments')
        .select(`
            *,
            profiles (username)
        `)
        .eq('post_id', postId)
        .order('created_at', { ascending: true });

    if (error) throw error;
    return data as Comment[];
}

export async function addComment(postId: string, content: string) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    const { data, error } = await supabase
        .from('comments')
        .insert({
            post_id: postId,
            user_id: user.id,
            content
        })
        .select()
        .single();

    if (error) throw error;
    return data;
}
