import 'core-js/es7/reflect';
import Application from './server';

function main() {
  Application.initialize();
  Application.fastify.listen(
    process.env.PORT ? parseInt(process.env.PORT) : 8080,
    process.env.HOST || '127.0.0.1'
  );
}

main();
