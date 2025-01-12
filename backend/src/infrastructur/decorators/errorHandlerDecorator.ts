import { InternalServerErrorException } from '@nestjs/common';

export function ErrorHandler() {
  return function (
    target: Object,
    _: string | symbol,
    descriptor: PropertyDescriptor,
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      const response = args.find(
        (arg) => arg && typeof arg.status === 'function',
      );

      try {
        return await originalMethod.apply(this, args);
      } catch (error) {
        const status = error?.status || 400;
        const message = error?.message || 'Internal Server Error';

        if (response) {
          return response.status(status).send({ message });
        }

        throw new InternalServerErrorException(message);
      }
    };

    return descriptor;
  };
}
