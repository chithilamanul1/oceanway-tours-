const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.magicpatterns.com', pathname: '/**' },
      { protocol: 'https', hostname: 'images.unsplash.com', pathname: '/**' },
    ],
  },
};

export default nextConfig;
