const getConfig = () => {
  // process.env.PULL_REQUEST is from next.config.js
  const DEPLOY_CONTEXT = process.env.PULL_REQUEST ? 'deploy-preview' : 'production';
  if (process.env.NODE_ENV !== 'production' || DEPLOY_CONTEXT === 'deploy-preview') {
    // for testing purposes in development and deploy-preview
    return {
      DEPLOY_CONTEXT,
      NEWSLETTER_SUBSCRIBE_URL:
        'https://f0433e60.sibforms.com/serve/MUIEAE9LexIU5u5hYkoDJ-Mc379-irLHNIlGEgCm5njkAwg6OYFfNQTd25n4SO6vJom9WvQ89GJ0sYBzFYswLRewcOvD_dRtoFycXIObP8SMm-kNO1CdXKaWEZutrfqMKygHb1Je1QBGrMUnJg8J5qVeCwa7rSPBN0A1_6Ug3SiGjgIlbiCcMVA4KbhaYTiBvKkaejlCjgZcLHBT',
      JOY_SUBSCRIBE_URL:
        'https://f0433e60.sibforms.com/serve/MUIEAP3wjY7hSAZO41qCycoeKXaCPrR9ldxvMdzUQ2w49OCFK6O3ClxqQrPqEhhAlV7LOQTyLK8sA_HPwQwV3s48r2vQrDvPRqKOgiR4kLdxnSwJxpaTDJy1GKvTW9uOsrwfTcxvAJaGLhifT9XnsrPBVXPYj0zqD5Ta7ibpDY2dtS4BRWJo45tBrL8uKJYtz8kOs0T4v-PtbcJo',
    };
  }
  // only for mui.com
  return {
    DEPLOY_CONTEXT,
    NEWSLETTER_SUBSCRIBE_URL:
      'https://f0433e60.sibforms.com/serve/MUIEAHEhgYhMvLAw0tycwk1BQaIB-q0akob3JdtDBmHLhSR-jLheJ2T44LFCz27alz9wq_Nkdz9EK7Y8hzM1vQND9kTFyKkkhTIbEzXaH5d-_S9Fw4PXS1zAK8efPY6nhCdoAop1SKTeZ_GAPW5S0xBFQRLUGYbvvRgE4Q2Ki_f1KjbiCqaRuzmj_I3SD1r0CoR4INmK3CLtF4kF',
    JOY_SUBSCRIBE_URL:
      'https://f0433e60.sibforms.com/serve/MUIEAJkNmzY4vJnNJJcpwkMlYo2ZbAHQ-Sj3X6jEr87Cx0WSZq-bd8zZSz80ySq5RdP_kBUHMSGV28V6tD_GewKIE2zGUFkqB1mepkerEnJbDhHFhONG-38-2gSRgmp-rkqmBnHvCxG2DAvq6Y8ur9tQlLfXhb8OaFPm2EeZK6CJRcF17OZ1b2Df_1B1zDWIRI8tfkU16uRhRQn0',
  };
};

const CONFIG = getConfig();

export default CONFIG;
