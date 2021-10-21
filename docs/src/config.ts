const getConfig = () => {
  // https://docs.netlify.com/site-deploys/overview/#deploy-contexts
  // the setting is in netlify.toml > [context.production.*]
  const DEPLOY_CONTEXT = (process.env.NEXT_PUBLIC_DEPLOY_CONTEXT || 'production') as
    | 'production'
    | 'deploy-preview';
  if (DEPLOY_CONTEXT === 'deploy-preview') {
    return {
      DEPLOY_CONTEXT,
      NEWSLETTER_SUBSCRIBE_URL:
        'https://f0433e60.sibforms.com/serve/MUIEAE9LexIU5u5hYkoDJ-Mc379-irLHNIlGEgCm5njkAwg6OYFfNQTd25n4SO6vJom9WvQ89GJ0sYBzFYswLRewcOvD_dRtoFycXIObP8SMm-kNO1CdXKaWEZutrfqMKygHb1Je1QBGrMUnJg8J5qVeCwa7rSPBN0A1_6Ug3SiGjgIlbiCcMVA4KbhaYTiBvKkaejlCjgZcLHBT',
    };
  }
  return {
    DEPLOY_CONTEXT,
    NEWSLETTER_SUBSCRIBE_URL:
      'https://f0433e60.sibforms.com/serve/MUIEAHEhgYhMvLAw0tycwk1BQaIB-q0akob3JdtDBmHLhSR-jLheJ2T44LFCz27alz9wq_Nkdz9EK7Y8hzM1vQND9kTFyKkkhTIbEzXaH5d-_S9Fw4PXS1zAK8efPY6nhCdoAop1SKTeZ_GAPW5S0xBFQRLUGYbvvRgE4Q2Ki_f1KjbiCqaRuzmj_I3SD1r0CoR4INmK3CLtF4kF',
  };
};

const CONFIG = getConfig();

export default CONFIG;
