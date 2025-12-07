'use client'

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  featured_image: string | null;
  published_at: string;
  author_name: string;
}

export default function BlogPost() {
  const params = useParams();
  const slug = params?.slug as string;
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) return;

      try {
        const { data, error } = await supabase
          .from('blog_posts')
          .select('*')
          .eq('slug', slug)
          .eq('published', true)
          .single();

        if (error) throw error;
        setPost(data);
      } catch (error) {
        console.error('Error fetching blog post:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading post...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-serif text-white mb-4">Post Not Found</h1>
          <Link href="/blog" className="text-gold hover:text-white transition-colors">
            ← Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <article className="max-w-4xl mx-auto px-4 py-32">
        <Link href="/blog" className="text-gold hover:text-white transition-colors mb-8 inline-block text-sm uppercase tracking-widest">
          ← Back to Blog
        </Link>

        <header className="mb-12">
          <p className="text-gold text-sm uppercase tracking-widest mb-4">
            {new Date(post.published_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
          <h1 className="text-5xl md:text-7xl font-serif text-white mb-6">{post.title}</h1>
          <p className="text-gray-400">By {post.author_name}</p>
        </header>

        {post.featured_image && (
          <div className="mb-12 h-96 overflow-hidden">
            <img 
              src={post.featured_image} 
              alt={post.title}
              className="w-full h-full object-cover" 
            />
          </div>
        )}

        <div 
          className="prose prose-invert prose-lg max-w-none text-gray-300 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: post.content.split('\n').map((para: string) => para.trim() ? `<p>${para}</p>` : '<br />').join('') }}
          style={{
            color: '#cccccc',
            lineHeight: '1.8',
            fontSize: '1.125rem'
          }}
        />

        <div className="mt-16 pt-8 border-t border-gray-800">
          <Link href="/blog" className="text-gold hover:text-white transition-colors text-sm uppercase tracking-widest">
            ← Back to All Posts
          </Link>
        </div>
      </article>
    </div>
  );
}

