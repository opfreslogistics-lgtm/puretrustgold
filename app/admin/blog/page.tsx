'use client'

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { adminAuth } from '@/lib/adminAuth';
import { XIcon, PlusIcon } from '@/components/Icons';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  featured_image: string | null;
  author_name: string;
  published: boolean;
  published_at: string | null;
  created_at: string;
}

export default function BlogManagement() {
  const router = useRouter();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    featured_image: '',
    author_name: 'PureTrust Gold',
    published: false
  });

  useEffect(() => {
    if (!adminAuth.isAuthenticated()) {
      router.push('/admin/login');
      return;
    }
    fetchPosts();
  }, [router]);

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPosts(data || []);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleTitleChange = (title: string) => {
    setFormData({
      ...formData,
      title,
      slug: formData.slug || generateSlug(title)
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const postData: any = {
        ...formData,
        slug: formData.slug || generateSlug(formData.title),
        published_at: formData.published ? new Date().toISOString() : null
      };

      if (editingPost) {
        const { error } = await supabase
          .from('blog_posts')
          .update(postData)
          .eq('id', editingPost.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('blog_posts')
          .insert([postData]);
        if (error) throw error;
      }

      setIsModalOpen(false);
      setEditingPost(null);
      setFormData({
        title: '',
        slug: '',
        excerpt: '',
        content: '',
        featured_image: '',
        author_name: 'PureTrust Gold',
        published: false
      });
      fetchPosts();
    } catch (error) {
      console.error('Error saving post:', error);
      alert('Failed to save post');
    }
  };

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post);
    setFormData({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt || '',
      content: post.content,
      featured_image: post.featured_image || '',
      author_name: post.author_name,
      published: post.published
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return;
    try {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', id);
      if (error) throw error;
      fetchPosts();
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('Failed to delete post');
    }
  };

  const handleTogglePublish = async (post: BlogPost) => {
    try {
      const { error } = await supabase
        .from('blog_posts')
        .update({
          published: !post.published,
          published_at: !post.published ? new Date().toISOString() : null
        })
        .eq('id', post.id);
      if (error) throw error;
      fetchPosts();
    } catch (error) {
      console.error('Error toggling publish:', error);
      alert('Failed to update post');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 md:pt-28 pb-20 min-h-screen bg-deep-charcoal px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 md:mb-10">
          <div>
            <h1 className="text-2xl md:text-4xl font-serif text-white mb-2">Blog Management</h1>
            <p className="text-gray-400 text-xs md:text-sm">Create and manage blog posts</p>
          </div>
          <button
            onClick={() => {
              setEditingPost(null);
              setFormData({
                title: '',
                slug: '',
                excerpt: '',
                content: '',
                featured_image: '',
                author_name: 'PureTrust Gold',
                published: false
              });
              setIsModalOpen(true);
            }}
            className="flex items-center justify-center space-x-2 bg-gold text-black px-4 md:px-6 py-2 md:py-3 hover:bg-white transition-colors uppercase tracking-widest text-xs md:text-sm font-bold w-full sm:w-auto"
          >
            <PlusIcon className="w-4 h-4" />
            <span>New Post</span>
          </button>
        </div>

        <div className="bg-black border border-gray-800 rounded-lg overflow-hidden">
          {posts.length === 0 ? (
            <div className="p-12 text-center text-gray-500">No blog posts yet. Create your first post!</div>
          ) : (
            <div className="divide-y divide-gray-800">
              {posts.map((post) => (
                <div key={post.id} className="p-4 md:p-6 hover:bg-gray-900/30 transition-colors">
                  <div className="flex flex-col lg:flex-row justify-between items-start gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-2">
                        <h3 className="text-lg md:text-xl font-serif text-white truncate">{post.title}</h3>
                        <span className={`px-2 py-1 text-xs uppercase tracking-widest shrink-0 ${
                          post.published 
                            ? 'bg-green-900/30 text-green-400 border border-green-900' 
                            : 'bg-gray-900/30 text-gray-400 border border-gray-800'
                        }`}>
                          {post.published ? 'Published' : 'Draft'}
                        </span>
                      </div>
                      <p className="text-gray-400 text-sm mb-2 line-clamp-2">{post.excerpt || 'No excerpt'}</p>
                      <p className="text-gray-500 text-xs">
                        Created: {new Date(post.created_at).toLocaleDateString()}
                        {post.published_at && ` | Published: ${new Date(post.published_at).toLocaleDateString()}`}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2 w-full lg:w-auto lg:ml-4">
                      <button
                        onClick={() => handleTogglePublish(post)}
                        className="px-3 md:px-4 py-2 border border-gray-800 text-gray-400 hover:text-white hover:border-gray-700 transition-colors text-xs uppercase tracking-widest flex-1 lg:flex-none"
                      >
                        {post.published ? 'Unpublish' : 'Publish'}
                      </button>
                      <button
                        onClick={() => handleEdit(post)}
                        className="px-3 md:px-4 py-2 border border-gold text-gold hover:bg-gold hover:text-black transition-colors text-xs uppercase tracking-widest flex-1 lg:flex-none"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(post.id)}
                        className="px-3 md:px-4 py-2 border border-red-900 text-red-400 hover:bg-red-900 hover:text-white transition-colors text-xs uppercase tracking-widest flex-1 lg:flex-none"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-2 md:p-4">
          <div className="bg-deep-charcoal border border-gold/30 max-w-4xl w-full max-h-[95vh] md:max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-deep-charcoal border-b border-gray-800 p-4 md:p-6 flex justify-between items-center">
              <h2 className="text-xl md:text-2xl lg:text-3xl font-serif text-white">{editingPost ? 'Edit Post' : 'New Post'}</h2>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setEditingPost(null);
                }}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <XIcon size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-4 md:p-6 space-y-4 md:space-y-6">
              <div>
                <label className="block text-sm text-gray-400 mb-2 uppercase tracking-wider">Title *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  required
                  className="w-full bg-black border border-gray-800 text-white px-4 py-3 focus:outline-none focus:border-gold transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2 uppercase tracking-wider">Slug *</label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  required
                  className="w-full bg-black border border-gray-800 text-white px-4 py-3 focus:outline-none focus:border-gold transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2 uppercase tracking-wider">Excerpt</label>
                <textarea
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  rows={3}
                  className="w-full bg-black border border-gray-800 text-white px-4 py-3 focus:outline-none focus:border-gold transition-colors resize-none"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2 uppercase tracking-wider">Featured Image URL</label>
                <input
                  type="url"
                  value={formData.featured_image}
                  onChange={(e) => setFormData({ ...formData, featured_image: e.target.value })}
                  className="w-full bg-black border border-gray-800 text-white px-4 py-3 focus:outline-none focus:border-gold transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2 uppercase tracking-wider">Content *</label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  required
                  rows={10}
                  className="w-full bg-black border border-gray-800 text-white px-3 md:px-4 py-2 md:py-3 focus:outline-none focus:border-gold transition-colors resize-none font-mono text-xs md:text-sm"
                />
                <p className="text-gray-500 text-xs mt-2">Use line breaks for paragraphs. HTML is supported.</p>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2 uppercase tracking-wider">Author Name</label>
                <input
                  type="text"
                  value={formData.author_name}
                  onChange={(e) => setFormData({ ...formData, author_name: e.target.value })}
                  className="w-full bg-black border border-gray-800 text-white px-4 py-3 focus:outline-none focus:border-gold transition-colors"
                />
              </div>

              <div className="flex items-center space-x-4">
                <input
                  type="checkbox"
                  id="published"
                  checked={formData.published}
                  onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                  className="w-4 h-4 text-gold bg-black border-gray-800 focus:ring-gold"
                />
                <label htmlFor="published" className="text-gray-400 text-sm">Publish immediately</label>
              </div>

              <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-4 pt-4 border-t border-gray-800">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    setEditingPost(null);
                  }}
                  className="px-4 md:px-6 py-2 md:py-3 border border-gray-800 text-gray-400 hover:text-white hover:border-gray-700 transition-colors uppercase tracking-widest text-xs md:text-sm font-bold w-full sm:w-auto"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 md:px-6 py-2 md:py-3 bg-gold hover:bg-white hover:text-black text-black transition-colors uppercase tracking-widest text-xs md:text-sm font-bold w-full sm:w-auto"
                >
                  {editingPost ? 'Update Post' : 'Create Post'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

