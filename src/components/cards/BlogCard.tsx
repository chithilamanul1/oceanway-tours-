import React from 'react';
import Link from 'next/link';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { BlogPost } from '@/types/content';

interface BlogCardProps {
  post: BlogPost;
  featured?: boolean;
}

export default function BlogCard({ post, featured = false }: BlogCardProps) {
  if (featured) {
    return (
      <Link 
        href={`/journal/${post.id}`}
        className="group grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-white rounded-[28px] overflow-hidden border border-line hover:shadow-xl transition-all duration-300"
      >
        <div className="relative aspect-[4/3] md:aspect-auto md:h-full overflow-hidden">
          <img 
            src={post.image} 
            alt={post.title} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />
          <div className="absolute top-6 left-6 bg-brand text-white px-4 py-1.5 rounded-full text-sm font-semibold">
            {post.category}
          </div>
        </div>
        
        <div className="p-8 md:p-12 md:pl-0">
          <div className="flex items-center gap-4 text-sm text-forest/60 mb-4">
            <span className="flex items-center gap-1.5"><Calendar size={14} />{post.date}</span>
            <span>&bull;</span>
            <span className="flex items-center gap-1.5"><Clock size={14} />{post.readTime} min read</span>
          </div>
          
          <h3 className="text-3xl font-bold text-forest mb-4 group-hover:text-brand transition-colors font-display line-clamp-2">
            {post.title}
          </h3>
          
          <p className="text-forest/70 text-lg mb-8 line-clamp-3">
            {post.excerpt}
          </p>
          
          <div className="flex items-center gap-2 text-brand font-semibold">
            Read Article
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link 
      href={`/journal/${post.id}`}
      className="group bg-white rounded-2xl border border-line overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full"
    >
      <div className="relative aspect-video overflow-hidden">
        <img 
          src={post.image} 
          alt={post.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-brand px-3 py-1 rounded-full text-xs font-semibold">
          {post.category}
        </div>
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center gap-4 text-xs text-forest/60 mb-3">
          <span className="flex items-center gap-1"><Calendar size={12} />{post.date}</span>
          <span>&bull;</span>
          <span className="flex items-center gap-1"><Clock size={12} />{post.readTime} min</span>
        </div>
        
        <h3 className="text-xl font-bold text-forest mb-3 group-hover:text-brand transition-colors line-clamp-2">
          {post.title}
        </h3>
        
        <p className="text-forest/70 text-sm mb-6 line-clamp-2 flex-grow">
          {post.excerpt}
        </p>
        
        <div className="flex items-center gap-2 text-brand font-medium text-sm mt-auto">
          Read More
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  );
}
