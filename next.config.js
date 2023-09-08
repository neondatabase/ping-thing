const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  trailingSlash: true,
  assetPrefix: isProd ? process.env.NEXT_PUBLIC_REWRITE_PREFIX : undefined,
  basePath: process.env.NEXT_PUBLIC_REWRITE_PREFIX,
};
