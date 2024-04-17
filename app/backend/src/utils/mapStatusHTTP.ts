type THttpMap = 'success' | 'created' | 'deleted' | 'badRequest' | 'unauthorized' | 'notFound';

export default (status:THttpMap): number => {
  switch (status) {
    case 'success': return 200;
    case 'created': return 201;
    case 'deleted': return 204;
    case 'badRequest': return 400;
    case 'unauthorized': return 401;
    case 'notFound': return 404;
    default: return 500;
  }
};
