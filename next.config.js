const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  assetPrefix: isProd ? process.env.NEXT_PUBLIC_REWRITE_PREFIX : undefined,
  basePath: isProd ? process.env.NEXT_PUBLIC_REWRITE_PREFIX : undefined,
};
