/**
 * provide client side value depends on build environment
 * eg. email subscribe url should be production url only for production site build (deploy-preview should not use this value)
 */
export default function getBuildContextVars() {
  // https://docs.netlify.com/configure-builds/environment-variables/#build-metadata
  const BUILD_CONTEXT = (process.env.CONTEXT || 'development') as
    | 'production'
    | 'deploy-preview'
    | 'development';
  return {
    EMAIL_SUBSCRIBE_URL:
      BUILD_CONTEXT === 'production'
        ? 'https://f0433e60.sibforms.com/serve/MUIEAGtmskkcUYKRfBjMjxsUAl1b-ujarrLB6lOc7P0Oz9oHwTsl70yTYoWYx5b9ID3wvQ8fyBH3bSHLZSqxAoHWxr35LTeQX1Qu2_kCbvRnwNUh5G1FqewcQNhoD6mNGzy2FkTdHhpRulmGa5YzIHVosYpHeqZzEkPa98ZObqt1sK-kYrOd68-G7VYf6GOSzraY-BTkUH1vwJ1u'
        : 'https://f0433e60.sibforms.com/serve/MUIEAMMuohK-i-XUkJaUj3Lq3zr3rVeAPmgssEBsyiTktpqrImORJiFMQ1PLfZ1W1PGb-FzKhlfuPWlLNfx90j5R2qC7C219ec8AVcBsxlIRDG5znwaXr6gzAyth6W93bLiK4otXL_iBLFV43QqHrKZKORXA0LGq6seXbasTiAHh5EtqWFGK2zw8mlwYssGnIT_7ZZXiWC_iqubZ',
  };
}
