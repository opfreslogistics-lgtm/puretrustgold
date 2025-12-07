'use client'

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  featured_image: string | null;
  published_at: string;
  author_name: string;
}

const PageHeader: React.FC<{ title: string; subtitle?: string }> = ({ title, subtitle }) => (
  <div className="bg-deep-charcoal py-20 md:py-32 relative overflow-hidden">
    <div 
      className="absolute inset-0 bg-cover bg-center"
      style={{ backgroundImage: `url('https://bznwydxnqyumngwscbfy.supabase.co/storage/v1/object/public/My%20Images/hero.jpeg')` }}
    ></div>
    <div className="absolute inset-0 bg-black/80"></div>
    <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/80 to-black/90"></div>
    <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-5xl md:text-7xl font-serif text-white font-bold mb-6"
      >
        {title}
      </motion.h1>
      {subtitle && <p className="text-gold text-lg uppercase tracking-[0.2em]">{subtitle}</p>}
    </div>
  </div>
);

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data, error } = await supabase
          .from('blog_posts')
          .select('id, title, slug, excerpt, featured_image, published_at, author_name')
          .eq('published', true)
          .order('published_at', { ascending: false });

        if (error) throw error;
        setPosts(data || []);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen bg-black">
      <PageHeader title="Market Insights" subtitle="Expert Analysis & News" />
      
      <div className="max-w-7xl mx-auto px-4 py-32">
        {loading ? (
          <div className="text-center py-20">
            <div className="w-12 h-12 border-2 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-400">Loading posts...</p>
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">No blog posts available yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, idx) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group cursor-pointer"
              >
                <Link href={`/blog/${post.slug}`}>
                  <div className="h-64 overflow-hidden mb-6 bg-gray-900">
                    {post.featured_image ? (
                      <img 
                        src={post.featured_image} 
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
                        <span className="text-gray-600 text-sm">No Image</span>
                      </div>
                    )}
                  </div>
                  <p className="text-gold text-xs uppercase tracking-widest mb-2">
                    {new Date(post.published_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                  </p>
                  <h4 className="text-2xl font-serif text-white group-hover:text-gold transition-colors mb-2">
                    {post.title}
                  </h4>
                  {post.excerpt && (
                    <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                  )}
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

