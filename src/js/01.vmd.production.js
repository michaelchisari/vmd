// Put any variables for production in here.

VMD = {};

VMD._linebreak = '\\n';

VMD._protocol = '';

if (location.protocol == 'file:')
    VMD._protocol = 'http:';
